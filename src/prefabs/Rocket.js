// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
      scene.add.existing(this);
      this.Left;
      this.Right;
      this.Fire;
      this.isFiring = false;
      this.moveSpeed = 2;
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        // left and right movement
        if (!this.isFiring){
            if (this.Left.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            } else if (this.Right.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(this.Fire) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play();
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed; 
        }
        // reset on miss 
        if (this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}