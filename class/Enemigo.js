import { Personaje } from "./personaje.js";

class Enemigo extends Personaje {
  constructor(nombre, tipo, vida, fuerza, velocidad) {
    super(nombre, vida, tipo, fuerza, velocidad);

  }


  ataqueBasico(enemigo) {
    enemigo.recibirAtaque(this.fuerza);
    return `${this.nombre} realiza un ataque básico a ${enemigo.nombre} con una fuerza de ${this.fuerza}!`;
  }

  ataqueEspecial(enemigo) {
    const danioEspecial = this.fuerza * 2;
    enemigo.recibirAtaque(danioEspecial);
    return `${this.nombre} realiza un ataque especial a ${enemigo.nombre} con una fuerza aumentada de ${danioEspecial}!`;
  }

  ataqueDefinitivo(enemigo) {
    const danioDefinitivo = this.fuerza * 3;
    enemigo.recibirAtaque(danioDefinitivo);
    return `${this.nombre} realiza un ataque definitivo a ${enemigo.nombre} con una fuerza poderosa de ${danioDefinitivo}!`;
  }

  realizarAtaque(enemigo) {
    let opcion = Math.floor(Math.random()*3)+1;

    switch (opcion) {
      case 1:
        return this.ataqueBasico(enemigo);
      case 2:
        return this.ataqueEspecial(enemigo);
      case 3:
        return this.ataqueDefinitivo(enemigo);
      default:
        console.log('Opción no válida. Por favor, elige un ataque válido.');
    }
  }


}

export { Enemigo };

