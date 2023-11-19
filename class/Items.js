import { app } from "../main.js";
import { calcularDistancia, randomMinMax } from "../utility/utility.js";
import { espadaFilosa } from "./Armas.js";
import { Posion } from "./posion.js";

class Items{
    constructor(x,y,sx,sy,size,scale,img){
        
        //Trasnfrom
        this.x = x;
        this.y= y;
        this.sx =sx;
        this.sy = sy;
        this.size = size;
        this.scale =scale;
        this.isDone = false;
        //Caracteristica
        this.rango = 50;
        this.color = "green";
        //image
        this.sprite = new Image();
        this.sprite.src = img;

        //coutn down
        this.cout = 0;
        this.timer = (5 * 1000);
        //bucle
        this.bucle = setInterval(()=>{this.update()},340);

    }

    action(){}

    update(){
        this.cout += 340;
        if(calcularDistancia(this.x,this.y,app.player.x,app.player.y) <= this.rango){
            this.action()
        }

        if(this.cout > this.timer){
             //avisa de que no se deve renderizar mas
            this.isDone =true;
            //termana el siclo de vida de item
            this.done()
        }
        
    }

    render(){
        app.context.save();
        app.context.filter = `drop-shadow(0 0 15px ${this.color})`
        app.context.drawImage(this.sprite,this.sx,this.sy,this.size,this.size,this.x,this.y,this.scale,this.scale);
        app.context.restore()
    }

    done(){
        clearInterval(this.bucle);
    }
}


class Vida extends Items{
    constructor(x,y){
        super(x,y,32,16,16,64,"../img/itemsSprite/tilemap_packed.png");
        this.name = "Vida";
        this.isDone = false;
        this.give = randomMinMax(3,10)/10;
        this.sy = this.give < .5 ? 32:16;
        this.sx = 32;
        this.sound = new Audio("../sounds/getVida.mp3");
        this.color = "#d63737";
    }

    action(){
        console.log(app.player.posiones.length);
        const accion = app.player.posiones.length < 2 ? app.player.posiones.push(new Posion(this.give,this.sx,this.sy)):null;

        if(accion !== null){
            this.sound.play();
            //avisa de que no se deve renderizar mas
            this.isDone =true;
            //termana el siclo de vida de item
            this.done()
        }
    }
}

class EspadaItem extends Items{
    constructor(x,y){
        super(x,y,48,0,16,64,"../img/itemsSprite/tilemap_packed.png");
        this.sound = new Audio("../sounds/getVida.mp3");
        this.color = "#00b7ff";
    }

    action(){
        const espada = {id:app.player.inventario.length,name:"Espada Filosa",item:espadaFilosa()};
        
        const haved = app.player.inventario.filter(items=> items.name === espada.name);
        if(haved.length === 0){   
          const accion = app.player.inventario.length < app.player.inventarioLen ? app.player.inventario.push(espada):null;
        
            if(accion !== null){
                this.sound.play();
                //avisa de que no se deve renderizar mas
                this.isDone =true;
                //termana el siclo de vida de item
                this.done()
            }
        }
    }
}


function vidaItem(x,y){
    return new Vida(x,y)
}

function espadaItem(x,y){
    return new EspadaItem(x,y);
}

export { vidaItem, espadaItem}