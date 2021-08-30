import { useState } from "react";

export default function CustomRefinementItem({ item, refine }) {
    return (
        <label className="inline-flex items-center mt-3">
            <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                value={item.isRefined}
                onClick={event => {
                    refine(item.value);
                }}
            />
            <span className="ml-2 text-gray-700">{item.label} ({item.count})</span>
        </label>
    )
}