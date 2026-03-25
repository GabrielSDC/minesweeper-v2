import { useState } from "react";
import { useDimensions, useDimensionsUpdate, useFieldDispatch } from "../contexts/FieldContext";

function SelectMode({ mode, setMode, refreshGame }) {
    const modes = [
        {
            name: 'Easy',
            values: { w: 10, h: 10, b: 10 },
        },
        {
            name: 'Normal',
            values: { w: 20, h: 10, b: 40 },
        },
        {
            name: 'Hard',
            values: { w: 30, h: 15, b: 99 },
        },
    ];
    const dispatch = useFieldDispatch();
    const gameMode = useDimensions();
    const updateDimensions = useDimensionsUpdate();

    return (
        <div className="flex">
            <select className='text-base px-4' 
                    onChange={(e) => {
                        dispatch({
                            type: 'changeDifficulty',
                            dimensions: JSON.parse(e.target.value) 
                        });
                        updateDimensions({ dimensions: JSON.parse(e.target.value) });
                        refreshGame();
                    }}
                    value={JSON.stringify(gameMode)}>
                {Array.from({ length: modes.length }, (_, i) => 
                    <option key={i} value={JSON.stringify(modes[i].values)}>
                        {modes[i].name}
                    </option>)}
            </select>
        </div>
    );
}

export default SelectMode;