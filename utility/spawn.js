import { app } from "../main.js";
import { Enemigo } from "../class/Enemigo.js";
import { calcularFuerzaPorNivel,calcularVelocidadPorNivel,calcularVidaPorNivel, delay, randomMinMax } from "./utility.js";
class Spawn{
    constructor(x,time,range,level,label,oleada){
        this.x = x;
        this.range = range;
        this.level = level;
        this.time = time;
        this.oleada = oleada;
        this.timer = setInterval(()=>{this.spawn()},this.time * 1000);
        this.label = label;
        this.cout = 0;
    }

    async spawn(){
        this.cout++;
        for(let i =0; i < this.oleada;i++){
            await delay(1000);
            app.enemigos.push(new Enemigo(this.label,"enemy",calcularVidaPorNivel(this.level),calcularFuerzaPorNivel(this.level),calcularVelocidadPorNivel(this.level),this.level,{x: this.x +  randomMinMax(-this.range,this.range)}));
        }
        this.oleada = randomMinMax(1,3);
    }

    stop(){
        clearInterval(this.timer);
    }
}

function getSpawn(x,time,range,level,label,oleada){
    return new Spawn(x,time,range,level,label,oleada);
}

export {getSpawn}