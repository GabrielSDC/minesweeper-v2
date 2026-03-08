export default class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.minesAround = 0;
        this.isMined = false;
        this.isFlagged = false;
        this.isCaved = false;
        this.neighbors = [];
    }
    
    addEdges(field, x, y, w, h) {
        for(let i = y - 1; i <= y + 1; i++) {
            for(let j = x - 1; j <= x + 1; j++) {
                if(i === y && j === x) 
                    continue;
                field.getCell(i, j) && this.neighbors.push(field.getCell(i, j));
            }
        }
    }

    placeMine() {
        this.isMined = true;
        this.minesAround = 9;
        for(let neighbor of this.neighbors)  {
            neighbor.minesAround++;
        }
    }
}