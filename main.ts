/// <reference path="phaser/phaser.d.ts"/>
import Point = Phaser.Point;

class mainState extends Phaser.State {
    game: Phaser.Game;
    private cursor:Phaser.CursorKeys;
    private paddle:Phaser.Sprite;

    // private paddle:Phaser.Sprite;

    preload():void {
        super.preload();

        this.load.image('paddle', 'assets/paddleBlu.png');
        this.load.image('ball', 'assets/ballBlue.png');
        this.load.image('elementYellow', 'assets/element_yellow_diamond.png');
        this.load.image('elementRed', 'assets/element_red_diamond.png');
        this.load.image('elementPurple', 'assets/element_purple_diamond.png');
        //Iniciamos el sistema de físicas
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create():void {
        super.create();
        this.game.stage.backgroundColor = "#ccc";
        this.physics.arcade.checkCollision.down = false;
        this.paddle = this.add.sprite(this.world.centerX, 0, 'paddle');
        this.physics.enable(this.paddle);
        this.paddle.x = this.world.centerX;
        this.paddle.y = this.world.height - this.paddle.height;
        this.paddle.body.bounce.setTo(0);
        this.paddle.body.immovable = true;


    }

    update():void {
        super.update();
    }

}

class SimpleGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(900, 700, Phaser.AUTO, 'gameDiv');

        this.game.state.add('main', mainState);
        this.game.state.start('main');

    }

}


window.onload = () => {
    var game = new SimpleGame();
};
