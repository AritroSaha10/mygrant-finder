import { connectRefinementList } from "react-instantsearch-dom";
import Select from 'react-select';
import RefinementItem from "./RefinementItem";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface Props {
    items: any[];
    currentRefinement: string[];
    refine: Function;
    isFromSearch: boolean;
    searchForItems: Function;
    createURL: Function;
}

function CustomRefinementList({ items, currentRefinement, refine, isFromSearch, searchForItems, createURL }: Props) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className={`py-2 px-4 bg-gray-200 rounded w-1/2 self-center ${showDropdown && "ring-2"} ring-gray-300`}>
            <button className="w-full" onClick={() => setShowDropdown(!showDropdown)}>
                <div className="flex justify-between items-center">
                    <span className="text-md text-gray-600 font-medium">Category</span>
                    {showDropdown ?
                        <IoIosArrowUp />
                        :
                        <IoIosArrowDown />
                    }
                </div>
            </button>
            <div className={`${showDropdown ? "block" : "hidden"}`}>
                <ul>
                    {items.map(item => (
                        <li key={item.label}>
                            <RefinementItem item={item} refine={refine} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default connectRefinementList(CustomRefinementList);
