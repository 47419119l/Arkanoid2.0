/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameModule;
(function (GameModule) {
    var game;
    var mainState = (function (_super) {
        __extends(mainState, _super);
        function mainState() {
            _super.apply(this, arguments);
            this.ESPAIH = 106;
            this.ESPAIV = 70;
        }
        // private paddle:Phaser.Sprite;
        mainState.prototype.preload = function () {
            _super.prototype.preload.call(this);
            //Precargo les imatges
            game.load.image('paddle', 'assets/paddleBlu.png');
            game.load.image('ball', 'assets/ballBlue.png');
            game.load.image('elementYellow', 'assets/element_yellow_diamond.png');
            game.load.image('elementRed', 'assets/element_red_diamond.png');
            game.load.image('elementPurple', 'assets/element_purple_diamond.png');
        };
        mainState.prototype.create = function () {
            _super.prototype.create.call(this);
            //Creo el color del background.
            game.stage.backgroundColor = "#ccc";
            //Inicio la física
            game.physics.startSystem(Phaser.Physics.ARCADE);
            this.paddle = this.game.add.sprite(game.world.centerX, game.world.height - 50, 'paddle');
            // Cambiamos el "anchor" del jugador
            this.paddle.anchor.setTo(0.5, 0.5);
            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            game.physics.arcade.enable(this.paddle);
            //Posicio de la pelota
            this.ball = this.game.add.sprite(game.world.centerX, game.world.height - 250, 'ball');
            // Cambiamos el "anchor" del jugador
            this.ball.anchor.setTo(0.5, 0.5);
            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            game.physics.arcade.enable(this.ball);
            this.ball.body.gravity.y = 500;
            this.elements = this.add.group();
            this.elements.enableBody = true;
            for (var line = 0; line < 5; line++) {
                for (var column = 0; column < 9; column++) {
                    var num = Math.floor((Math.random() * 3) + 1);
                    var COLOUR;
                    if (num == 1) {
                        COLOUR = 'elementYellow';
                    }
                    else if (num == 2) {
                        COLOUR = 'elementRed';
                    }
                    else {
                        COLOUR = 'elementPurple';
                    }
                    var newElement = new Diamante(this.game, this.ESPAIH * column, line * this.ESPAIV + 50, COLOUR, 0);
                    this.add.existing(newElement);
                    this.elements.add(newElement);
                }
            }
            // Cogemos los cursores para gestionar la entrada
            this.cursor = game.input.keyboard.createCursorKeys();
        };
        mainState.prototype.movePlayer = function () {
            // Si pulsamos el cursor izquierdo
            if (this.cursor.left.isDown) {
                // Movemos al jugador a la izquierda
                this.paddle.body.velocity.x = -200;
            }
            else if (this.cursor.right.isDown) {
                // Movemos al jugador a la derecha
                this.paddle.body.velocity.x = 200;
            }
            else {
                // el jugador se para
                this.paddle.body.velocity.x = 0;
            }
            // Si pulsamos la flecha arriba y el jugador está tocando el suelo
            if (this.cursor.up.isDown && this.paddle.body.touching.down) {
                // el jugador se mueve hachi arriba (salto)
                this.paddle.body.velocity.y = -320;
            }
        };
        mainState.prototype.update = function () {
            _super.prototype.update.call(this);
            this.movePlayer();
        };
        return mainState;
    })(Phaser.State);
    var SimpleGame = (function () {
        function SimpleGame() {
            game = new Phaser.Game(900, 700, Phaser.AUTO, 'gameDiv');
            game.state.add('main', mainState);
            game.state.start('main');
        }
        return SimpleGame;
    })();
    GameModule.SimpleGame = SimpleGame;
    var Diamante = (function (_super) {
        __extends(Diamante, _super);
        function Diamante(game, x, y, key, frame) {
            _super.call(this, game, x, y, key, frame);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
        }
        return Diamante;
    })(Phaser.Sprite);
})(GameModule || (GameModule = {}));
window.onload = function () {
    var game = new GameModule.SimpleGame();
};
//# sourceMappingURL=main.js.map