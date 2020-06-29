export default class Car extends Phaser.GameObjects.Sprite
{
    speed;

    constructor (scene, direction, y, speed)
    {
        let rand = new Phaser.Math.RandomDataGenerator();
        let x = rand.between(0, scene.game.config.width);
        super(scene, x, y, "f1");

        this.originX = 0;
        this.x = x;
        this.originY = 0;
        this.y = y;

        if (direction < 0.0)
        {
            this.setAngle(180);
            this.speed = -speed;
        }
        else this.speed = speed;
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        console.log(this.y);
    }

    update()
    {
        this.x += this.speed;
        if(this.x < 0) 
            this.x = this.scene.game.config.width;
        else if (this.x > this.scene.game.config.width)
            this.x = 0;
    }
}