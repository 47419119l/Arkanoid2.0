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
            //Inicio la física
            game.physics.startSystem(Phaser.Physics.ARCADE);
        }

        create():void {
            super.create();
            this.game.physics.arcade.checkCollision.down = false;
            //Creo el color del background.
            game.stage.backgroundColor = "#000";


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
            //Per a que el paddle no surti del mon
            this.paddle.body.collideWorldBounds = true;

            //Posicio de la pelota
            this.ball = this.game.add.sprite(
                game.world.centerX,
                game.world.height - 85,
                'ball'
            )
            // Cambiamos el "anchor" del jugador
            this.ball.anchor.setTo(0.5, 0.5);
            // Le decimos a Phaser que el usuario usará el motor de físicas Arcade
            game.physics.arcade.enable(this.ball);
            this.ball.body.velocity.x=500;
            this.ball.body.velocity.y=500;

            //Ball rebota.
            this.ball.body.bounce.set(1);
            //parets rebota
            this.ball.body.collideWorldBounds = true;

            //diamants.
            this.elements = this.add.group();
            this.elements.enableBody = true;
            this.elements.physicsBodyType = Phaser.Physics.ARCADE;
            for (var x = 0; x < 5; x++)
            {
                for (var y = 0; y < 9; y++)
                {
                    var num = Math.floor((Math.random() *3) + 1);
                    var color;
                    if (num==1) {
                        color = 'elementYellow'
                    } else if(num==2){
                       color='elementRed'
                    } else {
                        color = 'elementPurple'
                    }
                    var newElement = new Diamante(this.game, y*this.ESPAIH , x * this.ESPAIV + 50, color);
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
                this.paddle.body.velocity.x = -600;
            }
            // Si pulsamos el cursor derecho
            else if (this.cursor.right.isDown) {
                // Movemos al jugador a la derecha
                this.paddle.body.velocity.x = 600;
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
            game.physics.arcade.collide(this.ball, this.elements, this.diamantCol, null, this)
            this.movePlayer();
        }

        private diamantCol(ball:Phaser.Sprite, diamante:Diamante) {
            diamante.kill();
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
