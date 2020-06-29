import "./phaser.min.js"
import Frog from "./frog.js"
import Car from "./car.js"

let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 320,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

new Phaser.Game(config);

var player;
var mom;
var cars;

function preload() 
{
    this.load.image('frog', './assets/images/Frog.png');
    this.load.image('f1', './assets/images/F1-1.png');
    this.load.image('background', './assets/images/FroggerBackground.png');
    this.load.image("mom", "./assets/images/momfrog.png");
}

function create() 
{
    // RNG seed
    this.rand = new Phaser.Math.RandomDataGenerator();
    
    // Background
    this.add.sprite(240, 160, 'background');

    // Goal (frog mom)
    var rand = new Phaser.Math.RandomDataGenerator();
    let momX = rand.between(0, this.game.config.width - 16);
    momX -= momX % 16;
    momX += 8;
    mom = this.physics.add.sprite(momX, 8, "mom");

    // Player
    player = new Frog(this, 232, 296);

    // Cars
    cars = this.add.group();
    cars.runChildUpdate = true; // Will run Car.update() for every member automatically
    for (var i = 0; i < 14 ; i++)
    {
        let y_pos = ((i+3) * 16) + 8;
        let direction = Math.random()-0.5;
        let speed = Math.random() + 3;
        let newCar = new Car(this, direction, y_pos, speed);
        cars.add(newCar);
    }

    // Collisions
    this.physics.add.collider(player, cars, collision_frog_car, null, this);
    this.physics.add.collider(player, mom, collision_frog_goal, null, this);
}

function update() 
{
    player.update();
}

function collision_frog_car()
{
    this.scene.restart();
}

function collision_frog_goal()
{
    this.scene.restart();
}