

export class UI{
    constructor(game){
        this.game= game;
        this.fontSize = 50;
        this.fontFamily ='Creepster';
        this.gameLives = document.getElementById('lives');
    }

    draw(ctx){


        ctx.save();
        ctx.shadowOffsetX =5;
        ctx.shadowOffsety =5;
        ctx.shadowColor ='black';
        ctx.shadowBlur =0;

        ctx.font =`${this.fontSize}px ${this.fontFamily}`
        // ctx.textAlign ='left';
        ctx.fillStyle = this.game.fontColor;

        //score
        ctx.fillText('Score:  '+this.game.score,20,50);

        //timer
        ctx.font = this.fontSize * 0.8 +'px '+this.fontFamily;
        ctx.fillText("Time: "+(this.game.time*0.001).toFixed(1)+' s',20,100);


        //lives
        for(let i=0;i<this.game.lives;i++){
            ctx.drawImage(this.gameLives,34*i+20,120,25,25);

        }
        //gameOver

        if(this.game.gameOver){
            ctx.textAlign ='center';
            ctx.font = this.fontSize*2+'px '+this.fontFamily;

            if(this.game.score >= 10){
                
                ctx.fillText('Boo-YAH',this.game.width*0.5,this.game.height*0.5-20);
                ctx.font = this.fontSize*0.7 +'px '+this.fontFamily;
                ctx.fillText('What are creatures of the night afraid of? YOU!!!',this.game.width*0.5,this.game.height*0.5+20);
            }
            else{
                ctx.fillText('Love at first bite?',this.game.width*0.5,this.game.height*0.5-20);
                ctx.font = this.fontSize*0.7 +'px '+this.fontFamily;
                ctx.fillText('Nope. Better luck next time!',this.game.width*0.5,this.game.height*0.5+20);
            }
            ctx.font = this.fontSize*0.5 +'px '+'Helvatica';
            ctx.fontStyle='black';
            ctx.fillText(' To RESART!  PRESS -B KEY',this.game.width*0.5,this.game.height*0.5+50)
        }
        ctx.restore();
    }
}

