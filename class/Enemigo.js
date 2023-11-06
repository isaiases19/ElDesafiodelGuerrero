import { espadaNormal,espadaFilosa } from "./Armas.js";
import { Personaje } from "./Personaje.js";

class Enemigo extends Personaje {
  constructor(nombre, tipo, vida, fuerza, velocidad) {
    super(nombre, vida, tipo, fuerza, velocidad);
    this.armas = {name:"Espada Filosa",item:espadaFilosa()};
    this.inventario = [{name:"Espada Filosa",item:espadaFilosa()}];

    this.sprite.src = "/img/troll.png";

    this.animaciones = {
      parado:{sx:0,sy:328,sw:64,sh:64,step:64,len:1,scale:.66},
      golpear:{sx:0,sy:838,sw:64,sh:64,step:64,len:6,scale:.66 },
      resibe:{sx:0,sy:200,sw:64,sh:64,step:64,len:7,scale:.66 },
      espada2:{sx:0,sy:1542,sw:193,sh:193,step:193,len:6,scale:2 },
      espada1:{sx:0,sy:3077,sw:193,sh:193,step:193,len:6,scale:2 },
      morir:{sx:0,sy:1287,sw:64,sh:64,step:64,len:6,scale:.66 },
      muerto:{sx:323,sy:1290,sw:64,sh:64,step:64,len:1,scale:.66 },
  }
  this.animacion = this.animaciones["parado"];
    this.x = 750;
    this.y = 900;
    this.ataques = [
      {name:"Ataque Basico",fuerza,audio:"/sounds/punch-estocada.mp3",animacion:"golpear"},
      {name:"Ataque Especial",fuerza:(fuerza * 2),audio:"/sounds/punch-corte-feroz.mp3",animacion:"espada1"},
      {name:"Ataque Definitivo",fuerza:(fuerza * 3),audio:"/sounds/punch-tajo-desgarrador.mp3",animacion:"espada2"},
    ]
  }
}

export { Enemigo };

