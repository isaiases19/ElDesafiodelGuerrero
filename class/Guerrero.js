import { Personaje } from "./Personaje.js";
import { espadaNormal,espadaFilosa } from "./Armas.js";
import { getcontroller } from "./controller/controller.js";
import { app } from "../main.js";
class Guerrero extends Personaje {

  constructor(nombre, tipo, vida, fuerza, velocidad,nivel) {
    super(nombre, tipo, vida, fuerza, velocidad,nivel);
    //carcteristicas
    this.vida = vida;
    this.tipo = tipo;
    this.nombre = nombre;
    this.fuerza = fuerza;
    this.velocidad = velocidad;
    this.nivel=nivel;

    this.rango = 150;
    this.enemys = app.enemigos;
    this.sprite.src = "/img/Base.png";
    
    //Habilidades 
    this.ataques = [
      {name:"Ataque Basico",fuerza,audio:"/sounds/punch-estocada.mp3",animacionR:"espada1R",animacionL:"espada1L"},
      {name:"Ataque Especial",fuerza:(fuerza * 2),audio:"/sounds/punch-corte-feroz.mp3",animacionR:"espada2R",animacionL:"espada2L"},
     
    ]

    //Items
    this.inventario = [
      {id:0,name:"Espada Normal",item:espadaNormal()},
      {id:1,name:"Espada Filosa",item:espadaFilosa()}
    ]
    this.armas = {id:0,name:"Espada Normal",item:espadaNormal()};
    
    //Transfrom
    this.x = 330;
    this.y = 830;
    this.w = 500;
    this.h = 400;
    
    //Audios
     //Audio
     this.recibirAudio = "/sounds/recibirPlayer.mp3";

    //Animacion
    this.animaciones = {
      parado:{sx:0,sy:455,sw:64,sh:64,step:64,len:1,scale:.66},
      golpear:{sx:0,sy:970,sw:64,sh:64,step:64,len:6,scale:.66 },
      recibirR:{sx:0,sy:200,sw:64,sh:64,step:64,len:7,scale:.66 },
      recibirL:{sx:0,sy:72,sw:64,sh:64,step:64,len:7,scale:.66 },
      espada2R:{sx:0,sy:968,sw:64,sh:64,step:64,len:6,scale:.66 },
      espada1R:{sx:0,sy:457,sw:64,sh:64,step:64,len:8,scale:.66 },
      tajo:{sx:0,sy:1223,sw:64,sh:64,step:64,len:13,scale:.66 },
      morir:{sx:0,sy:1287,sw:64,sh:64,step:64,len:10,scale:.66 },
      muerto:{sx:323,sy:1290,sw:64,sh:64,step:64,len:1,scale:.66},
      caminarR:{sx:0,sy:712,sw:64,sh:64,step:64,len:9,scale:.66 },
      caminarL:{sx:0,sy:583,sw:64,sh:64,step:64,len:9,scale:.66},
      paradoL:{sx:513,sy:584,sw:64,sh:64,step:64,len:1,scale:.66},
      espada1L:{sx:0,sy:328,sw:64,sh:64,step:64,len:8,scale:.66 },
      espada2L:{sx:0,sy:840,sw:64,sh:64,step:64,len:6,scale:.66 },
    }
    this.animacionDefault = "parado";
    this.animacion = this.animaciones[this.animacionDefault];

    //Controller
    this.controller = getcontroller();
  }
  
  use(){
    this.controller.use()  
  }

}

export { Guerrero };