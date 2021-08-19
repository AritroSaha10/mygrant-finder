import { connectRefinementList } from "react-instantsearch-dom";
import Select from 'react-select';

interface Props {
    items: any[];
    currentRefinement: string[];
    refine: Function;
    isFromSearch: boolean;
    searchForItems: Function;
    createURL: Function;
}

const options = [
    'one', 'two', 'three'
];
const defaultOption = options[0];



function CustomRefinementList({ items, currentRefinement, refine, isFromSearch, searchForItems, createURL }: Props) {
    const customRefine = e => {
        
    }

    console.log(currentRefinement);

    return (
        <Select options={items} onChange={(e) => {refine(e.value); console.log(e)}} placeholder="Select an option" isClearable={true} />
    );
}

export default connectRefinementList(CustomRefinementList);
