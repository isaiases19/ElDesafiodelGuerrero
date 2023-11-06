import { drawSprite } from "./views/Image.js";
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
        this.sprite = new Image();
        this.x = 0;
        this.y = 0;
        this.h = 0;

    
        this.frame =0;
        this.animaciones = [];
        this.animacion = this.animaciones["parado"];
      }

      atacar(enemigo) {
        console.log(this.nombre, "Ataca a ",+ enemigo.name);
        enemigo.recibirAtaque();
      }

      recibirAtaque(ataqueDano) {
        this.animacion = this.animaciones["resibe"];
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
          this.animacion = this.animaciones[tipoAtaque.animacion];
          this.playSound(tipoAtaque.audio);
          let totalDamge = tipoAtaque.fuerza + (this.armas.item ? this.armas.item.usar(powerUp?.name): 0);
          enemigo.recibirAtaque(totalDamge);
          return `${this.nombre} ataca a ${enemigo.nombre} \n Con ${tipoAtaque.name} con daño de ${totalDamge} ${(powerUp? `\n mas ${powerUp.name} ${powerUp.power} `:'')}`;
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
        this.animacion = this.animaciones["morir"];
        this.muerto = true;
        console.log("Ha Muerto "+ this.nombre); 
      }

      render(app){
        this.frame++;
        let i = this.frame % this.animacion.len;
        let defultAnimation = this.muerto? this.animaciones["muerto"]:this.animaciones["parado"]
        this.animacion = i == 0 ? defultAnimation: this.animacion;
        const {w,h,x,y} = {w:500*this.animacion.scale,h:400*this.animacion.scale,x:this.x,y:this.y};
        this.h = h;
        drawSprite(this.sprite,app,w,h,{sx:this.animacion.sx + (this.animacion.step * i),sy:this.animacion.sy,sw:this.animacion.sw,sh:this.animacion.sh,x:(x - w/2),y:(y - h/2)}).render()
      }
}

export {Personaje};