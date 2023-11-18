import { animacionArma1, baseLongSword } from "./animaciones/guerreroAnm.js";

class Espada{
    constructor(dano){
        this.dano = dano;
        this.powerUps = [];
        this.icon = new Image();
        this.icon.src = "/img/tilemap_packed.png";
        this.sprite="";
        this.animacion = animacionArma1;

    }

    usar(powerUp = "none"){
        if(powerUp >0 && powerUp <= this.powerUps.length && powerUp != "none" ){
            const power =  this.powerUps.find((p)=> p.name == powerUp);
            return this.dano + power.power;  
        }else{
            return this.dano;
        }
    }

}

class EspadaFilosa extends Espada{
    constructor(){
        super(5)
        this.sprite="/img/baseLongSword.png";
        this.animacion = baseLongSword;
        this.powerUps = [{name:"filo",power:5,enUso:true,icon:{sx:48,sy:0}},{name:"sinfilo",power:0,enUso:false,icon:{sx:64,sy:0}}];
    }
}

class EspadaNormal extends Espada{
    constructor(){
        super(5)
        this.sprite="/img/Base.png";
        this.powerUps = [{name:"sinFilo",power:0,enUso:true,icon:{sx:96,sy:0}}]
    }
}

function espadaNormal(){
    return new EspadaNormal()
}

function espadaFilosa(){
    return new EspadaFilosa();
}

export {espadaNormal,espadaFilosa}