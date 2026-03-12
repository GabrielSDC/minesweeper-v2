import { useState } from 'react';
import Cell from './Cell.jsx'

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

    function revealCell(i) {
        if (cells[i].isFlagged || cells[i].isCaved) {
            return;
        }

        const next = [...cells];
        
        if (cells[i].isMined) {
            setCells(next.map((cell) => cell.isMined ? {...cell, isCaved: true} : cell));
            return;
        }
        
        for (let index of floodFillIndexes(cells, i)) {
            next[index] = { ...next[index], isCaved: true };
        }
        
        setCells(next);
    }

    function flagCell(i, e) {
        e.preventDefault();

        const next = [...cells];

        if (!next[i].isCaved) {
            next[i] = { ...next[i], isFlagged: !next[i].isFlagged };
        }

        setCells(next);
    }
    
    function revealAround(i) {
        const flagsAround = cells[i].neighbors
            .map((cell) => cells[cell.y * w + cell.x].isFlagged)
            .reduce((acc, curr) => acc + curr, 0);

        if (cells[i].minesAround === 0 || cells[i].minesAround !== flagsAround) {
            return;
        }
        
        const next = [...cells];

        for (const cell of cells[i].neighbors) {
            const j = cell.y * w + cell.x;
            
            
            for (let index of floodFillIndexes(cells, j)) {
                if (next[index].isMined) {
                    setCells(next.map((cell) => cell.isMined ? {...cell, isCaved: true} : cell));
                    return;
                }

                next[index] = { ...next[index], isCaved: true };
            }
        }

        setCells(next);
    }

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
                            revealAround={revealAround}  
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

export default Field;