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
  }

  ataqueBasico(enemigo) {
    this.playSound("/sounds/punch-estocada.mp3")
  
    enemigo.recibirAtaque(this.fuerza);
    return `${this.nombre} realiza un ataque básico a ${enemigo.nombre} con una fuerza de ${this.fuerza}!`;
  }

  ataqueEspecial(enemigo) {
    this.playSound("/sounds/punch-corte-feroz.mp3")
    const danioEspecial = this.fuerza * 2;
    enemigo.recibirAtaque(danioEspecial);
    return `${this.nombre} realiza un ataque especial a ${enemigo.nombre} con una fuerza aumentada de ${danioEspecial}!`;
  }

  ataqueDefinitivo(enemigo) {
    this.playSound("/sounds/punch-tajo-desgarrador.mp3")

    const danioDefinitivo = this.fuerza * 3;
    enemigo.recibirAtaque(danioDefinitivo);
    return `${this.nombre} realiza un ataque definitivo a ${enemigo.nombre} con una fuerza poderosa de ${danioDefinitivo}!`;
  }

  realizarAtaque(opcion, enemigo) {
    switch (opcion) {
      case 1:
        return this.ataqueBasico(enemigo);


      case 2:
        return this.ataqueEspecial(enemigo);


      case 3:
        return this.ataqueDefinitivo(enemigo);


      default:
        return 'Opción no válida. Por favor, elige un ataque válido.';
    }
  }

}



export { Guerrero };