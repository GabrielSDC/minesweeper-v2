import { useState } from 'react';
import Cell from './Cell.jsx'
import SelectMode from './SelectMode.jsx';
import { useField, useFieldDispatch } from '../contexts/FieldContext.jsx';

function Field() {
    const field = useField();
    const dispatch = useFieldDispatch();

    const [cells, setCells] = useState(field.cells);
    const [bombs, setBombs] = useState(field.totalMines);
    const [gameState, setGameState] = useState('playing');

    function floodFillIndexes(cells, i, indexes = []) {
        if (indexes.includes(i) || cells[i].isFlagged || cells[i].isCaved) {
            return indexes;
        }
        
        indexes.push(i);

        if (cells[i].minesAround != 0) {
            return indexes;
        }

        for (const cell of cells[i].neighbors) {
            const index = cell.y * field.width + cell.x;
            floodFillIndexes(cells, index, indexes);
        }

        return indexes;
    }

    function revealCell(i) {
        if (gameState === 'stopped' || cells[i].isFlagged || cells[i].isCaved) {
            return;
        }

        const next = [...cells];
        
        if (cells[i].isMined) {
            setCells(next.map((cell) => cell.isMined ? {...cell, isCaved: true} : cell));
            setGameState('stopped');
            return;
        }
        
        for (let index of floodFillIndexes(cells, i)) {
            next[index] = { ...next[index], isCaved: true };
        }

        const revealedCells = next
            .map((cell) => next[cell.y * field.width + cell.x].isCaved)
            .reduce((acc, curr) => acc + curr, 0);

        if (field.emptyCells - revealedCells === 0) {
            setCells(next.map((cell) => cell.isMined ? {...cell, isFlagged: true} : cell));
            setGameState('stopped');
            alert('ganhou');
        }
        
        setCells(next);
    }

    function flagCell(i, e) {
        e.preventDefault();
        
        if (gameState === 'stopped' || cells[i].isCaved) {
            return;
        }
        
        const next = [...cells];
        next[i] = { ...next[i], isFlagged: !next[i].isFlagged };

        setBombs(bombs + (next[i].isFlagged ? -1 : 1));
        setCells(next);
    }
    
    function revealAround(i) {
        const flagsAround = cells[i].neighbors
            .map((cell) => cells[cell.y * field.width + cell.x].isFlagged)
            .reduce((acc, curr) => acc + curr, 0);

        if (gameState === 'stopped' || cells[i].minesAround === 0 || cells[i].minesAround !== flagsAround) {
            return;
        }
        
        const next = [...cells];

        for (const cell of cells[i].neighbors) {
            const j = cell.y * field.width + cell.x;
            
            for (let index of floodFillIndexes(cells, j)) {
                if (next[index].isMined) {
                    setCells(next.map((cell) => cell.isMined ? {...cell, isCaved: true} : cell));
                    setGameState('stopped');
                    return;
                }

                next[index] = { ...next[index], isCaved: true };
            }
        }
        
        const revealedCells = next
            .map((cell) => next[cell.y * field.width + cell.x].isCaved)
            .reduce((acc, curr) => acc + curr, 0);

        if (field.emptyCells - revealedCells === 0) {
            setCells(next.map((cell) => cell.isMined ? {...cell, isFlagged: true} : cell));
            setGameState('stopped');
            alert('You won!');
        }

        setCells(next);
    }

    function refreshGame() {
        dispatch({
            type: 'restartField'
        });

        setGameState('playing')
        setBombs(field.totalMines);
        setCells(field.cells);
    }

    return (
        <div className='flex flex-col gap-4 p-6'>
        <div className='flex w-full justify-around text-xl'>
            <p className='my-auto'>🚩 {bombs}</p>
            <SelectMode refreshGame={refreshGame}/>
            <button className='p-2 cursor-pointer hover:bg-(--gray) transition rounded' 
                    onClick={() => refreshGame()}>
                    🔁 Restart
            </button>
        </div>
        <table className='mx-auto my-auto border-4 border-(--green-border)'>
            <tbody>
            {Array.from({ length: field.height }, (_, row) => (
                <tr key={'row'+row}>
                {Array.from({ length: field.width }, (_, col) => (
                    <td key={'cols'+col}>
                        <Cell key={row * field.width + col}
                            index={row * field.width + col} 
                            cell={cells[row * field.width + col]} 
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
        </div>
    );
}

export default Field;