import { Personaje } from "./personaje.js";

var fuerzaGuerrero=3;
var velocidadGuerrero=5;
var vidaGuerrero=100;
class Guerrero extends Personaje{

    constructor(nombre,tipo,vida,fuerza,velocidad) {
        super(nombre,tipo,vida,fuerza,velocidad);
        this.vida=vidaGuerrero;
        this.fuerza=fuerzaGuerrero;
        this.velocidad=velocidadGuerrero;
      }

      ataqueBasico(enemigo) {
        console.log(`${this.nombre} realiza un ataque básico a ${enemigo.nombre} con una fuerza de ${this.fuerza}!`);
        enemigo.recibirAtaque(this.fuerza);
      }
    
      ataqueEspecial(enemigo) {
        const danioEspecial = this.fuerza * 2;
        console.log(`${this.nombre} realiza un ataque especial a ${enemigo.nombre} con una fuerza aumentada de ${danioEspecial}!`);
        enemigo.recibirAtaque(danioEspecial);
      }
    
      ataqueDefinitivo(enemigo) {
        const danioDefinitivo = this.fuerza * 3;
        console.log(`${this.nombre} realiza un ataque definitivo a ${enemigo.nombre} con una fuerza poderosa de ${danioDefinitivo}!`);
        enemigo.recibirAtaque(danioDefinitivo);
      }
     
       realizarAtaque(opcion,enemigo) {
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
  
  

  export {Guerrero};