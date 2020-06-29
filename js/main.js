import "./phaser.min.js"
import Frog from "./frog.js"
import Car from "./car.js"

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
var mom;
var cars;
var F1_CAR_SPEED;


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
    var rand = new Phaser.Math.RandomDataGenerator();
    let momX = rand.between(16,WIDTH);
    momX -= momX % 16;
    mom = this.add.sprite(momX, 8, "mom");
    player = new Frog(this, 100, 312);

    cars = this.add.group();
    cars.runChildUpdate = true;
    for (var i = 0; i < 14 ; i++)
    {
        var newCar = new Car(this, Math.random()-0.5, ((i+3) * 16) + 8, Math.random() + F1_CAR_SPEED);
        cars.add(newCar);
    }
}

function update() {
    player.update();

    /*
    if(Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(),f1Car.getBounds())) 
        this.scene.restart();
    */
}

