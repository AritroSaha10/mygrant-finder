/**
 * Gets the serializable information of a grant from its ID
 * Note that this uses CommonJS so it can be used in scripts/build-search.js
*/ 
const fs = require("fs").promises;
const path = require("path");

module.exports = async function getGrantInfo(id) {
    // Get directory path
    const directory = path.join(process.cwd(), "data/grants");

    // Get specific file path
    const filePath = path.join(directory, `${id}.json`);

    // Read contents
    const fileContents = await fs.readFile(filePath, 'utf8');

    // Return serialized version
    return JSON.parse(fileContents);
}