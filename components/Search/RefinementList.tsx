import { connectRefinementList } from "react-instantsearch-dom";


interface Props {
    items: any[];
    currentRefinement: string[];
    refine: Function;
    isFromSearch: boolean;
    searchForItems: Function;
    createURL: Function;
}

function CustomRefinementList({ items, currentRefinement, refine, isFromSearch, searchForItems, createURL }: Props) {
    return (
        <ul>
            {items.map(item => (
                <li key={item.label}>
                    <a
                        href="#"
                        onClick={event => {
                            event.preventDefault();
                            refine(item.value);
                        }}
                    >
                        {item.label} ({item.count})
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default connectRefinementList(CustomRefinementList);
