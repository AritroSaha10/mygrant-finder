import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "./SearchBox";
import Results from "./Results";
import RefinementList from "./RefinementList";
import { useState } from "react";

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

export default function Search() {
    const [refinement, setRefinement] = useState("");

    function changeRefinementFromSearch(newRefinement: string) {
        setRefinement(newRefinement);
        console.log("hi");
    };

    return (
        <>
            <InstantSearch
                searchClient={searchClient}
                indexName="mygrants-grants-airtable">
                <div className="flex flex-col self-center gap-2 w-full md:w-2/3 lg:w-1/2">
                    <SearchBox defaultRefinement={refinement} />
                    <RefinementList
                        attribute="category"
                        transformItems={items =>
                            items.sort((a, b) => a.label.localeCompare(b.label))
                        }
                    />
                </div>

                <Results />

            </InstantSearch>
        </>
    );
}