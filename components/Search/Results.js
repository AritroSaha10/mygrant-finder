import { connectStateResults } from "react-instantsearch-core";
import Card from "../../components/Card";

function Results({ searchState, searchResults }) {
    console.log(searchResults);

    return (
        <div className="p-4 mb-4">
            <div className="flex flex-col gap-2">
                {searchResults ?

                    (searchResults.hits.length ? searchResults.hits.map(({ name, shortDescription, img, dateCreated }, idx) => (
                        <Card title={name} image={img} subtitle={shortDescription} dateCreated={dateCreated} href="/" key={idx} />
                    )) :
                        <div>
                            <h1 className="text-2xl font-bold text-center mt-4">No search results found</h1>
                            <p className="text-lg text-center my-2">Try adjusting your search to find what you&apos;re looking for.</p>
                        </div>
                    ) :
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