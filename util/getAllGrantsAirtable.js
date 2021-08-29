/**
 * Gets the IDs of every grant
 * Note that this uses CommonJS so it can be used in scripts/build-search.js
*/

const Airtable = require("airtable");

module.exports = async function getAllGrantsAirtable() {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appZvaxaDZfU6f4fE");
    const grantsTable = base("Grants");

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