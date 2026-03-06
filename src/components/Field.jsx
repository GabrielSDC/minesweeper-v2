import { useState, memo, useCallback } from 'react';

function Field({field, w, h}) {
    const [cells, setCells] = useState(field.cells);

    const revealCell = useCallback((i) => {
        setCells(prev => {
            const next = [...prev];
            if (!next[i].isFlagged)
                next[i] = { ...next[i], isCaved: true };
            return next;
        });
    }, []);

    const flagCell = useCallback((i, e) => {
        e.preventDefault();
        setCells(prev => {
            const next = [...prev];
            next[i] = { ...next[i], isFlagged: !next[i].isFlagged };
            return next;
        });
    }, []);

    return (
        <table>
            <tbody>
            {Array.from({ length: h }, (_, row) => (
                <tr key={'row'+row}>
                {Array.from({ length: w }, (_, col) => (
                    <td key={'cols'+col}>
                        <Cell key={row * w + col}
                            index={row * w + col} 
                            {...cells[row * w + col]} 
                            revealCell={revealCell} 
                            flagCell={flagCell}/>
                    </td>
                    )
                )}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

const Cell = memo(function Cell({isCaved, isFlagged, revealCell, flagCell, index}) {
    if (!isCaved)
        return <div onClick={() => revealCell(index)} onContextMenu={(e) => flagCell(index, e)} className='w-10 h-10 bg-(--green) border border-(--green-border)'>
            {isFlagged && <span className='flex mx-auto text-2xl'>🚩</span>}
        </div>;
    return <div className='w-10 h-10 bg-(--brown) border border-(--brown-border)'></div>;
});

export default Field;