
class Enemy{
    constructor(){
        this.frameX =0;
        this.frameY =0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer =0;
        this.isMarkedForDeletion = false;
    }

    update(deltaTime){
        //movement 
        this.x -=this.speedX + this.game.speed;
        this.y +=this.speedY;

        if(this.frameTimer > this.frameInterval){
            this.frameTimer =0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX =0;
        }else this.frameTimer+=deltaTime;

        if(this.x <0-this.width) this.isMarkedForDeletion=true;
    }

    draw(ctx){
        if(this.game.debug){
            ctx.strokeStyle='black';
            ctx.strokeRect(this.x,this.y,this.width,this.height);

        }
        ctx.drawImage(this.image,this.frameX * this.width ,0,this.width,this.height,this.x,this.y,this.width,this.height);
    }
}


export class FlyingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width =60;
        this.height =44;
        this.x =this.game.width*0.8;
        this.y =Math.random()*this.game.height * 0.5;
        this.speedX = Math.random()*2 + 2;
        this.speedY=0;
        this.maxFrame = 5;
        this.image = document.getElementById('enemy_fly');

        this.angle =0;
        this.va = Math.random()*0.1+0.1;
    }

    update(deltaTime){
        super.update(deltaTime);
        this.angle +=this.va;
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy{

        constructor(game){
            super();
            this.game = game;
            this.width = 60;
            this.height = 87;
            // this.x =0;
            // this.y =100;
            this.x = this.game.width;
            this.y = this.game.height -this.height - this.game.groundMargin;
            this.image = document.getElementById('enemy_plant');

            this.speedX=0;
            this.speedY = 0;
            this.maxFrame =1;
            // console.log(this.image);

        }
}

export class ClimbingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.y =Math.random()*(this.game.height*0.5);
        this.x = Math.random()*(this.game.width*0.5)+this.game.width;
        // this.x = this.game.width;
        this.image = document.getElementById('enemy_spider');
        
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ?1:-1;
        this.maxFrame =0;

    }

    update(deltaTime){
        super.update(deltaTime);

        if(this.y > this.game.height - this.height-this.game.groundMargin) this.speedY*=-1;
        if(this.y < -this.height) this.isMarkedForDeletion = true;
    }

    draw(ctx){
        super.draw(ctx);

        ctx.beginPath();
        ctx.moveTo(this.x+this.width/2,0);
        ctx.lineTo(this.x+this.width/2,this.y+this.height/2);
        ctx.stroke();
    }
}