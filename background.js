

class Layer{
    constructor(game,width,height,speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x =0;
        this.y =0;
    }

    update(){
        if(this.x < -this.width) this.x =0;
        else this.x -= this.speedModifier*this.game.speed;
    }

    draw(context){
        context.drawImage(this.image,this.x,this.y,this.width,this.height);
        context.drawImage(this.image,this.x + this.width,this.y,this.width,this.height);
    }
}

export class Background{
    constructor(game){
        this.game = game;
        this.width =this.game.width;
        this.height =this.game.height;
        
        this.layer5image = document.getElementById('layer5');
        this.layer4image = document.getElementById('layer4');
        this.layer3image = document.getElementById('layer3');
        this.layer2image = document.getElementById('layer2');
        this.layer1image = document.getElementById('layer1');

        this.layer1 = new Layer(this.game,this.width,this.height,0,this.layer1image);
        this.layer2 = new Layer(this.game,this.width,this.height,0.2,this.layer2image);
        this.layer3 = new Layer(this.game,this.width,this.height,0.4,this.layer3image);
        this.layer4 = new Layer(this.game,this.width,this.height,0.8,this.layer4image);
        this.layer5 = new Layer(this.game,this.width,this.height,1,this.layer5image);

        this.backgroundLayers =[this.layer1,this.layer2,this.layer3,this.layer4,this.layer5];


    }

    update(){
        this.backgroundLayers.forEach(l=>{
            l.update();
        });
    }

    draw(context){
        this.backgroundLayers.forEach(l=>{
            l.draw(context);
        });
    }
}