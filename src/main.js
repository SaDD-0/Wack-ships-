let config = {
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480,
    scene: [ Menu, Play]
}
let game = new Phaser.Game(config);

//set UI size

let borderUIsize = game.config.height/15;
let borderPadding = borderUIsize/3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
