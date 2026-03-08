import { memo } from 'react';

const Cell = memo(function Cell({minesAround, isCaved, isFlagged, isMined, revealCell, gameOver, flagCell, index}) {
    if (!isCaved) {
        return <div onClick={() => isMined ? gameOver() : revealCell(index)} 
                    onContextMenu={(e) => flagCell(index, e)} 
                    className='w-10 h-10 bg-(--green) content-center'>
            <p className='text-center text-xl'>
                {isFlagged && '🚩'}
            </p>
        </div>;
    }

    return <div onContextMenu={(e) => flagCell(index, e)} 
                className='w-10 h-10 bg-(--brown) content-center'>
        <p className='text-center my-auto font-bold text-xl text-(--number)'>{isMined ? '💣' : minesAround || ''}</p>
    </div>;
});

export default Cell;