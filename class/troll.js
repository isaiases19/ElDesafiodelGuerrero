import { Enemigo } from "./Enemigo";

var fuerzaTroll=20;
var velocidadTroll=12;
class Troll extends Enemigo{

constructor(nombre,tipo,vida,fuerza,velocidad){
super(nombre,tipo,vida,fuerza,velocidad);
this.fuerza=fuerzaTroll;
this.velocidad=velocidadTroll;

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




}