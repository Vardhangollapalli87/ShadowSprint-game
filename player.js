import { Sitting ,Running,Jumping,Falling,Rolling,Diving,Hit
} from "./playerStates.js";

import { CollionAnimation } from "./collision.js";
import { FloatingMsg } from "./floatingMsg.js";

export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y =this.game.height-this.height - this.game.groundMargin;
        // this.y = 0;

        this.image = document.getElementById('player');

        this.frameX = 0;
        this.frameY = 0;

        this.speed =0;
        this.maxSpeed =1;
        this.vy =0;

        this.gravity = 0.5;

        this.states =[new Sitting(this.game),new Running(this.game),new Jumping(this.game),
            new Falling(this.game),new Rolling(this.game),new Diving(this.game),new Hit(this.game),
        ];
        

        this.maxFrame =3;

        this.fps =20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer =0;

    }

    onGround(){
        return this.y >= this.game.height-this.height-this.game.groundMargin;
    }

    update(input,deltaTime){

        this.checkCollision();
        //passing for checcking the input
        this.currentState.handleInput(input);

        this.x +=this.speed;

        if(input.includes('ArrowRight') && this.currentState !== this.states[6]) this.speed =this.maxSpeed+1;
        else if(input.includes('ArrowLeft') && this.currentState !== this.states[6]) this.speed = -this.maxSpeed-1;
        else this.speed =0;

        //horizontal bounds
        if(this.x < 0) this.x =0;
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;


        //vertical mmovement
        // if(input.includes('ArrowUp') && this.onGround()) this.vy -=20;
        
        this.y += this.vy;

        if(!this.onGround()){
            this.vy +=this.gravity;
        }
        else this.vy =0;

        //vertical bounds
        if(this.y > this.game.height - this.height - this.game.groundMargin)
            this.y = this.game.height - this.height - this.game.groundMargin;
        //sprite animation

        if(this.frameTimer > this.frameInterval){
            this.frameTimer =0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX =0;
        }
        else{
            this.frameTimer += deltaTime;
            // console.log(deltaTime);
        }
        



    }

    draw(context){
        if(this.game.debug){
            context.strokeStyle='black';
            context.strokeRect(this.x,this.y,this.width,this.height);

        }
        context.drawImage(
            this.image,
            this.frameX * this.width, this.frameY * this.height, // Crop the correct frame
            this.width, this.height,
            this.x, this.y,
            this.width*1.2, this.height*1.2
        );
    }

    setState(state,speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed*speed;
        this.currentState.enter();
    }


    checkCollision(){
        this.game.enemies.forEach(e =>{
            if(
                e.x < this.x+this.width &&
                e.x + e.width > this.x &&
                e.y < this.y + this.height &&
                e.y + e.height > this.y

            ){
                e.isMarkedForDeletion = true;

                
                if(this.currentState == this.states[4] || this.currentState === this.states[5]){
                    this.game.collisions.push(new CollionAnimation(this.game,e.x+e.width *0.5,e.y+e.height*0.5));

                    this.game.score++;
                    this.game.floatingMsg.push(new FloatingMsg('+1',e.x,e.y,165,50));
                    // console.log(this.game.floatingMsg);
                }
                else{
                    this.setState(6,0);
                    this.game.lives--;
                    if(this.game.lives <=0) this.game.gameOver = true;
                }
            }
        });
    }
}