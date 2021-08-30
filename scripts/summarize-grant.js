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
        fields: ["Name", "Category", "Source", "Country", "Notes", "Link", "Description"],
        filterByFormula: `({Description} = '')`
    }).firstPage();

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
        const allGrants = (await getAllGrantsAirtable()).splice(30, 60);

        // Run all of the links through SMMRY
        const descriptionPromises = allGrants.map(async ({ name, link, objectID, description }) => {
            if (description) {
                console.log(`🟡 Description already found, ignoring fetching for ${name}...`);
                return false;
            }

            if (!link) {
                console.log(`🟡 No link found for ${name}, skipping...`);
                return false;
            }

            // Change link to remove question mark to fix request problems
            if (link.includes("?")) {
                console.log(`🔵 Fixing link due to weird request problems...`);
                try {
                    link = link.slice(0, link.indexOf("?"));
                } catch (e) {
                    console.log(`🟡 Unable to clean link for ${name}, skipping...`);
                }
            }

            // Run link through SMMRY
            const res = await fetch(`https://api.smmry.com/&SM_API_KEY=${process.env.SMMRY_API_KEY}&SM_KEYWORD_COUNT=7&SM_WITH_BREAK&SM_URL=${link}`, {
                method: "POST",
            });

            data = await res.text();

            if (!res.ok) {
                console.log(`❌ Bad response for ${name}, skipping...`);
                console.log(`Response: ${data}`)
                return false;
            }

            // Try converting to JSON
            try {
                data = JSON.parse(data);
            } catch (e) {
                console.log("❌ Error when converting data to JSON: ", e);
                console.log("❌ Data as text: ", data);
                return false;
            }

            // Check data if everything went well
            if ("sm_api_error" in data) {
                console.log(`❌ Error from API while fetching description for ${name}: ${data.sm_api_message}`);
                console.log("❌ More information: ", {
                    error: data.sm_api_error,
                    message: data.sm_api_message,
                    data: data,
                    link: `https://api.smmry.com/&SM_API_KEY=${process.env.SMMRY_API_KEY}&SM_KEYWORD_COUNT=7&SM_WITH_BREAK&SM_URL=${link}`
                });
                return false;
            }

            // Required because it'll sometimes fail on this?????
            let keywords = [];
            try {
                // Make all keywords lowercase
                keywords = data.sm_api_keyword_array.map((keyword) => keyword.toLowerCase());
            } catch (e) {
                console.log("❌ Error when using keywords: ", e, data);
            }

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

            return true;
        });

        await Promise.all(descriptionPromises);

        console.log("✅ Done!")
    } catch (e) {
        console.log("❌ Error when summarizing grants: ", e);
    }
})();