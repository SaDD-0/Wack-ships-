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

/* 
Name: William Morales 
Project Title: GALABE (Wanabe Galaga, I based the ship designs on the Galaga ships)
Date: 4/17/2022
Time to Complete: I'll say about 10-20 hours, wasn't keeping much track

Score Breakdown: 
Create a new scrolling sprite for the background: 5
Allow the player to control the Rocket after it's fired: 5
Display the time (in seconds) on the screen: 10
Implement parallax scrolling: 10
Create a new spaceship type (w/new artwork) that's smaller, moves faster, and is worth more points: 20
Create new artwork for all of the in-game assets (rocket, spaceships, explosion): 20
Implement a new timing/scoring mechanism that adds time to the clock for successful hits: 20
Implement a simultaneous two-player mode: 30

Total 120

ps. Does the animated sprite for the spaceship count for the 10 points for the novice tier requirement
or does it double dip?
*/