import { useState } from 'react';
import CellField from '../utils/CellField.js';

function Field({h, w, b}) {
    const field = new CellField({h, w, b});
    
    return (
        <table>
            <tbody>
            {Array.from({ length: h }, (_, row) => (
                <tr key={row}>
                {Array.from({ length: w }, (_, col) => (
                    <td key={col}>
                        <Cell cell={field.getCell(col, row)}/>
                    </td>
                    )
                )}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function Cell({cell}) {
    const [thiscell, setthiscell] = useState(cell);
    if (thiscell.isMined)
        return <div className='w-10 h-10 bg-(--green) hover:bg-black' onClick={() => console.log(thiscell)}></div>;
    return <div className='w-10 h-10 bg-(--green) hover:bg-white' onClick={() => console.log(thiscell)}></div>;
}

export default Field;