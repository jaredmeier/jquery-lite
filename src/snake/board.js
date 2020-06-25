class Board {
    constructor(size) {
        this.grid = this.initGrid(size);
    }

    initGrid(size) {
        const grid = [];
        for (let i = 0; i < size; i++) {
            grid[i] = new Array(size).fill(0);
        }
        return grid;
    }
}

module.exports = Board;