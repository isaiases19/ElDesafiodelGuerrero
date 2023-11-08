import { Personaje } from "./Personaje.js";
import { espadaNormal,espadaFilosa } from "./Armas.js";
import { calcularDistancia, randomMinMax,calcularDistancia1D } from "../utility/utility.js";
import { app,update } from "../main.js";
import { drawText } from "./views/Text.js";

class Enemigo extends Personaje {
  constructor(nombre, tipo, vida, fuerza, velocidad,{x}) {
    super(nombre, tipo,vida, fuerza, velocidad);
    //carcteristicas
    this.vida = vida;
    this.tipo = tipo;
    this.nombre = nombre;
    this.fuerza = fuerza;
    this.velocidad = velocidad;
    this.rango = 150;
    this.enemys = [app.player];
    
    //Acciones
    this.path = randomMinMax(80,app.width*.7);
    
    //Habilidades
    this.ataques = [
      {name:"Ataque Basico",fuerza,audio:"/sounds/punch-estocada.mp3",animacion:"golpear"},
      {name:"Ataque Especial",fuerza:(fuerza * 2),audio:"/sounds/punch-corte-feroz.mp3",animacion:"espada1"},
      {name:"Ataque Definitivo",fuerza:(fuerza * 3),audio:"/sounds/punch-tajo-desgarrador.mp3",animacion:"espada2"},
    ]
  
    //Items
    this.inventario = [{name:"Espada Filosa",item:espadaFilosa()}];
    this.armas = this.inventario[0];
    
    //Transform -- posicion
    this.x = x || 750;
    this.y = 950;
    this.w = 500;
    this.h = 400;
    
    //Audio
    this.recibirAudio = "/sounds/recibirTroll.mp3";
    
    //Animacion
    this.animaciones = {
      parado:{sx:0,sy:328,sw:64,sh:64,step:64,len:1,scale:.66},
      golpear:{sx:0,sy:838,sw:64,sh:64,step:64,len:6,scale:.66 },
      resibe:{sx:0,sy:200,sw:64,sh:64,step:64,len:7,scale:.66 },
      espada2:{sx:0,sy:1542,sw:193,sh:193,step:193,len:6,scale:2 },
      espada1:{sx:0,sy:3077,sw:193,sh:193,step:193,len:6,scale:2 },
      morir:{sx:0,sy:1287,sw:64,sh:64,step:64,len:6,scale:.66 },
      muerto:{sx:323,sy:1290,sw:64,sh:64,step:64,len:1,scale:.66 },
      caminarR:{sx:0,sy:712,sw:64,sh:64,step:64,len:9,scale:.66 },
      caminarL:{sx:0,sy:583,sw:64,sh:64,step:64,len:9,scale:.66},
      paradoR:{sx:0,sy:712,sw:64,sh:64,step:64,len:1,scale:.66},
    }
    this.sprite.src = "/img/troll.png";
    this.animacionDefault = "parado";
    this.animacion = this.animaciones[this.animacionDefault];
  }



  acciones(){
    if(!this.muerto && (this.frame % 8) === 0  ){
      if(calcularDistancia(this.x,this.y,app.player.x,app.player.y) <= this.rango && !app.player.muerto){
        this.enemys = [app.player]
        //Elige un Ataque Random
        let ataque = this.ataques[randomMinMax(1,this.ataques.length) - 1];
        //Realiza el ataque
        this.realizarAtaque(ataque.name);
      }
  
      }
      if(!this.muerto && (this.frame % 1 ) === 0 && calcularDistancia(this.x,this.y,app.player.x,app.player.y) > this.rango  ){
           //Elige una posicion Random para caminar
           if(this.x >= this.path){
            this.x = this.x - this.velocidad;
           
            this.animacion = this.animaciones["caminarL"];
            this.animacionDefault = "parado";
          }else{
            this.x = this.x + this.velocidad;
            this.animacion = this.animaciones["caminarR"];
            this.animacionDefault = "paradoR";
          }
          //Si se termina coje otra
          if(calcularDistancia(this.x,this.y,this.path,this.y) <= this.rango ){
            this.path = randomMinMax(app.width*.2 ,app.width*.8)
          }
      }
  }
}

export { Enemigo };

