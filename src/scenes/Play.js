class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        // load images and tile sprites
        this.load.image('rocket',    './assets/rocket.png');
        this.load.image('rocket2',   './assets/rocket2.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // loads spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame:0,
            endFrame: 9});
        this.load.atlas('altShips', './assets/altShips.png', './assets/Altshipanim.json');
       /*this.load.spritesheet('altShip', './assets/altShips.png',{
            frameWidth: 63, 
            frameHeight: 32, 
            startFrame: 0, 
            endFrame:1});*/
    }

    

    create(){
        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0);
        // green UI background
        this.add.rectangle(0, borderUIsize + borderPadding, game.config.width, borderUIsize * 2, 0x00FF00).setOrigin(0,0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUIsize, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUIsize, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0,0);

       
        //definte keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 15, game.config.height - borderUIsize - borderPadding, 'rocket', null, keyLEFT, keyRIGHT, keySPACE).setOrigin(0.5,0).setScale(2);
        //add rocket (p2) if 2 player is selected
        if(game.settings.coopMode == 1){
            this.p2Rocket = new Rocket(this, game.config.width/2 + 15, game.config.height - borderUIsize - borderPadding, 'rocket2', null, keyA, keyD, keyE).setOrigin(0.5,0).setScale(2);
        }    
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUIsize*6, borderUIsize*4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUIsize*3, borderUIsize*5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUIsize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        
        //animation config
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end:9, first:0}), 
            frameRate: 30
        });  

        /*this.anims.create({
            key: 'alt', 
            frames: this.anims.generateFrameNumbers('altShip', {start: 0, end: 1, first: 0}), 
            frameRate: 10, 
            repeat: -1
        });

        this.ship01.anims.play('alt'); */

        this.anims.create({
            key: 'alt', 
            frames: this.anims.generateFrameNames('altShips', {
                prefix: 'ship',
                start: 0, 
                end: 1,
                first: 0, 
                zeroPad: 3}),
                frameRate: 10,
                repeat: -1
        });

        this.ship01.anims.play('alt');

        //initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUIsize + borderPadding, borderUIsize + borderPadding*2, this.p1Score, scoreConfig);

        //GAME OVER flag
        this.gameOver = false;


        //60-second play clock 
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart or <- for Menu', 
            scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(){
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;

        if(!this.gameOver){
            this.p1Rocket.update();
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
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(game.settings.coopMode == 1){
        //check collisions for p2 
            if(this.checkCollision(this.p2Rocket, this.ship03)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship03);
            }
            if(this.checkCollision(this.p2Rocket, this.ship02)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship02);
            }
            if(this.checkCollision(this.p2Rocket, this.ship01)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship01);
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

    shipExplode(ship){
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
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //play explosion sound
        this.sound.play('sfx_explosion');
    }
}
 




