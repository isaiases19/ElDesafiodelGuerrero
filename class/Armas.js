class Espada{
    constructor(dano){
        this.startPower = dano
        this.dano = this.startPower;

        this.powerUps = [];
    }

    usar(powerUp = "none"){
        if(powerUp >0 && powerUp <= this.powerUps.length && powerUp != "none" ){
            return this.dano + this.powerUps[powerUp - 1];  
        }else{
            return this.dano;
        }
    }

}

class EspadaNormal extends Espada{
    constructor(){
        super(5)
    }
}




function espadaNormal(){
    return new EspadaNormal()
}

export {espadaNormal}