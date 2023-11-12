import { app } from "../main.js";
import { calcularDistancia, randomMinMax } from "../utility/utility.js";

class Items{
    constructor(x,y,sx,sy,size,scale,img){
        
        //Trasnfrom
        this.x = x;
        this.y= y;
        this.sx =sx;
        this.sy = sy;
        this.size = size;
        this.scale =scale;

        //Caracteristica
        this.rango = 50;
        //image
        this.sprite = new Image();
        this.sprite.src = img;

        //bucle
        this.bucle = setInterval(()=>{this.update()},500);
    }

    action(){}

    update(){
        if(calcularDistancia(this.x,this.y,app.player.x,app.player.y) <= this.rango){
            this.action()
        }
        
    }

    render(){
        app.context.drawImage(this.sprite,this.sx,this.sy,this.size,this.size,this.x,this.y,this.scale,this.scale);
    }

    done(){
        clearInterval(this.bucle);
    }
}


class Vida extends Items{
    constructor(x,y){
        super(x,y,32,16,16,64,"../img/tilemap_packed.png");
        this.name = "Vida";
        this.isDone = false;
        this.give = Math.round(Math.random() + .3)
        this.sy = this.give > .7 ? 32:16;
    }

    action(){
        app.player.vida +=  app.player.vidabase*this.give;
        this.isDone =true;
        this.done()
    }
}


function vidaItem(x,y){
    return new Vida(x,y)
}


export { vidaItem}