import { connectAutoComplete } from "react-instantsearch-core";

function Autocomplete({ hits, currentRefinement, refine }) {
    const autocompleteBoldingRange = (hit: string) => {
        // Get the string with the smallest length
        const smallestStringLength = currentRefinement.length > hit.length ? hit.length : currentRefinement.length;

        let boldCount = 0;
        for (let i = 0; i < smallestStringLength; i++) {
            if (hit.toLocaleLowerCase()[i] === currentRefinement.toLocaleLowerCase()[i]) {
                boldCount += 1;
            } else {
                break;
            }
        }

        return boldCount;
    };

    return (
        <ul className={hits.length && `flex flex-col gap-2 bg-white my-2 rounded-lg`}>
            {hits.map(hit => (
                <li key={hit.objectID} onClick={() => refine(hit.name)} className="hover:bg-gray-100 px-4 py-1 cursor-pointer">
                    <span>
                        {hit.name.slice(0, autocompleteBoldingRange(hit.name))}
                    </span>

                    <span className="font-medium">
                        {hit.name.slice(autocompleteBoldingRange(hit.name))}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default connectAutoComplete(Autocomplete);