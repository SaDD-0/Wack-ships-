//Spaceship prefab 
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, special ){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.special = special;

    }

    update() { 
        //options for special ships
        if(this.special){
            this.x -= this.moveSpeed *2;
        }
        //move spaceships left
        this.x -= this.moveSpeed;

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