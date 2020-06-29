import "./phaser.min.js"

export default class Frog extends Phaser.GameObject.Sprite
{
    JUMP_DIST = 16;
    JUMP_SPEED = 500;

    move_OK;
    movement_timer;
    cursors; 

    constructor(scene, x, y)
    {
        super(scene, x, y, "frog");
        move_OK = true;
    }
    
    Update()
    {
        if (move_OK) 
        {
            cursors = this.scene.input.keyboard.createCursorKeys();
            if((cursors.right.isDown)&&(this.x < (WIDTH - FROG_JUMP/2)))
                Move("right");
            if((cursors.left.isDown)&&(this.x > (0 + FROG_JUMP/2)))
                Move("left");
            if((cursors.up.isDown)&&(this.y > (0 + FROG_JUMP/2)))
                Move("up");
            if((cursors.down.isDown)&&(this.y < (HEIGHT - FROG_JUMP/2)))
                Move("down");        
        }
    }

    Move(direction)
    {
        switch (direction) 
        {
            case "up":
                this.setAngle(0);
                this.y -= FROG_JUMP;
                break;
            case "down":
                this.setAngle(180);
                this.y += FROG_JUMP;
                break;
            case "left":
                this.setAngle(-90);
                this.x -= FROG_JUMP;
                break;
            case "right":
                this.setAngle(90);
                this.x += FROG_JUMP;
                break;
            default:
                return;
        }
        move_OK = false;
        this.movement_timer = this.scene.time.addEvent({
            delay: JUMP_SPEED,
            callback: function (){ move_OK = true },
            callbackScope: this,
            repeat: 0
        })
    }
}