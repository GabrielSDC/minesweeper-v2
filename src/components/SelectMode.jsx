import { useState } from "react";

function SelectMode() {
    const [option, setOption] = useState('');
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
            default: true
        },
    ];

    function handleChange(e) {
        console.log(e);
    }

    return (
        <div className="flex">
            <p>{option}</p>
            <select className='text-base px-4' value={option} onChange={handleChange}>
                {Array.from({ length: modes.length }, (_, i) => 
                    <option key={i} value={modes[i].values} defaultValue={modes[i].default}>
                        {modes[i].name}
                    </option>)}
            </select>
        </div>
    );
}

export default SelectMode;