class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_explosion', './assets/Explosion.wav');
        this.load.audio('sfx_rocket', './assets/Laser_Shoot.wav');
        this.load.image('beach', './assets/beachmenu.png');
    }

    create() {
        //this.add.text(20, 20, "Rocket Patrol Menu");
        //this.scene.start("playScene");
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            //backgroundColor: '#F3B141',
            //color: '#843605',
            backgroundColor: '#f1a0ff',
            color: '#1823ff',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.beach = this.add.tileSprite(0, 0, 640, 480, 'beach').setOrigin(0, 0);
        //show menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL',
            //menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
            'P1: Use (A) & (D) to move & (W) to fire', menuConfig).setOrigin(0.5);
            
        this.add.text(game.config.width/2, game.config.height/2, 
            'P2: Use ←→ arrows to move & (↑) to fire', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#00FF00';
        menuConfig.backgroundColor = '#c2e0ff';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding,
            'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        this.beach.tilePositionX -= 4;
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            // settings
            game.settings = {
              sharkSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              sharkSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
    }
}