import { drawSprite } from "./views/Image.js";
import { calcularDistancia, generadorEnemigo } from "../utility/utility.js";
import { espadaNormal } from "./Armas.js";
import { drawText } from "./views/Text.js";
import { app} from "../main.js";
class Personaje {

  constructor(nombre, tipo, vida, fuerza, velocidad) {
    //carcteristicas
    this.nombre = nombre.toUpperCase();
    this.vida = vida;
    this.tipo = tipo;
    this.fuerza = fuerza;
    this.velocidad = velocidad;
    this.rangoAtaque = 150;
    this.enemys = [];
    
    //Habilidades
    this.ataques = [];
    
    //Items
    this.inventario = [];
    this.armas = {id:0,name:"Espada Normal",item:espadaNormal()};;
    this.inventarioLen = 3;
    
    //Esdado
    this.muerto = false;

    //Transform -- posicion
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.flip = false;

    //Audios
    this.sound = new Audio();
    this.recibirAudio = "";

    //Animacion
    this.frame = 0;
    this.animaciones = [];
    this.sprite = new Image();
   
    this.animacionDefault = "parado";
    this.animacion = this.animaciones[this.animacionDefault];
  }

  atacar(enemigo) {
    enemigo.recibirAtaque();
  }

  recibirAtaque(ataqueDano) {
      this.playSound(this.recibirAudio);
      this.vida -= ataqueDano;
      this.animacion = this.animaciones["resibe"];
      if (this.vida <= 0)
          this.morir();
  }

  elegirArma(armaName) {
    this.armas = this.inventario.find(items => items.name === armaName);
  }

  elegirAtaque(ataqueName){
    return this.ataques.find(items => items.name === ataqueName);
  }

  async realizarAtaque(ataqueName) {
    if(this.frame % this.animacion.len === 0){
    const ataque = this.elegirAtaque(ataqueName);
    const powerUp = this.armas.item.powerUps.find(up=> up.enUso === true);
    //Ejecuta Una Animacion
    this.animacion= this.animaciones[ataque.animacion];

    for(const enemy of this.enemys){
      if(calcularDistancia(enemy.x,enemy.y,this.x,this.y) <= this.rangoAtaque && !enemy.muerto){
        //Ejecuta un sonido
        this.playSound(ataque.audio);
        
        //Calcula Dano
        let totalDamge = (this.fuerza + ataque.fuerza) + (this.armas.item ? this.armas.item.usar(powerUp?.name) : 0);
        //hacer dano a enemigo
        enemy.recibirAtaque(totalDamge);
        //imprimir dano
        drawText(`${totalDamge} + ${powerUp.name} ${powerUp.power}`,{color:"#bc1e1e",x:enemy.x,y:(enemy.y - enemy.h/1.5),fontSize:30,roundBk:true}).render()
        }
      }
    }
  }

  acciones(){};

  playSound(src, volume = 1) {
    this.sound.src = src;
    this.sound.volume = volume;
    this.sound.play();
  }

  morir() {
    this.muerto = true;
    this.animacion =  this.animaciones["morir"];
    if(this.tipo === "enemy"){
      generadorEnemigo(app.width);
    }
    if(this.tipo ==="player" && this.muerto){
      app.gameOver = true;
      app.turno = 0;
      const url = "/sounds/failure.mp3";
      app.player.playSound(url);
      
    }
  }


  render() {
    //Cambio de Frame
    this.frame++;

    //Normaliza Frame -- hace que no se pase del largo de la animacion 
    let i = this.frame % this.animacion.len;

    //Si Esta Muerto usa la animacion de muerto pordefecto 
    this.animacionDefault = this.muerto ? "muerto" : this.animacionDefault;
    
    //Si se termino la anicmacion selecciona una por defecto
    this.animacion = (i === 0) ?this.animaciones[this.animacionDefault]: this.animacion;
    //Ajusta el tamnono a la escala se la animacion
    const scaleX = this.w * this.animacion.scale;
    const scaleY = this.h * this.animacion.scale;

    //Dibuja El Sprite
    drawSprite(this.sprite, scaleX, scaleY, { sx: this.animacion.sx + (this.animacion.step * i), sy: this.animacion.sy, sw: this.animacion.sw, sh: this.animacion.sh, x: (this.x - scaleX/ 2), y: (this.y -scaleY / 2) }).render()
    this.acciones();
   
    //Dibuja Vida
    const style = {player: {x: app.width*.18, y: app.height*.955, fontSize: 50, fontFamily: "PatrickHand", roundBk: true },enemy: { x: this.x, y: this.y - this.h / 3, fontSize: 30, fontFamily: "PatrickHand", roundBk: true }}
    drawText(`${this.nombre} ${this.vida}❤️`, style[this.tipo]).render();
    //Dibuja Inventario
    this.drawInevtario();
    
    
  }

  drawInevtario() {
    //Solo dibuja el Inventario del Jugador
    if (this.tipo == "player") {
      //Recore todo el Inventario Y devuerve los Items
      const inventario = this.inventario.map((items, index) => {
       
        //separa items selocionado de lo que no
          if (this.armas.name === items.name && index < this.inventarioLen){
              //que Powerup el arama tinen en uso
              let PowerUP = items.item.powerUps?.find(powerUp=> powerUp.enUso === true).name;
              return `${items.name} + ${PowerUP} 👈 `
          }else {
               //que Powerup el arama tinen en uso
              let PowerUP = items.item.powerUps?.find(powerUp=> powerUp.enUso === true).name;
              return `${items.name} + ${PowerUP}  `
          }
      }).join("\n");

      //Dibuja Inventario
      drawText(" [ F ] Armas | [ R ] PowerUps  \n "+inventario, { color: "#d6ba72", x: app.width *.78, y: app.height *.05, fontSize: 30, roundBk: true }).render()
      //Dibuja Opciones de ataques
      drawText("[ Q ] Ataque basico\n[ E ] Ataque Especial", { color: "#ffffff", x: app.width *.83, y: app.height *.90, fontSize: 35, roundBk: true }).render()
      //has muerto MSG
      if(this.tipo === "player" && this.muerto){
        drawText(` Has Muerto!! `,{ color: "#e33030", fontSize: 50,fontFamily:"PatrickHand",roundBk:true }).render();
      }
    }
  }

  
}

export { Personaje };