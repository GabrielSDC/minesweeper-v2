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
    const [isMined, setIsMined] = useState(cell.isMined);
    const [isCaved, setIsCaved] = useState(false);
    const [isFlagged, setIsFlagged] = useState(false);

    function revealCell() {
        if (isMined) {
            alert('perdeu');
            return;
        }
        if (!isFlagged)
            setIsCaved(!isCaved);
    }
    
    function flagCell(e) {
        e.preventDefault();
        setIsFlagged(!isFlagged);
    }

    if (!isCaved)
        return <div onClick={revealCell} onContextMenu={flagCell} className='w-10 h-10 bg-(--green) border border-(--green-border)'>
            {isFlagged && <span className='flex mx-auto text-2xl'>🚩</span>}
        </div>;
    return <div className='w-10 h-10 bg-(--brown) border border-(--brown-border)'></div>;
}

export default Field;