import React from "react";
import { useState } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import Autocomplete from "./Autocomplete";

function SearchBox({ currentRefinement, refine }) {
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form action="" role="search" onSubmit={onSubmit}>
      <div tabIndex={0} onFocus={e => { e.preventDefault(); setShowAutocomplete(true); }}
          onBlur={e => setShowAutocomplete(false)} onClick={e => e.preventDefault()}>
        <div className="flex flex-col gap-1 flex-grow">
          <label htmlFor="search">
            <p className="text-sm text-gray-500 font-semibold">
              Search
            </p>
          </label>

          <input
            className="bg-gray-200 appearance-none outline-none px-4 py-1 rounded focus:ring focus:bg-gray-300 duration-75 w-full"
            type="search"
            placeholder="Ex. covid relief"
            id="search"
            onChange={e => refine(e.currentTarget.value)}
            value={currentRefinement}
          />
        </div>

        {showAutocomplete && <Autocomplete />}
      </div>
    </form >
  )
}

export default connectSearchBox(SearchBox);