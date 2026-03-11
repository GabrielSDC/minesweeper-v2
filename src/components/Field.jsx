import { useReducer, useCallback } from 'react';
import Cell from './Cell.jsx'

function Field({field, w, h}) {
    const [cells, dispatch] = useReducer(cellsReducer, field.cells);

    const revealCell = useCallback((i) => {
        dispatch({
            type: 'reveal',
            index: i,
            w: w
        });
    }, []);

    const flagCell = useCallback((i, e) => {
        dispatch({
            type: 'flag',
            index: i, 
            e: e
        });
    }, []);
    
    const revealAround = useCallback((i) => {
        dispatch({
            type: 'around',
            index: i,
            w: w
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

function cellsReducer(cells, action) {
    switch (action.type) {
        case 'reveal': {
            const i = action.index;

            if (cells[i].isFlagged || cells[i].isCaved) {
                return cells;
            }

            const next = [...cells];
            
            if (cells[i].isMined) {
                return next.map((cell) => cell.isMined ? {...cell, isCaved: true} : cell);
            }
            
            for (let index of floodFillIndexes(cells, i, action.w)) {
                next[index] = { ...next[index], isCaved: true };
            }
            
            return next;
        }
        case 'around': {
            const i = action.index;
            const flagsAround = cells[i].neighbors
                .map((cell) => cells[cell.y * action.w + cell.x].isFlagged)
                .reduce((acc, curr) => acc + curr, 0);

            if (cells[i].minesAround === 0 || cells[i].minesAround !== flagsAround) {
                return cells;
            }

            const next = [...cells];

            for (const cell of next[i].neighbors) {
                const j = cell.y * action.w + cell.x;

                for (let index of floodFillIndexes(next, j, action.w)) {
                    if (cells[index].isMined) {
                        return next.map((cell) => cell.isMined ? {...cell, isCaved: true} : cell);
                    }

                    next[index] = { ...next[index], isCaved: true };
                }
            }

            return next;
        }
        case 'flag': {
            action.e.preventDefault();

            const i = action.index;
            const next = [...cells];

            if (!next[i].isCaved) {
                next[i] = { ...next[i], isFlagged: !next[i].isFlagged };
            }

            console.log(next[i]);
            
            return next;
        }
    }
}

function floodFillIndexes(cells, i, w, indexes = []) {
    if (indexes.includes(i) || cells[i].isFlagged || cells[i].isCaved) {
        return indexes;
    }
    
    indexes.push(i);

    if (cells[i].minesAround != 0) {
        return indexes;
    }

    for (const cell of cells[i].neighbors) {
        const index = cell.y * w + cell.x;
        floodFillIndexes(cells, index, w, indexes);
    }

    return indexes;
}

export default Field;