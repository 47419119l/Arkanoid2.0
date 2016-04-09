/// <reference path="phaser/phaser.d.ts"/>

module GameModule
{
    var game: Phaser.Game;

    class mainState extends Phaser.State {
        puntuacioContador:Phaser.Text;
        videsContador:Phaser.Text;
        cursor: Phaser.CursorKeys;
        paddle:Phaser.Sprite;
        ball:Phaser.Sprite;
        elements:Phaser.Group;


        ESPAIH = 106;
        ESPAIV = 70;
        VIDES = 3;
        PUNTUACIO=0;
        DIAMANTS =16;
        ROUND=1;

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

        reset(){
            this.VIDES = 3;
            this.DIAMANTS=16;
            this.PUNTUACIO=0;
            this.game.state.restart();
        }
        ballMuerte():void{
            this.ball.kill();
            this.VIDES=this.VIDES-1;
            if(this.VIDES==0){
                this.videsContador.setText("Vides: " + this.VIDES);
                this.input.onTap.addOnce(this.reset, this);
            }else{
                this.videsContador.setText("Vides: " + this.VIDES);
                this.input.onTap.addOnce( this.configBall, this);
            }



        }
        configPaddle(){
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


        }
        configBall(){
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
            // Quan surt de la pantalla.
            this.ball.checkWorldBounds = true;


            //Anem mirant els event de la bola
            this.ball.events.onOutOfBounds.add(this.ballMuerte, this);

        }
        configGrourpDiamants(){
            //diamants.
            this.elements = this.add.group();
            this.elements.enableBody = true;
            this.elements.physicsBodyType = Phaser.Physics.ARCADE;
            for (var x = 0; x < 9; x++) {
                for (var y = 0; y < 9; y++) {
                    var num = Math.floor((Math.random() * 3) + 1);
                    var color;
                   if(this.ROUND==1) {
                       if (x == 0 && y == 3 || x == 0 && y == 5
                           || x == 1 && y == 3 || x == 1 && y == 4 || x == 1 && y == 5 || x == 1 && y == 6 || x == 1 && y == 2 ||
                           x == 2 && y == 2 || x == 2 && y == 3 || x == 2 && y == 4 || x == 2 && y == 5 || x == 2 && y == 6 ||
                           x == 3 && y == 3 || x == 3 && y == 4 || x == 3 && y == 5
                           || x == 4 && y == 4) {
                           color = 'elementYellow'
                           var newElement = new Diamante(this.game, y * this.ESPAIH, x * this.ESPAIV + 50, color);
                           this.elements.add(newElement);
                       }
                   }else{
                       if (x == 0 && y == 0 || x == 0 && y == 1 || x == 0 && y ==7 || x == 0 && y == 8 ||
                           x == 1 && y == 0 || x == 1 && y == 8 ||
                           x == 4 && y == 0 || x == 4 && y == 8 ||
                           x == 5 && y == 0 || x == 5 && y == 1 || x == 5 && y == 7|| x == 5 && y == 8 ||
                           x == 6 && y == 0 || x == 6 && y == 1 || x ==6 && y == 7|| x == 6 && y == 8 ||
                           x == 7 && y == 0 || x == 7 && y == 1 || x == 7 && y == 7|| x == 7 && y == 8 ||
                           x == 8 && y == 0 || x == 8 && y == 1|| x == 8 && y == 2|| x == 8 && y ==6|| x == 8 && y == 7 || x == 8 && y == 8  ) {

                       }else{
                           color = 'elementYellow'
                           var newElement = new Diamante(this.game, y * this.ESPAIH, x * this.ESPAIV + 50, color);
                           this.elements.add(newElement);
                       }
                   }

                }
            }
        }
        create():void {
            super.create();

            this.game.physics.arcade.checkCollision.down = false;
            //Creo el color del background.
            game.stage.backgroundColor = "#000";
            this.configPaddle();
            this.configBall();
            this.configGrourpDiamants();

            //Contador vides
            this.videsContador = this.game.add.text(20,10," Vides : " +this.VIDES, { font: "25px Arial", fill: "#fff", align: "center"});
            //Contador de punts
            this.puntuacioContador = this.game.add.text(500,10," Puntuació : " +this.PUNTUACIO, { font: "25px Arial", fill: "#fff", align: "center"});


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
        private diamantCol(ball:Phaser.Sprite, diamante:Diamante) {
            diamante.kill();
            this.DIAMANTS = this.DIAMANTS-1;
            this.PUNTUACIO = this.PUNTUACIO+10;
            this.puntuacioContador.setText("Puntuació :"+this.PUNTUACIO)
           //Si els diamants es queden a 0 posi mes diamants
            if(this.DIAMANTS==0){
                this.ROUND=this.ROUND+1;
                if(this.ROUND!=1){
                    this.DIAMANTS==55;
                }
                this.configGrourpDiamants();
            }

        }
        update():void {
            super.update();
            //Perque el paddle funcioni amb el ratolí
            this.paddle.position.x = this.game.input.x;
            //Per quan objecte colisioni amb un altre objecte.
            game.physics.arcade.collide(this.ball, this.paddle);
            game.physics.arcade.collide(this.ball, this.elements, this.diamantCol, null, this) //diamantCol es la funció a la que crida quan coisiona amb algun objecte de classe diamant.
        }

    }

    export class SimpleGame {
        constructor() {
            game = new Phaser.Game(900, 900, Phaser.AUTO, 'gameDiv');

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
