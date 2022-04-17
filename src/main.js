let config = {
    type: Phaser.CANVAS, 
    width: 900, 
    height: 750,
    scene: [ Menu, Play]
}
let game = new Phaser.Game(config);

//set UI size

let borderUIsize = game.config.height/15;
let borderPadding = borderUIsize/3;

// reserve keyboard vars
let keySPACE, keyR, keyLEFT, keyRIGHT;
let keyA, keyD, keyE;
