/**
 * Gets the IDs of every grant
 * Note that this uses CommonJS so it can be used in scripts/build-search.js
*/

const Airtable = require("airtable");

module.exports = async function getAllGrantsAirtable(maxEntries) {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appZvaxaDZfU6f4fE");
    const grantsTable = base("Grants");

    let grantsRaw = [];

    if (maxEntries) {
        grantsRaw = await grantsTable.select({
            fields: ["Name", "Category", "Source", "Country", "Notes", "Link", "Description", "Keywords", "Image", "Views"],
            maxRecords: maxEntries
        }).all();
    } else {
        grantsRaw = await grantsTable.select({
            fields: ["Name", "Category", "Source", "Country", "Notes", "Link", "Description", "Keywords", "Image", "Views"]
        }).all();
    }

    const grants = grantsRaw.map((grant) => ({
        name: grant.get("Name"),
        category: grant.get("Category") ? grant.get("Category") : "None",
        source: grant.get("Source") ? grant.get("Source") : "Unknown",
        notes: grant.get("Notes") ? grant.get("Notes") : "There seem to be no notes...",
        link: grant.get("Link"),
        description: grant.get("Description"),
        keywords: grant.get("Keywords") ? grant.get("Keywords") : [],
        img: grant.get("Image") ? grant.get("Image")[0].url : "", // Setting as none so we can sort later
        views: grant.get("Views"),
        objectID: grant.getId()
    }));

    return grants;
}