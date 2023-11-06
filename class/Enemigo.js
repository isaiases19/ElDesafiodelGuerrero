import { espadaNormal,espadaFilosa } from "./Armas.js";
import { Personaje } from "./Personaje.js";

class Enemigo extends Personaje {
  constructor(nombre, tipo, vida, fuerza, velocidad) {
    super(nombre, vida, tipo, fuerza, velocidad);
    this.armas = {name:"Espada Filosa",item:espadaFilosa()};
    this.ataques = [
      {name:"Ataque Basico",fuerza,audio:"/sounds/punch-estocada.mp3"},
      {name:"Ataque Especial",fuerza:(fuerza * 2),audio:"/sounds/punch-corte-feroz.mp3"},
      {name:"Ataque Definitivo",fuerza:(fuerza * 3),audio:"/sounds/punch-tajo-desgarrador.mp3"},
    ]
  }
}

export { Enemigo };

