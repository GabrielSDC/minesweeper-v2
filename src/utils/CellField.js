import Cell from './Cell.js';

class CellField {
    constructor({w, h, b}) {
        this.width = w;
        this.height = h;
        this.totalMines = b;
        this.state = "none";

        this.emptyCells = h * w - b;
        this.cells = Array.from({ length: w * h }, (_, i) => new Cell(i % w, i / w));
        console.log(this.cells);    
        this.mines = [];

        // connect all cells to their neighboors
        for(let i = 0; i < h; i++) {
            for(let j = 0; j < w; j++) {
                let currentCell = this.cells[i * w + j];
                currentCell.addEdges(this, j, i, w, h);
            }
        }

        // place the mines into the field
        for(let i = 0; i < b; i++) {
            let cell;
            do {
                const x = parseInt(Math.random() * w);
                const y = parseInt(Math.random() * h);
                cell = this.cells[y * w + x];
            }
            while(cell.isMined);
            
            cell.placeMine();
            this.mines.push(cell);
        }
    }

    isCellMined(i, j) {
        if(i < 0 || i >= this.height || j < 0 || j >= this.width)
            return false;
        return this.cells[i * this.width + j].isMined || false;
    }

    getCell(i, j) {
        if(i < 0 || i >= this.height || j < 0 || j >= this.width)
            return undefined;
        return this.cells[i * this.width + j];
    }
}

export default CellField;