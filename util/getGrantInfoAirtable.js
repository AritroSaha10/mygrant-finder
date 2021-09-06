/**
 * Gets the IDs of every grant
 * Note that this uses CommonJS so it can be used in scripts/build-search.js
*/

const Airtable = require("airtable");

module.exports = async function getAllGrantsAirtable(id) {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appZvaxaDZfU6f4fE");
    const grantsTable = base("Grants");

    const grantRaw = await grantsTable.find(id);

    const grant = {
        name: grantRaw.get("Name"),
        category: grantRaw.get("Category") ? grantRaw.get("Category") : "None",
        source: grantRaw.get("Source") ? grantRaw.get("Source") : "Unknown",
        notes: grantRaw.get("Notes") ? grantRaw.get("Notes") : "There seem to be no notes...",
        link: grantRaw.get("Link"),
        description: grantRaw.get("Description"),
        img: grantRaw.get("Image") ? grantRaw.get("Image")[0].url : "/images/no-image-found.jpg",
        objectID: grantRaw.getId()
    };

    return grant;
}