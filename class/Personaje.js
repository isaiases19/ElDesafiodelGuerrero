class Personaje{

    constructor(nombre,vida,tipo,fuerza,velocidad) {
        this.nombre = nombre.toUpperCase();
        this.vida = vida;
        this.tipo=tipo;
        this.fuerza=fuerza;
        this.velocidad=velocidad;

        this.ataques= [];
        this.armas = null;
        this.inventario = [];
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

      elegirArma(armaName){
        const arama = this.inventario.find(items=> items.name === armaName);
        this.armas = arama;
      }

      realizarAtaque(opcion, enemigo,powerUp = null) {
        if(opcion > 0 && opcion  <= this.ataques.length){
          let tipoAtaque = this.ataques[opcion - 1];
          this.playSound(tipoAtaque.audio);
          let totalDamge = tipoAtaque.fuerza + (this.armas.item ? this.armas.item.usar(powerUp?.name): 0);
          enemigo.recibirAtaque(totalDamge);
          return `${this.nombre} atca a ${enemigo.nombre} \n Con ${tipoAtaque.name} con daño de ${totalDamge}! ${(powerUp? `\n mas ${powerUp.name} +${powerUp.power} `:'')}`;
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