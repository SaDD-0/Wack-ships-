//Spaceship prefab 
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;

        
        
        

    }

    preload(){
       
        this.load.spritesheet('altships', './assets/altShips.png', 
        {
            frameWidth: 126, 
            frameHeight: 32, 
            startFrame:0, 
            endFrame: 1
        });
        //animation config 
        this.anims.create({
            key: 'alt', 
            frames: this.anims.generateFrameNumbers('altships', {start:0, end:64, first:0}),
            frameRate: 25
        });

    }



    update() { 
        //move spaceships left
        this.x -= this.moveSpeed;

        let animation = this.add.sprite(this.x, this.y, 'altships');
        animation.anims.play('alt');
        //this.ship01.alpha = 0;

        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }
    // position reset
    reset() {
        this.x = game.config.width;
    }
}