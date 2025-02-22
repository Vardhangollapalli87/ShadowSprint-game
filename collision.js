
 export class CollionAnimation
{
    constructor(game,x,y){
        this.game = game;
        this.image = document.getElementById('boom');
        this.audio = new Audio();
        this.audio.src = 'assets/Ice attack 2.wav';

        this.spriteWidth =100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random()+0.5;

        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight* this.sizeModifier;

        this.x = x-this.width * 0.5;
        this.y = y - this.height * 0.5;

        this.frameX =0;
        this.maxFrame =4;
        this.isMarkedForDeletion = false;

        this.fps= Math.random()*10 +5;
        this.frameInterval =1000/this.fps;
        this.frameTimer =0;
    }

    update(deltaTime){
        this.x -=this.game.speed;

        if(this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer =0;
        }
        else{
            this.frameTimer += deltaTime;
        }

        if(this.frameX > this.maxFrame){
        
            this.isMarkedForDeletion = true;
        }
        this.audio.play();
            
    }

    draw(ctx){
        ctx.drawImage(this.image,this.frameX* this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}
