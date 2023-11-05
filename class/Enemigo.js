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

   numeroAtaqueAleatorio() {
    // Genera un número decimal aleatorio entre 0 y 1
    const numeroDecimalAleatorio = Math.random();
  
    // Escala el número decimal al rango 1 a 3
    const numeroAleatorio = 1 + numeroDecimalAleatorio * 2;
  
    return Math.floor(numeroAleatorio); // Redondea hacia abajo para obtener un número entero.
  }
  
 
  

  realizarAtaque(enemigo) {
    let opcion=this.numeroAtaqueAleatorio;
    
    switch (opcion) {
      case 1:
        this.ataqueBasico(enemigo);
        break;

        case 2:
        this.ataqueEspecial(enemigo);
        break;

        case 3:
        this.ataqueDefinitivo(enemigo);
        break;

      default:
        console.log('Opción no válida. Por favor, elige un ataque válido.');
    }
  }


}

export {Enemigo};

