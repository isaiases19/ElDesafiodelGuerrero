import { Personaje } from "./personaje";

var fuerzaGuerrero=15;
var velocidadGuerrero=5;
var vidaGuerrero=100;
class Guerrero extends Personaje{

    constructor(nombre,vida,fuerza,velocidad) {
        super(nombre);
        this.vida=vidaGuerrero;
        this.fuerza=fuerzaGuerrero;
        this.velocidad=velocidadGuerrero;
      }
  }
  
  export {Enemigo};