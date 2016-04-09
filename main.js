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
            this.VIDES = 3;
            this.PUNTUACIO = 0;
            this.DIAMANTS = 45;
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
            //Inicio la física
            game.physics.startSystem(Phaser.Physics.ARCADE);
        };
        mainState.prototype.reset = function () {
            this.VIDES = 3;
            this.PUNTUACIO = 0;
            this.game.state.restart();
        };
        mainState.prototype.ballMuerte = function () {
            this.ball.kill();
            this.VIDES = this.VIDES - 1;
            if (this.VIDES == 0) {
                this.videsContador.setText("Vides: " + this.VIDES);
                this.input.onTap.addOnce(this.reset, this);
            }
            else {
                this.videsContador.setText("Vides: " + this.VIDES);
                this.input.onTap.addOnce(this.configBall, this);
            }
        };
        mainState.prototype.configPaddle = function () {
            this.paddle = this.game.add.sprite(game.world.centerX, game.world.height - 50, 'paddle');
            // Cambiamos el "anchor" del jugador
            this.paddle.anchor.setTo(0.5, 0.5);
            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            game.physics.arcade.enable(this.paddle);
            this.paddle.body.immovable = true;
            //Per a que el paddle no surti del mon
            this.paddle.body.collideWorldBounds = true;
        };
        mainState.prototype.configBall = function () {
            //Posicio de la pelota
            this.ball = this.game.add.sprite(game.world.centerX, game.world.height - 85, 'ball');
            // Cambiamos el "anchor" del jugador
            this.ball.anchor.setTo(0.5, 0.5);
            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            game.physics.arcade.enable(this.ball);
            this.ball.body.velocity.x = 500;
            this.ball.body.velocity.y = 500;
            //Ball rebota.
            this.ball.body.bounce.set(1);
            //parets rebota
            this.ball.body.collideWorldBounds = true;
            // Quan surt de la pantalla.
            this.ball.checkWorldBounds = true;
            //Anem mirant els event de la bola
            this.ball.events.onOutOfBounds.add(this.ballMuerte, this);
        };
        mainState.prototype.configGrourpDiamants = function () {
            //diamants.
            this.elements = this.add.group();
            this.elements.enableBody = true;
            this.elements.physicsBodyType = Phaser.Physics.ARCADE;
            for (var x = 0; x < 5; x++) {
                for (var y = 0; y < 9; y++) {
                    var num = Math.floor((Math.random() * 3) + 1);
                    var color;
                    if (num == 1) {
                        color = 'elementYellow';
                    }
                    else if (num == 2) {
                        color = 'elementRed';
                    }
                    else {
                        color = 'elementPurple';
                    }
                    var newElement = new Diamante(this.game, y * this.ESPAIH, x * this.ESPAIV + 50, color);
                    this.elements.add(newElement);
                }
            }
        };
        mainState.prototype.create = function () {
            _super.prototype.create.call(this);
            this.game.physics.arcade.checkCollision.down = false;
            //Creo el color del background.
            game.stage.backgroundColor = "#000";
            this.configPaddle();
            this.configBall();
            this.configGrourpDiamants();
            //Contador vides
            this.videsContador = this.game.add.text(20, 35, " Vides : " + this.VIDES, { font: "25px Arial", fill: "#fff", align: "center" });
            //Contador de punts
            this.puntuacioContador = this.game.add.text(450, 35, " Puntuació : " + this.PUNTUACIO, { font: "25px Arial", fill: "#fff", align: "center" });
            // Cogemos los cursores para gestionar la entrada
            this.cursor = game.input.keyboard.createCursorKeys();
        };
        /**
         * Metodes per el update
         */
        mainState.prototype.movePlayer = function () {
            // Si pulsamos el cursor izquierdo
            if (this.cursor.left.isDown) {
                // Movemos al jugador a la izquierda
                this.paddle.body.velocity.x = -600;
            }
            else if (this.cursor.right.isDown) {
                // Movemos al jugador a la derecha
                this.paddle.body.velocity.x = 600;
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
        mainState.prototype.diamantCol = function (ball, diamante) {
            diamante.kill();
            this.DIAMANTS = this.DIAMANTS - 1;
            this.PUNTUACIO = this.PUNTUACIO + 10;
            this.puntuacioContador.setText("Puntuació :" + this.PUNTUACIO);
            //Si els diamants es queden a 0 posi mes diamants
            if (this.DIAMANTS == 0) {
                this.configGrourpDiamants();
            }
        };
        mainState.prototype.update = function () {
            _super.prototype.update.call(this);
            //Perque el paddle funcioni amb el ratolí
            this.paddle.position.x = this.game.input.x;
            game.physics.arcade.collide(this.ball, this.paddle);
            game.physics.arcade.collide(this.ball, this.elements, this.diamantCol, null, this);
            // this.movePlayer();
        };
        mainState.prototype.muerte = function () {
            game.state.start('main');
        };
        ;
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