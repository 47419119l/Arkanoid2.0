var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser/phaser.d.ts"/>
var Point = Phaser.Point;
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
    }
    // private paddle:Phaser.Sprite;
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.load.image('paddle', 'assets/paddleBlu.png');
        this.load.image('ball', 'assets/ballBlue.png');
        this.load.image('elementYellow', 'assets/element_yellow_diamond.png');
        this.load.image('elementRed', 'assets/element_red_diamond.png');
        this.load.image('elementPurple', 'assets/element_purple_diamond.png');
        //Iniciamos el sistema de físicas
        this.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        this.game.stage.backgroundColor = "#ccc";
        this.physics.arcade.checkCollision.down = false;
        this.paddle = this.add.sprite(this.world.centerX, 0, 'paddle');
        this.physics.enable(this.paddle);
        this.paddle.x = this.world.centerX;
        this.paddle.y = this.world.height - this.paddle.height;
        this.paddle.body.bounce.setTo(0);
        this.paddle.body.immovable = true;
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return mainState;
})(Phaser.State);
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(900, 700, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=main.js.map