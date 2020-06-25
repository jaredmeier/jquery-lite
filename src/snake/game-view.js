const Board = require('./board.js');
const Snake = require('./snake.js');

class GameView {
    constructor() {
        this.$wrapper = $l('.wrapper');
        this.$gameArea = $l('.game-area');
        this.setGameDimensions();

        this.boardSize = 20;
        this.board = new Board(this.boardSize);
        this.snake = new Snake();
        
        this.gameKeys = {
            'ArrowUp': 'U', 
            'ArrowRight': 'R', 
            'ArrowDown': 'D',
            'ArrowLeft': 'L', 
        };
        
        this.createBoardHTML();
        this.setListeners();
    }

    setGameDimensions() {
        // Set game area to a square
        const width = this.$gameArea.css("width");
        this.$gameArea.css("height", width);
    }

    createBoardHTML() {
        // for (let i = 0; i < this.boardSize; i++) {
        //     const $row = this.$gameArea.append('<ul>');
        //     for (let j = 0; j < this.boardSize; j++) {
        //         $row.append('<li></li>');
        //     }
        // }
    }

    drawBoard() {

    }

    setListeners() {
        document.addEventListener("keydown", (e) => {
            const val = this.gameKeys[e.key];
            if (!val) return;

            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowRight':
                case 'ArrowDown':
                case 'ArrowLeft':
                    this.snake.turn(val);
                    break;
                default:
                    break;
            }
        })
    }

}

module.exports = GameView;