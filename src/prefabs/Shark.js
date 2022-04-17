class Shark extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        // add object to existing scene
        scene.add.existing(this);
        this.points = pointValue
        this.moveSpeed = game.settings.sharkSpeed;
    }

    update() {
        this.x -= this.moveSpeed;
        // wrap around
        if (this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    reset(){
        this.x = game.config.width;
        console.log(this.x);
    }
}