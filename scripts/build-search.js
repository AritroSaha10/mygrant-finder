/**
 * Build the Algolia search index using the data folder
*/

const dotenv = require("dotenv");
const algoliaSearch = require("algoliasearch/lite");

// Data fetching 
const getAllGrants = require("../util/getAllGrants");
const getGrantInfo = require("../util/getGrantInfo");

async function getAllGrantData() {
    // Get all of the grant IDs
    const grantsIDs = await getAllGrants();

    // Get all of their info
    const allGrantsInfo = grantsIDs.map(
        async (id) => ({
            ...(await getGrantInfo(id)),
            objectID: id // Important for algolia
        })
    );

    return Promise.all(allGrantsInfo);
}

// IIFE to use await
(async function () {
    // Init env vars
    dotenv.config();

    try {
        console.log("Pushing grant data to Algolia...");

        // Fetch data
        const allGrants = await getAllGrantData();
        
        // Init Algolia client
        const client = algoliaSearch(
            process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
            process.env.ALGOLIA_SEARCH_ADMIN_KEY,
        );

        // Save fetched data to algolia
        const index = client.initIndex("mygrants-grants");
        const algoliaResponse = await index.saveObjects(allGrants);

        console.log(
            `Sucessfully added ${algoliaResponse.objectIDs.length} records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
                "\n",
            )}`,
        );
    } catch (e) {
        console.log("Error when pushing grant data to Algolia: ", e);
    }
})();