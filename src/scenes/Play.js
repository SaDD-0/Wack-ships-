class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        // load images and tile sprites
        this.load.image('rocket',    './assets/rocket.png');
        this.load.image('rocket2',   './assets/rocket2.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield2', './assets/starfield2.png');
        // loads spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 114,
            frameHeight: 100,
            startFrame:0,
            endFrame: 9});
        this.load.spritesheet('ship', './assets/RegShips.png', {
            frameWidth: 114, 
            frameHeight: 100, 
            startFrame: 0, 
            endFrame: 3});
        this.load.spritesheet('speship', './assets/SpeShip.png', {
            frameWidth: 92, 
            frameHeight: 66, 
            startFrame: 0, 
            endFrame: 3});
    }

    

    create(){
        //60-second play clock 
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>{
            this.add.text(game.config.width/2, game.config.height/2, ' GAME OVER ', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, ' Press (R) to Restart or <- for Menu ', 
            scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);


        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,game.config.width,game.config.height, 'starfield').setOrigin(0,0);
        this.starfield2 = this.add.tileSprite(0,0,game.config.width,game.config.height, 'starfield2').setOrigin(0,0);
        // green UI background
        this.add.rectangle(0, 0, game.config.width, borderUIsize, 0x00FF00).setOrigin(0,0);

       
        //definte keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 15, game.config.height - borderUIsize - borderPadding, 'rocket', 0, keyLEFT, keyRIGHT, keySPACE, this.clock).setOrigin(0.5,0);
        
        //add rocket (p2) if 2 player is selected
        if(game.settings.coopMode == 1){
            this.p2Rocket = new Rocket(this, game.config.width/2 + 15, game.config.height - borderUIsize - borderPadding, 'rocket2', 0, keyA, keyD, keyE, this.clock).setOrigin(0.5,0);
        }    
        
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width*.3, borderUIsize*2, 'speship', 0, 30, true).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width*.2, borderUIsize*5, 'ship', 0, 20, false).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width*.1, borderUIsize*8, 'ship', 0, 10, false).setOrigin(0,0);
        
        //animation config
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end:9, first:0}), 
            frameRate: 30
        });  

        this.anims.create({
            key: 'ships', 
            frames: this.anims.generateFrameNumbers('ship', {start: 0, end: 3, first: 0}), 
            frameRate: 10, 
            repeat: -1
        });

        this.anims.create({
            key: 'specialShip', 
            frames: this.anims.generateFrameNumbers('speship', {start: 0, end: 3, first: 0}), 
            frameRate: 10, 
            repeat: -1
        });

        //animate ships 
        this.ship01.anims.play('specialShip');
        this.ship02.anims.play('ships');
        this.ship03.anims.play('ships');

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        // display time 
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: 'red',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        
        //initialize score
        this.p1Score = 0;
        //add score to screen 
        this.scoreLeft = this.add.text(borderUIsize + borderPadding, borderPadding- 9,'P1 Score ' + this.p1Score, scoreConfig);

        // add scoring for player two 
        if(game.settings.coopMode == 1){
            this.p2Score = 0;
            console.log(this.p2Score);
            this.scoreRight = this.add.text(borderUIsize + borderPadding *17, borderPadding -9,'P2 Score ' + this.p2Score, scoreConfig);
        }
        //initialize time 
        //this.timeLeft;
        this.timer = this.add.text(borderUIsize + borderPadding *35, borderPadding -9,'Time Left ' + this.clock.getRemainingSeconds().toFixed(0), timerConfig);
        
        //GAME OVER flag
        this.gameOver = false;
    }

    update(){
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        // update timer 
        this.timer.text = 'Time Left ' + this.clock.getRemainingSeconds().toFixed(0);


        //Parallax scrolling 
        this.starfield.tilePositionX -= 2;
        this.starfield2.tilePositionX -= 20;

        //run game until game over state is reached 
        if(!this.gameOver){
            this.p1Rocket.update();
            // only update if two player mode is selected
            if(game.settings.coopMode == 1){
                this.p2Rocket.update();
            }
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions for p1
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03,this.p1Rocket);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02,this.p1Rocket);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01,this.p1Rocket);
        }

        //check collisions for p2 
        if(game.settings.coopMode == 1){
            if(this.checkCollision(this.p2Rocket, this.ship03)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship03,this.p2Rocket);
            }
            if(this.checkCollision(this.p2Rocket, this.ship02)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship02,this.p2Rocket);
            }
            if(this.checkCollision(this.p2Rocket, this.ship01)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship01,this.p2Rocket);
            }
        }

    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship.width &&
           rocket.x + rocket.width > ship.x &&
           rocket.y < ship.y + ship.height &&
           rocket.height + rocket.y > ship.y){
               return true;
        }else{
            return false;
        }
    }

    shipExplode(ship, rocket){
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () =>{
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        if(rocket == this.p1Rocket){
        //score add and time
            if(ship.special){
                this.p1Score += ship.points * 3;
                this.clock.delay += ship.points * 100;
            }
            else{
            this.p1Score += ship.points;
            this.clock.delay += ship.points * 100; 
            }
        }
        else if(rocket == this.p2Rocket){
            //score add and time
            if(ship.special){
                this.p2Score += ship.points * 3;
                this.clock.delay += ship.points * 100;
            }
            else{
            this.p2Score += ship.points;
            this.clock.delay += ship.points * 100; 
            }
        } 

        this.scoreLeft.text = 'P1 Score ' + this.p1Score;
        if(game.settings.coopMode == 1){
            this.scoreRight.text = 'P2 Score ' + this.p2Score;
        }
        

        //play explosion sound
        this.sound.play('sfx_explosion');
    }
}
 




