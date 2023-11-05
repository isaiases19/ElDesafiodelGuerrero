import { Personaje } from "./personaje.js";

class Enemigo extends Personaje {
  constructor(nombre, tipo, vida, fuerza, velocidad) {
    super(nombre, vida, tipo, fuerza, velocidad);

    this.ataques = [
      this.ataqueBasico,
      this.ataqueEspecial,
      this.ataqueDefinitivo
    ]
  }


  ataqueBasico(me,enemigo) {
    me.playSound("/sounds/punch-estocada.mp3");
    enemigo.recibirAtaque(me.fuerza);
    return `${me.nombre.toUpperCase()} realiza un ataque básico a \n ${enemigo.nombre.toUpperCase()} con una fuerza de ${me.fuerza}!`;
  }

  ataqueEspecial(me,enemigo) {
    me.playSound("/sounds/punch-corte-feroz.mp3");
    const danioEspecial = me.fuerza * 2;
    enemigo.recibirAtaque(danioEspecial);
    return `${me.nombre.toUpperCase()} realiza un ataque especial a \n ${enemigo.nombre.toUpperCase()} con una fuerza aumentada de ${danioEspecial}!`;
  }

  ataqueDefinitivo(me,enemigo) {
    me.playSound("/sounds/punch-tajo-desgarrador.mp3");
    const danioDefinitivo = me.fuerza * 3;
    enemigo.recibirAtaque(danioDefinitivo);
    return `${me.nombre.toUpperCase()} realiza un ataque definitivo a \n ${enemigo.nombre.toUpperCase()} con una fuerza poderosa de ${danioDefinitivo}!`;
  }
}

export { Enemigo };

