import { Personaje } from "./personaje.js";

var fuerzaGuerrero = 3;
var velocidadGuerrero = 5;
var vidaGuerrero = 100;
class Guerrero extends Personaje {

  constructor(nombre, tipo, vida, fuerza, velocidad) {
    super(nombre, tipo, vida, fuerza, velocidad);
    this.vida = vidaGuerrero;
    this.fuerza = fuerzaGuerrero;
    this.velocidad = velocidadGuerrero;

    this.ataques = [
      {name:"Ataque Basico",fuerza,audio:"/sounds/punch-estocada.mp3"},
      {name:"Ataque Especial",fuerza:(fuerza * 2),audio:"/sounds/punch-corte-feroz.mp3"},
      {name:"Ataque Definitivo",fuerza:(fuerza * 3),audio:"/sounds/punch-tajo-desgarrador.mp3"},
    ]
  }

}



export { Guerrero };