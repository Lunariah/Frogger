import "./phaser.min.js"
import "./frog.js"

var WIDTH = 480;
var HEIGHT = 320;


let config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade'
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    }
};

// Déclaration de nos variables globales
var game = new Phaser.Game(config);
var player;
var f1Car;
var F1_CAR_SPEED;

//
function init() {
     F1_CAR_SPEED = 3;
}

function preload() {
    this.load.image('frog', './assets/images/Frog.png');
    this.load.image('f1', './assets/images/F1-1.png');
    this.load.image('background', './assets/images/FroggerBackground.png');
    this.load.image("mom", "./assets/images/momfrog.png");
}

function create() {
    this.add.sprite(240, 160, 'background');
    rand = new Phaser.Math.RandomDataGenerator();
    momX = rand.between(16,WIDTH);
    momX -= momX % 16;
    mom = this.add.sprite(momX, 8, "mom");
    player = new Frog(this, 100, 312);
    f1Car = this.add.sprite(500, 200, 'f1');
}

function update() {
    

    f1Car.x -= F1_CAR_SPEED;
    if(f1Car.x<-10) f1Car.x = 500;
    if(Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(),f1Car.getBounds())) this.scene.restart();
}

