const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
    }
  };
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('spaceship', 'assets/images/player.png');
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.image('bullet', 'assets/images/bullet.png');
  }
  
  function create() {
    this.spaceship = this.add.sprite(400, 500, 'spaceship');
  
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemies = this.physics.add.group({
        key: 'enemy',
        repeat: 8,
        setXY: { x: 70, y: 100, stepX: 80 }
      });
    
      this.enemies.children.iterate(function (enemy) {
        enemy.setScale(0.7);
      });

      this.bullets = this.physics.add.group();

      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.physics.add.collider(this.bullets, this.enemies, function (bullet, enemy) {
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        bullet.destroy();
        enemy.destroy();
      }.bind(this));

      this.score = 0;
      this.scoreText = this.add.text(16, 16, 'Score: '+this.score, { fontSize: '32px', fontFamily: 'Arial' });
  }
  
  
  function update() {
    if (this.cursors.left.isDown) {
      this.spaceship.x -= 5;
    } else if (this.cursors.right.isDown) {
      this.spaceship.x += 5;
    }

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      const bullet = this.bullets.create(this.spaceship.x, this.spaceship.y, 'bullet');
      bullet.setScale(0.5);
      bullet.setVelocityY(-400);
    }
   
    this.bullets.children.each(function (bullet) {
      if (bullet.y < 0) {
        bullet.destroy();
      }
    });

    if (this.enemies.children.size === 0) {
      this.scene.restart();
    }

  }
  