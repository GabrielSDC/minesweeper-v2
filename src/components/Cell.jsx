import { memo } from 'react';

const Cell = memo(function Cell({minesAround, isCaved, isFlagged, isMined, revealCell, revealAround, flagCell, index}) {
    if (!isCaved) {
        return <div onClick={() => revealCell(index)} 
                    onContextMenu={(e) => flagCell(index, e)} 
                    className='w-8 h-8 bg-(--green) hover:border hover:border-(--green-border) content-center'>
            <p className='text-center text-lg select-none'>
                {isFlagged && '🚩'}
            </p>
        </div>;
    }

    return <div onClick={() => revealAround(index)} 
                onContextMenu={(e) => flagCell(index, e)} 
                className='w-8 h-8 bg-(--brown) hover:border hover:border-(--brown-border) content-center'>
        <p className='text-center my-auto font-bold text-lg text-(--number) select-none'>
            {isMined ? '💣' : minesAround || ''}
        </p>
    </div>;
});

export default Cell;