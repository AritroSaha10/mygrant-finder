import { connectStateResults } from "react-instantsearch-core";
import Card from "../../components/Card";

import Grant from "../GrantType";

import Placeholder from "../../public/images/placeholder.png";

function Results({ searchState, searchResults }) {
    const results: Grant[] | null = searchResults ? searchResults.hits : null; // If search results exists, get the results. Otherwise, null

    return (
        <div className="p-4 mb-4">
            <div className="flex flex-col gap-4">
                {results ?
                    // Results is not null, show results if any
                    (results.length ? results.map(({ name, category, source, notes, link, objectID }, idx: Number) => (
                        <Card 
                            title={name} 
                            image={Placeholder} 
                            subtitle={notes} 
                            tag={category} 
                            href={link} 
                            key={idx.toString()} 
                        />
                    )) :
                        // No results found
                        <div>
                            <h1 className="text-2xl font-bold text-center mt-4">No search results found</h1>
                            <p className="text-lg text-center my-2">Try adjusting your search to find what you&apos;re looking for.</p>
                        </div>
                    ) :
                    // Still waiting for Algolia response
                    <div>
                        <h1 className="text-2xl font-bold text-center mt-4">Loading...</h1>
                        <p className="text-lg text-center my-2">Please wait...</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default connectStateResults(Results);