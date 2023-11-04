class Personaje{

    constructor(nombre,vida,tipo,fuerza,velocidad) {
        this.nombre = nombre;
        this.vida = vida;
        this.tipo=tipo;
        this.fuerza=fuerza;
        this.velocidad=velocidad;
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

export {Personaje};