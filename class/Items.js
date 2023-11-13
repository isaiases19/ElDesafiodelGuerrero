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
        this.give = randomMinMax(3,10)/10;
        this.sy = this.give < .5 ? 32:16;
        this.sound = new Audio("../sounds/getVida.mp3");
    }

    action(){
        //calcula el total
        const totalGive = app.player.vida + (app.player.vidabase*this.give);
        ///Si se pasa de la vidaBase restale la diferencia 
        app.player.vida =  totalGive <= app.player.vidabase ? totalGive: (totalGive - parseInt(-(app.player.vidabase -  totalGive)));
        this.sound.play();
        //avisa de que no se deve renderizar mas
        this.isDone =true;
        //termana el siclo de vida de item
        this.done()
    }
}


function vidaItem(x,y){
    return new Vida(x,y)
}


export { vidaItem}