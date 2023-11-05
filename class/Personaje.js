class Personaje{

    constructor(nombre,vida,tipo,fuerza,velocidad) {
        this.nombre = nombre;
        this.vida = vida;
        this.tipo=tipo;
        this.fuerza=fuerza;
        this.velocidad=velocidad;
        
        this.muerto = false;
        this.sound = new Audio();
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

      playSound(src,volume = 1){
        this.sound.src = src;
        this.sound.volume = volume;
        this.sound.play();
      }

morir(){
    this.muerto = true;
   console.log("Ha Muerto "+ this.nombre); 
}


}

export {Personaje};