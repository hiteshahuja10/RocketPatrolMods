class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/newrocket.png');
        this.load.image('shark', './assets/shark.png');
        this.load.image('beach', './assets/beach.png');
        this.load.spritesheet('explosion', './assets/sharkexplosion.png', {frameWidth: 64, frameHeight: 32, 
            startFrame: 0, endFrame: 6});
    }

    create() {
        // place tile sprite
        this.beach = this.add.tileSprite(0, 0, 640, 480, 'beach').setOrigin(0, 0);
        // blue UI background
        this.add.rectangle(0, borderUISize, game.config.width, (borderUISize * 2)-5, 
            0x00EED1).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 
            0x000000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            0x000000).setOrigin(0, 0);

        // add rocket (p1)
        //0.5
        this.p1Rocket = new Rocket(this, game.config.width/2 + 100, 
            game.config.height - borderUISize - borderPadding-10, 'rocket').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width/2 - 100, 
            game.config.height - borderUISize - borderPadding-10, 'rocket').setOrigin(0.5, 0);

        // add sharks (x3)
        this.shark01 = new Shark(this, game.config.width + borderUISize*6, borderUISize*4, 'shark', 0,
            30).setOrigin(0, 0);
        this.shark02 = new Shark(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2,
            'shark', 0, 20).setOrigin(0,0);
        this.shark03 = new Shark(this, game.config.width, borderUISize*6 + borderPadding*4, 'shark', 0,
            10).setOrigin(0,0);

        // define keys
        this.p1Rocket.Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.p1Rocket.Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.p2Rocket.Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.p2Rocket.Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.p1Rocket.Fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.p2Rocket.Fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        //keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        //keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        this.p2Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f1a0ff',
            color: '#1823ff',
            align: 'right',
            padding: {
            //top: 2,
            //bottom: 2,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding, 
            this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(borderUISize*15+15, borderUISize + borderPadding, 
            this.p2Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            //'Press (R) to Restart or ← for Menu'
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ↑ for Menu',
                scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        //keyLeft
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(this.p1Rocket.Left)) {
            this.scene.start("menuScene");
        }
        this.beach.tilePositionX -= 4;
        if (!this.gameOver){
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.shark01.update();
            this.shark02.update();
            this.shark03.update();
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.shark03)) {
            this.p1Rocket.reset();
            this.p1Score += this.shark03.points;
            this.scoreRight.text = this.p1Score;
            this.shipExplode(this.shark03); 
        }
        if (this.checkCollision(this.p1Rocket, this.shark02)) {
            this.p1Rocket.reset();
            this.p1Score += this.shark02.points;
            this.scoreRight.text = this.p1Score;
            this.shipExplode(this.shark02); 
        }
        if (this.checkCollision(this.p1Rocket, this.shark01)) {
            this.p1Rocket.reset();
            this.p1Score += this.shark01.points;
            this.scoreRight.text = this.p1Score;
            this.shipExplode(this.shark01);
        }
        if(this.checkCollision(this.p2Rocket, this.shark03)) {
            this.p2Rocket.reset();
            this.p2Score += this.shark03.points;
            this.scoreLeft.text = this.p2Score;
            this.shipExplode(this.shark03); 
        }
        if (this.checkCollision(this.p2Rocket, this.shark02)) {
            this.p2Rocket.reset();
            this.p2Score += this.shark02.points;
            this.scoreLeft.text = this.p2Score;
            this.shipExplode(this.shark02); 
        }
        if (this.checkCollision(this.p2Rocket, this.shark01)) {
            this.p2Rocket.reset();
            this.p2Score += this.shark01.points;
            this.scoreLeft.text = this.p2Score;
            this.shipExplode(this.shark01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.sound.play('sfx_explosion');
    }
}