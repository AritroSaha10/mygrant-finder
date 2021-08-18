/**
 * Gets the IDs of every grant
 * Note that this uses CommonJS so it can be used in scripts/build-search.js
*/ 
const fs = require("fs").promises;
const path = require("path");

module.exports = async function getAllGrants() {
    // Get directory path
    const directory = path.join(process.cwd(), "data/grants");

    // Get all filenames, and remove the file extension
    const fnamesRaw = await fs.readdir(directory);

    return fnamesRaw.map(
        fname => (
            fname.split(".").
                slice(0, -1).
                join(".")
        )
    );
}