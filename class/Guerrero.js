import { Personaje } from "./Personaje.js";
import { espadaNormal,espadaFilosa } from "./Armas.js";
import { getcontroller } from "./controller/controller.js";

class Guerrero extends Personaje {

  constructor(nombre, tipo, vida, fuerza, velocidad) {
    super(nombre, tipo, vida, fuerza, velocidad);
    this.vida = vida;
    this.fuerza = fuerza;
    this.velocidad = velocidad;

    this.armas = {name:"Espada Normal",item:espadaNormal()};
    this.controller = getcontroller();
    this.inventario = [
      {name:"Espada Normal",item:espadaNormal()},
      {name:"Espada Filosa",item:espadaFilosa()}
    ]

    this.ataques = [
      {name:"Ataque Basico",fuerza,audio:"/sounds/punch-estocada.mp3"},
      {name:"Ataque Especial",fuerza:(fuerza * 2),audio:"/sounds/punch-corte-feroz.mp3"},
      {name:"Ataque Definitivo",fuerza:(fuerza * 3),audio:"/sounds/punch-tajo-desgarrador.mp3"},
    ]

  }
  
  use(app,enemigo){
    this.controller.use(app,this,enemigo)  
  }

}



export { Guerrero };