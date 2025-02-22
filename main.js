import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy,GroundEnemy,ClimbingEnemy } from "./enemies .js";
import { UI } from "./UI.js";


window.addEventListener('load',function(){
    const canvas =document.getElementById('canvas');
     console.log(canvas);

    const ctx = canvas.getContext('2d');
    // canvas.width =500;
    // canvas.height =500;
    canvas.width =window.innerWidth;
    canvas.height =window.innerHeight;

    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.groundMargin =150;

            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.enemies=[];
            this.particles =[];
            this.collisions=[];

            this.enemyTimer =0;
            this.enemyInterval =1000;

            this.debug = false;

            this.score=0;
            this.fontColor ='white';
            this.UI = new UI(this);

            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.maxParticles = 100;

            this.time =0;
            this.maxTime = 20000;
            this.gameOver = false;
            this.lives =5;
            this.floatingMsg =[];
        }

        update(deltaTime){

            this.time+= deltaTime;
            if(this.time > this.maxTime) this.gameOver = true;


            this.background.update();
            this.player.update(this.input.keys,deltaTime);

            //handle enemy
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer =0;
            }
            else{
                this.enemyTimer+=deltaTime;
            }

            this.enemies.forEach(e=>{
                e.update(deltaTime);
            });

            this.enemies = this.enemies.filter(e => !e.isMarkedForDeletion);
            // console.log(this.enemies);

            //handle messges
            this.floatingMsg.forEach(m => {
                m.update(deltaTime);
            });

            //handle particles

            this.particles.forEach((p,i) =>{
                p.update();
                if(p.isMarkedForDeletion) this.particles.splice(i,1);
            });

            if(this.particles.length > this.maxParticles){
                // this.particles = this.particles.slice(0,this.maxParticles);
                this.particles.length = this.maxParticles;
            }

            //handle collisions sprites

            this.collisions.forEach((c,i)=>{
                c.update(deltaTime);
                if(c.isMarkedForDeletion) this.collisions.splice(i,1);
            });
        }
        
        draw(ctx){
            this.background.draw(ctx);
            this.player.draw(ctx);
            this.enemies.forEach(e=>{
                e.draw(ctx);
            });
            this.particles.forEach(e=>{
                e.draw(ctx);
            });
            this.collisions.forEach(e=>{
                e.draw(ctx);
            });
            this.floatingMsg.forEach(m => {
                m.draw(ctx);
            });

            this.UI.draw(ctx);
        }

        addEnemy(){
            if(this.speed > 0 && Math.random() > 0.5 ){
                this.enemies.push(new GroundEnemy(this));
            }
            else if(this.speed >0)
                this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }


        reset(){

                this.enemies = [];
                this.particles = [];
                this.collisions = [];
                this.score = 0;
                this.time = 0;
                this.lives = 5;
                this.speed = 0;
                this.player = new Player(this);
                this.gameOver = false; // Ensure the game restarts
                this.floatingMsg = [];
                this.player.currentState = this.player.states[0];
                this.player.currentState.enter();
                this.UI = new UI(this);
                lastTime = performance.now();
                requestAnimationFrame(animate);
 
        }


    }

    const game = new Game(canvas.width,canvas.height);
    // console.log(game);

    let lastTime =0;

    function animate(timeStamp){
        const deltaTime = timeStamp -lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);


        game.update(deltaTime);
        game.draw(ctx);

        if(!game.gameOver) requestAnimationFrame(animate);
    }

    animate(0);


});