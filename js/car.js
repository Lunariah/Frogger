export default class Car extends Phaser.GameObjects.Sprite
{
    speed; // Movement speed (pixels)

    constructor (scene, direction, y, speed)
    {
        let x = scene.rand.between(0, scene.game.config.width);
        super(scene, x, y, "f1");

        if (direction < 0.0)
        {
            this.setAngle(180); // Rotates sprite
            this.speed = -speed;
        }
        else this.speed = speed;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update()
    {
        this.x += this.speed;

        // Loop trough screen
        if(this.x < 0) 
            this.x = this.scene.game.config.width;
        else if (this.x > this.scene.game.config.width)
            this.x = 0;
    }
}