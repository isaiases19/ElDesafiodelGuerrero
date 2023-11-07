import { Personaje } from "./Personaje.js";
import { espadaNormal,espadaFilosa } from "./Armas.js";
import { getcontroller } from "./controller/controller.js";

class Guerrero extends Personaje {

  constructor(nombre, tipo, vida, fuerza, velocidad) {
    super(nombre, tipo, vida, fuerza, velocidad);
    this.vida = vida;
    this.fuerza = fuerza;
    this.velocidad = velocidad;
    this.sprite.src = "/img/Base.png";
    
    this.x = 330;
    this.y = 900;

    this.animaciones = {
      parado:{sx:0,sy:455,sw:64,sh:64,step:64,len:1,scale:.66},
      golpear:{sx:0,sy:970,sw:64,sh:64,step:64,len:6,scale:.66 },
      resibe:{sx:0,sy:200,sw:64,sh:64,step:64,len:7,scale:.66 },
      espada2:{sx:0,sy:968,sw:64,sh:64,step:64,len:6,scale:.66 },
      espada1:{sx:0,sy:457,sw:64,sh:64,step:64,len:8,scale:.66 },
      tajo:{sx:0,sy:1223,sw:64,sh:64,step:64,len:13,scale:.66 },
      morir:{sx:0,sy:1287,sw:64,sh:64,step:64,len:10,scale:.66 },
      muerto:{sx:323,sy:1290,sw:64,sh:64,step:64,len:1,scale:.66 },
      caminarR:{sx:0,sy:712,sw:64,sh:64,step:64,len:9,scale:.66 }
      
    }
    this.animacion = this.animaciones["parado"];

    this.armas = {name:"Espada Normal",item:espadaNormal()};
    this.controller = getcontroller();
    this.inventario = [
      {name:"Espada Normal",item:espadaNormal()},
      {name:"Espada Filosa",item:espadaFilosa()}
    ]

    this.ataques = [
      {name:"Ataque Basico",fuerza,audio:"/sounds/punch-estocada.mp3",animacion:"espada1"},
      {name:"Ataque Especial",fuerza:(fuerza * 2),audio:"/sounds/punch-corte-feroz.mp3",animacion:"espada2"},
     
    ]

  }
  
  use(app,enemigo){
    this.controller.use(app,this,enemigo)  
  }

}



export { Guerrero };