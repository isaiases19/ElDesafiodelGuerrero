class Personaje{

    constructor(nombre,vida,tipo,fuerza,velocidad) {
        this.nombre = nombre;
        this.vida = vida;
        this.tipo=tipo;
        this.fuerza=fuerza;
        this.velocidad=velocidad;

        this.ataques= [];
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

      realizarAtaque(opcion, enemigo) {
        if(opcion > 0 && opcion  <= this.ataques.length){
          return this.ataques[opcion - 1](this,enemigo);
        }else{
          return 'Opción no válida. Por favor, elige un ataque válido.';
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