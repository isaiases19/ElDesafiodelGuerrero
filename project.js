
class Personaje{

    constructor(nombre,vida,tipo) {
        this.nombre = nombre;
        this.vida = vida;
        this.tipo=tipo;
      }

      atacar(enemigo) {
        console.log(this.nombre, "Ataca a ",+ enemigo.name);
        enemigo.recibirAtaque();
      }

      recibirAtaque(ataqueDano) {
        this.vida -= ataqueDano;
        console.log(`${this.nombre} ha recibido un ataque. Vida restante: ${this.vida}`);
        if (this.vida <= 0) {
          this.morir();
        }
      }

morir(){
   console.log("Has Muerto"); 
}


}

class Enemigo extends Personaje{

  constructor(){

  }

  
  

}

