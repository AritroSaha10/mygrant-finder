import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "./SearchBox";
import Results from "./Results";

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

export default function Search() {
    return (
        <>
            <InstantSearch
                searchClient={searchClient}
                indexName="mygrants-grants">
                <div className="flex-col self-center items-end gap-2 w-full md:w-2/3 lg:w-1/2">
                    <SearchBox />
                </div>
                <Results />

            </InstantSearch>
        </>
    );
}