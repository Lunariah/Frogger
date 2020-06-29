export default class Frog extends Phaser.GameObjects.Sprite
{
    JUMP_DIST = 16; // Length of every jump (in pixels)
    JUMP_DELAY = 200; // Minimal delay between jumps (in milliseconds)

    move_OK; // If we’re allowed to move again
    keyboard; // Keyboard input

    constructor(scene, x, y)
    {
        super(scene, x, y, "frog");
        this.move_OK = true;
        this.keyboard = scene.input.keyboard.createCursorKeys();

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
    
    update()
    {
        if (this.move_OK) 
        {
            if((this.keyboard.right.isDown) && (this.x < (this.scene.game.config.width - this.JUMP_DIST/2)))
                this.Move("right");
            if((this.keyboard.left.isDown) && (this.x > (0 + this.JUMP_DIST/2)))
                this.Move("left");
            if((this.keyboard.up.isDown) && (this.y > (0 + this.JUMP_DIST/2)))
                this.Move("up");
            if((this.keyboard.down.isDown) && (this.y < (this.scene.game.config.height - this.JUMP_DIST/2)))
                this.Move("down");        
        }
    }

    Move(direction)
    {
        switch (direction) 
        {
            case "up":
                this.setAngle(0);
                this.y -= this.JUMP_DIST;
                break;
            case "down":
                this.setAngle(180);
                this.y += this.JUMP_DIST;
                break;
            case "left":
                this.setAngle(-90);
                this.x -= this.JUMP_DIST;
                break;
            case "right":
                this.setAngle(90);
                this.x += this.JUMP_DIST;
                break;
            default:
                return;
        }
        this.move_OK = false;
        this.scene.time.addEvent({
            delay: this.JUMP_DELAY,
            callback: function (){ this.move_OK = true },
            callbackScope: this
        })
    }
}