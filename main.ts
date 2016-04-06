/// <reference path="phaser/phaser.d.ts"/>

module GameModule
{
    var game: Phaser.Game;

    class mainState extends Phaser.State {


        cursor: Phaser.CursorKeys;
        paddle:Phaser.Sprite;
        ball:Phaser.Sprite;
        elements:Phaser.Group;
        ESPAIH = 106;
        ESPAIV = 70;

        // private paddle:Phaser.Sprite;

        preload():void {
            super.preload();

            //Precargo les imatges

            game.load.image('paddle', 'assets/paddleBlu.png');
            game.load.image('ball', 'assets/ballBlue.png');
            game.load.image('elementYellow', 'assets/element_yellow_diamond.png');
            game.load.image('elementRed', 'assets/element_red_diamond.png');
            game.load.image('elementPurple', 'assets/element_purple_diamond.png');

        }

        create():void {
            super.create();

            //Creo el color del background.
            game.stage.backgroundColor = "#ccc";
            //Inicio la física
            game.physics.startSystem(Phaser.Physics.ARCADE);



            this.paddle = this.game.add.sprite(
                game.world.centerX,
                game.world.height - 50,
                'paddle'
            )
            // Cambiamos el "anchor" del jugador
            this.paddle.anchor.setTo(0.5, 0.5);

            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            game.physics.arcade.enable(this.paddle);
            this.paddle.body.immovable = true;

            //Posicio de la pelota
            this.ball = this.game.add.sprite(
                game.world.centerX,
                game.world.height - 250,
                'ball'
            )
            // Cambiamos el "anchor" del jugador
            this.ball.anchor.setTo(0.5, 0.5);
            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            game.physics.arcade.enable(this.ball);
            this.ball.body.gravity.y = 580;
            this.ball.body.bounce.set(1);



            this.elements = this.add.group();
            this.elements.enableBody = true;

            for (var line = 0; line < 5; line++) //CREAMOS 5 LINEAS
            {
                for (var column = 0; column < 9; column++) //Y 10 COLUMNAS
                {
                    var num = Math.floor((Math.random() *3) + 1);
                    var COLOUR;
                    if (num==1) {
                        COLOUR = 'elementYellow'
                    } else if(num==2){
                       COLOUR='elementRed'
                    } else {
                        COLOUR = 'elementPurple'
                    }
                    var newElement = new Diamante(this.game, this.ESPAIH * column, line * this.ESPAIV + 50, COLOUR, 0);
                    this.add.existing(newElement);
                    this.elements.add(newElement);
                }
            }





        // Cogemos los cursores para gestionar la entrada
           this.cursor = game.input.keyboard.createCursorKeys();

        }

        movePlayer():void {
            // Si pulsamos el cursor izquierdo
            if (this.cursor.left.isDown) {
                // Movemos al jugador a la izquierda
                this.paddle.body.velocity.x = -200;
            }
            // Si pulsamos el cursor derecho
            else if (this.cursor.right.isDown) {
                // Movemos al jugador a la derecha
                this.paddle.body.velocity.x = 200;
            }
            // Si no se pulsan ni el cursor izquierdo ni el derecho
            else {
                // el jugador se para
                this.paddle.body.velocity.x = 0;
            }
            // Si pulsamos la flecha arriba y el jugador está tocando el suelo
            if (this.cursor.up.isDown && this.paddle.body.touching.down) {
                // el jugador se mueve hachi arriba (salto)
                this.paddle.body.velocity.y = -320;
            }
        }

        update():void {
            super.update();
            game.physics.arcade.collide(this.ball, this.paddle);
            this.movePlayer();
        }

    }

    export class SimpleGame {


        constructor() {
            game = new Phaser.Game(900, 700, Phaser.AUTO, 'gameDiv');

            game.state.add('main', mainState);
            game.state.start('main');

        }

    }
    class Diamante extends Phaser.Sprite {
        constructor(game:Phaser.Game, x:number, y:number, key:string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame:string|number) {
            super(game, x, y, key, frame);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
        }
    }

}
window.onload = () => {
    var game = new GameModule.SimpleGame();
};
