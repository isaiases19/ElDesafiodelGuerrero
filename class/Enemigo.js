import { Personaje } from "./personaje.js";

class Enemigo extends Personaje{
  constructor(nombre,tipo,vida,fuerza,velocidad){
    super(nombre,vida,tipo,fuerza,velocidad);

  }


  ataqueBasico(enemigo) {
    enemigo.recibirAtaque(this.fuerza);
    return`${this.nombre} realiza un ataque básico a ${enemigo.nombre} con una fuerza de ${this.fuerza}!`;
  }

  ataqueEspecial(enemigo) {
    const danioEspecial = this.fuerza * 2;
    enemigo.recibirAtaque(danioEspecial);
    return`${this.nombre} realiza un ataque especial a ${enemigo.nombre} con una fuerza aumentada de ${danioEspecial}!`;
  }

  ataqueDefinitivo(enemigo) {
    const danioDefinitivo = this.fuerza * 3;
    enemigo.recibirAtaque(danioDefinitivo);
    return`${this.nombre} realiza un ataque definitivo a ${enemigo.nombre} con una fuerza poderosa de ${danioDefinitivo}!`;
  }

}

export {Enemigo};

