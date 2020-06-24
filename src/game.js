// const snake = require('.')

class GameController {
    constructor() {
        this.wrapper = $l('.wrapper');
        this.gameArea = $l('.game-area');
        this.setGameDimensions();

    }
    
    setGameDimensions() {
        const width = this.gameArea.css("width");
        this.gameArea.css("height", width);
    }
    
}

module.exports = GameController;