class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: 'red',
            color: 'black',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUIsize - 
        borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = 'yellow';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2, '(P1) Use <- -> arrows to move & (F) to fire',
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUIsize + 
        borderPadding, '(P2) use (A) & (D) to move & (E) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = 'blue';
        menuConfig.color = 'white';
        this.add.text(game.config.width/2, game.config.height/2 + borderUIsize + borderPadding*5, 'Press (Space) for single-player', menuConfig).setOrigin(.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUIsize + borderPadding*9, 'Press (E) for two-player', menuConfig).setOrigin(.5);


        //define keys
        keySPACE  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); 
    }

    update(){

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            game.settings = {
                spaceshipSpeed: 3, 
                gameTimer: 60000,
                coopMode: 0
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyE)){
            game.settings = {
                spaceshipSpeed: 4, 
                gameTimer: 60000, 
                coopMode: 1
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

       /* if(Phaser.Input.Keyboard.JustDown(keyE)){
            game.settings = {
                coopMode: true
            }
        }*/

        

    }
}