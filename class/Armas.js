class Espada{
    constructor(dano){
        this.dano = dano;
        this.powerUps = [];
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
        this.powerUps = [{name:"filo",power:5}];
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

function espadaFilosa(){
    return new EspadaFilosa();
}

export {espadaNormal,espadaFilosa}