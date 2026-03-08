import { useState, memo, useCallback } from 'react';

function Field({field, w, h}) {
    const [cells, setCells] = useState(field.cells);

    function floodFillIndexes(cells, i, indexes = []) {
        if (indexes.includes(i) || cells[i].isFlagged || cells[i].isCaved) {
            return indexes;
        }
        
        indexes.push(i);

        if (cells[i].minesAround != 0) {
            return indexes;
        }

        for (const cell of cells[i].neighbors) {
            const index = cell.y * w + cell.x;
            floodFillIndexes(cells, index, indexes);
        }

        return indexes;
    }

    const revealCell = useCallback((i) => {
        setCells(prev => {
            if (prev[i].isFlagged || prev[i].isCaved)
                return prev;

            const next = [...prev];
            
            for (let index of floodFillIndexes(prev, i)) {
                next[index] = { ...next[index], isCaved: true };
            }
            
            return next;
        });
    }, []);

    const flagCell = useCallback((i, e) => {
        e.preventDefault();
        setCells(prev => {
            const next = [...prev];
            if (!next[i].isCaved)
                next[i] = { ...next[i], isFlagged: !next[i].isFlagged };
            return next;
        });
    }, []);

    return (
        <table className='mx-auto my-auto'>
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

const Cell = memo(function Cell({minesAround, isCaved, isFlagged, revealCell, flagCell, index}) {
    if (!isCaved)
        return <div onClick={() => revealCell(index)} onContextMenu={(e) => flagCell(index, e)} className='w-10 h-10 bg-(--green)'>
            <span className='flex mx-auto text-2xl'>
                {isFlagged && '🚩'}
            </span>
        </div>;
    return <div onContextMenu={(e) => flagCell(index, e)} className='w-10 h-10 bg-(--brown) content-center'>
        <p className='text-center my-auto font-bold text-xl text-(--number)'>{minesAround || ''}</p>
    </div>;
});

export default Field;