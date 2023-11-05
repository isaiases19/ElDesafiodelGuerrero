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
      this.ataqueBasico,
      this.ataqueEspecial,
      this.ataqueDefinitivo
    ]
  }

  ataqueBasico(me,enemigo) {
    enemigo.recibirAtaque(me.fuerza);
    me.playSound("/sounds/punch-estocada.mp3")
    return `${me.nombre.toUpperCase()} realiza un ataque básico a \n ${enemigo.nombre.toUpperCase()} con una fuerza de ${me.fuerza}!`;
  }

  ataqueEspecial(me,enemigo) {
    const danioEspecial = me.fuerza * 2;
    me.playSound("/sounds/punch-corte-feroz.mp3")
    enemigo.recibirAtaque(danioEspecial);
    return `${me.nombre.toUpperCase()} realiza un ataque especial a \n${enemigo.nombre.toUpperCase()} con una fuerza aumentada de ${danioEspecial}!`;
  }

  ataqueDefinitivo(me,enemigo) {
    
    const danioDefinitivo = me.fuerza * 3;
    enemigo.recibirAtaque(danioDefinitivo);
    me.playSound("/sounds/punch-tajo-desgarrador.mp3")
    return `${me.nombre.toUpperCase()} realiza un ataque definitivo a \n${enemigo.nombre.toUpperCase()} con una fuerza poderosa de ${danioDefinitivo}!`;
  }


}



export { Guerrero };