/**
 * Summarize a grant using its link and add it to the description trait if it's empty.
*/

const dotenv = require("dotenv");
const Airtable = require("airtable");
const fetch = require("node-fetch");

// Init env vars
dotenv.config({
    path: "../.env"
});

// Configure Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appZvaxaDZfU6f4fE");
const grantsTable = base("Grants");

async function getAllGrantsAirtable() {
    const grantsRaw = await grantsTable.select({
        fields: ["Name", "Category", "Source", "Country", "Notes", "Link", "Description"]
    }).all();

    const grants = grantsRaw.map((grant) => ({
        name: grant.get("Name"),
        category: grant.get("Category") ? grant.get("Category") : "None",
        source: grant.get("Source") ? grant.get("Source") : "Unknown",
        notes: grant.get("Notes") ? grant.get("Notes") : "There seem to be no notes...",
        link: grant.get("Link"),
        description: grant.get("Description"),
        objectID: grant.getId()
    }));

    return grants;
}

// IIFE to use await
(async function () {
    try {
        console.log("🔵 Summarizing all grants...");

        // Get all grants
        const allGrants = (await getAllGrantsAirtable());

        // Run all of the links through SMMRY
        const descriptionPromises = allGrants.map(async ({ name, link, objectID, description }) => {
            if (description) {
                console.log(`🟡 Description already found, ignoring fetching for ${name}...`);
                return null;
            }

            // Run link through SMMRY
            const res = await fetch(`https://api.smmry.com/&SM_API_KEY=${process.env.SMMRY_API_KEY}&SM_KEYWORD_COUNT=7&SM_WITH_BREAK&SM_URL=${link}`, {
                method: "POST",
            })

            data = await res.json();

            // Check data if everything went well
            if ("sm_api_error" in data) {
                console.log(`❌ Error from API while fetching description for ${name}: ${data.sm_api_message}`);
                console.log("❌ More information: ", {
                    error: data.sm_api_error,
                    message: data.sm_api_message,
                    data: data
                });
            }

            // Make all keywords lowercase
            const keywords = data.sm_api_keyword_array.map((keyword) => keyword.toLowerCase())

            // Change [BREAK] to \n in description
            // One replace is run with a space, and one without, to remove any breaks at the end
            const newDescription = data.sm_api_content.replace(/\[BREAK\] /g, "\n").replace(/\[BREAK\]/g, "\n");

            // Set description and keywords of objectID from data
            await grantsTable.update(objectID, {
                Description: newDescription,
                Keywords: keywords
            }, {
                "typecast": true // Allows us to make new entries for the keywords
            });

            // Let user know
            console.log(`🎉 Successfully fetched keywords and description for ${name}`);
        });

        await Promise.all(descriptionPromises);
    } catch (e) {
        console.log("Error when summarizing grants: ", e);
    }
})();