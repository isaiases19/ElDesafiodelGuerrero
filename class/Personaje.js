import { drawSprite } from "./views/Image.js";
import { calcularDistancia, delay, generadorEnemigo, randomMinMax } from "../utility/utility.js";
import { espadaNormal } from "./Armas.js";
import { drawText } from "./views/Text.js";
import { app } from "../main.js";
import { drawMuerte } from "../screens/muerte.js";
import { espadaItem, vidaItem } from "./Items.js";
import { drawRect } from "./views/Rect.js";
class Personaje {

  constructor(nombre, tipo, vida, fuerza, velocidad, nivel) {
    //carcteristicas
    this.nombre = nombre.toUpperCase();
    this.vida = vida;
    this.tipo = tipo;
    this.fuerza = fuerza;
    this.velocidad = velocidad;
    this.rangoAtaque = 150;
    this.enemys = [];
    this.nivel = nivel;

    //Habilidades
    this.ataques = [];

    //Items
    this.inventario = [];
    this.armas = { id: 0, name: "Espada Normal", item: espadaNormal() };
    this.posiones = [];
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

    //nivel 
    this.bajasCont = 0;
    this.vidabase = vida;
  }


  levelUp() {
    this.playSound("../sounds/leverup.mp3");

    app.player.nivel++;
    app.player.vida = app.player.vidabase + 10;
    app.player.vidabase = app.player.vida;
    app.player.fuerza += 2;


  }

  atacar(enemigo) {
    enemigo.recibirAtaque();
  }

  recibirAtaque(ataqueDano) {
    this.playSound(this.recibirAudio);
    this.vida -= ataqueDano;
    const elegirAnimacion = this.animacionDefault === "parado" ? "recibirR" : "recibirL";
    this.animacion = this.animaciones[elegirAnimacion];

    if (this.vida <= 0)
      this.morir();
  }

  elegirArma(armaName) {
    this.armas = this.inventario.find(items => items.name === armaName);
  }

  elegirAtaque(ataqueName) {
    return this.ataques.find(items => items.name === ataqueName);
  }

  async realizarAtaque(ataqueName) {
    if (this.frame % this.animacion.len === 0) {
      const ataque = this.elegirAtaque(ataqueName);
      if (ataque.usable) {
        const powerUp = this.armas.item.powerUps.find(up => up.enUso === true);
        //Ejecuta Una Animacion
        const elegirAnimacion = this.animacionDefault === "parado" ? ataque.animacionR : ataque.animacionL;
        this.animacion = this.animaciones[elegirAnimacion];

        for (const enemy of this.enemys) {
          if (calcularDistancia(enemy.x, enemy.y, this.x, this.y) <= this.rangoAtaque && !enemy.muerto) {
            // //Ejecuta un sonido
            // this.playSound(ataque.audio);

            //Calcula Dano
            let totalDamge = (this.fuerza + ataque.fuerza) + (this.armas.item ? this.armas.item.usar(powerUp?.name) : 0);
            //hacer dano a enemigo
            enemy.recibirAtaque(totalDamge);

            //imprimir dano
            drawText(`${totalDamge} + ${powerUp.name} ${powerUp.power}`, { color: "#bc1e1e", x: enemy.x, y: (enemy.y - enemy.h / 1.5), fontSize: 30, roundRadius: 20 }).render()
          }
        }
      }
      const atackIdex = this.ataques.findIndex(a => a.name === ataque.name);
      if (ataque.usable) {
        const atCD = setInterval(() => {
          this.ataques[atackIdex].count -= (10 / 1000);
          if (ataque.count <= 0) {
            this.ataques[atackIdex].usable = true;
            this.ataques[atackIdex].count = ataque.counDown;
            clearInterval(atCD);
          }
        }, 1);
      }
      this.ataques[atackIdex].usable = false;

    }

  }

  acciones() { };

  playSound(src, volume = 1) {
    this.sound.src = src;
    this.sound.volume = volume;
    this.sound.play();
  }

  morir() {
    this.muerto = true;
    this.animacion = this.animaciones["morir"];
    if (this.tipo === "enemy") {
      app.player.bajasCont++;

      if ((app.player.bajasCont) == Math.round(app.player.nivel * 2.2)) {
        this.levelUp();

      }
      generadorEnemigo(app.width);

      if (randomMinMax(1, 5) == 2) {
        randomMinMax(1, 10) < 5 ? app.items.push(vidaItem(this.x, this.y)) : app.items.push(espadaItem(this.x + 20, this.y))
      }

      if (!this.destroyed) {
        const d = setTimeout(() => { this.destroyed = true; clearTimeout(d) }, 5000);
      }
    }
    if (this.tipo === "player" && this.muerto) {
      app.gameOver = true;
      app.turno = 0;
      const url = "/sounds/failure.mp3";
      app.player.playSound(url);

    }
  }

  render() {


    if (this.tipo === "player") {
      const levels = [5,20,40,60];
      const arma =  this.armas.name === "Espada Filosa"?  "Sword": "Daga";
     
        for(let lv of levels){
          
          this.sprite.src = (this.nivel >= lv) ? `/img/Level${lv}${arma}.png`: `/img/base${arma}.png`;
          if(this.nivel >= lv){
            break;
          }
        }
      }
    

    //Cambio de Frame
    this.frame++;

    //Normaliza Frame -- hace que no se pase del largo de la animacion 
    let i = this.frame % this.animacion.len;

    //Si Esta Muerto usa la animacion de muerto pordefecto 
    this.animacionDefault = this.muerto ? "muerto" : this.animacionDefault;

    //Si se termino la anicmacion selecciona una por defecto
    this.animacion = (i === 0) ? this.animaciones[this.animacionDefault] : this.animacion;
    //Ajusta el tamnono a la escala se la animacion
    const scaleX = this.w * this.animacion.scale;
    const scaleY = this.h * this.animacion.scale;

    //Dibuja El Sprite
    drawSprite(this.sprite, scaleX, scaleY, { sx: this.animacion.sx + (this.animacion.size * i), sy: this.animacion.sy, sw: this.animacion.size, sh: this.animacion.size, x: (this.x - scaleX / 2), y: (this.y - scaleY / 2) }).render()
    this.acciones();

    //Dibuja Vida
    const style = {
      player: { color: "white", x: app.width * .085, y: app.height * .92, fontSize: 25, fontFamily: "PatrickHand", roundRadius: 12, bgColor: '#0a0e1a' },
      enemy: { color: "#ececec", x: this.x, y: this.y - this.h / 2.5, style: "bold", fontSize: 20, fontFamily: "PatrickHand", roundRadius: 10 }
    }

    if (!this.muerto) {
      drawText(`${this.nombre}\n❤️${this.vida} Lv.${this.nivel}`, style[this.tipo]).render();
    }

    //Dibuja Inventario
    if (this.tipo === "player") {
      this.drawInevtario(app.width * .2, app.height * .9, 70, 5);
      this.drawPosiones(app.width * .425, app.height * .9, 70, 5);
    }
  }

  drawInevtario(x, y, sz, mg) {

    this.inventario.forEach((item, index) => {
      const PowerUP = item.item.powerUps?.find(powerUp => powerUp.enUso === true);
      const { sx, sy } = PowerUP.icon;


      drawRect(x + ((sz + mg * 2) * index), y, sz + mg, sz + mg, { color: "#0e1016e5", roundRadius: sz / 8 }).render();
      const color = this.armas.name === item.name ? "#3b7a3bff" : "#0a0e1aff";
      drawRect(x + ((sz + mg * 2) * index), y + (sz + mg), sz + mg, mg, { color, roundRadius: sz / 8 }).render();
      drawSprite(item.item.icon, sz * .9, sz * .9, { x: (x + ((sz + mg * 2) * index)) + mg, y: y + mg, sx, sy, sh: 16, sw: 16 }).render()
    });

    drawRect(x, y + (sz + mg * 2), (sz + mg * 1.7) * 3, 20, { color: "black", roundRadius: 3 }).render()
    drawText("\t⚔️Armas", { fontSize: 16, x: x + sz / 1.5, y: y + (sz + mg * 4) }).render()

    //Dibuja Opciones de ataques
    const { c1, c2 } = { c1: this.ataques[0].count, c2: this.ataques[1].count };
  
    drawText(`🗡️${c1 < 1 ? Math.floor(c1 * 1000) + "ms " : c1.toFixed(2) + "s "} ⚔️${c2 < 1 ? Math.floor(c2 * 1000) + "ms " : c2.toFixed(2) + "s "} `, { x: app.width * .89, y: app.height * .975, fontSize: 18, roundRadius: 15, bgColor: "#0a0e1a" }).render()
    //has muerto MSG
    if (this.tipo === "player" && this.muerto) {
      drawMuerte().render()
    }

  }

  drawPosiones(x, y, sz, mg) {
    this.posiones.forEach((posion, index) => {
      const { sx, sy } = posion;

      drawRect(x + ((sz + mg * 3) * index), y, sz + (mg * 2), sz + mg, { color: "#0e1016b0", roundRadius: sz/8 }).render();
      drawRect(x + ((sz + mg * 3) * index), y + (sz + mg), sz + mg, mg, {color:"#0a0e1aff", roundRadius: sz / 8 }).render();
      drawSprite(posion.sprite, sz, sz, { x: (x + ((sz + mg * 3) * index)) + mg, y: y + (mg/2), sx, sy, sh: 16, sw: 16 }).render()
    })

    drawRect(x, y + (sz + mg * 2), (sz + mg*2.5) * 2, 20, { color: "black", roundRadius: 3 }).render()
    drawText("\t🧪Posiones", { fontSize: 16, x: x + sz / 1.5, y: y + (sz + mg * 4) }).render()
  }

}
export { Personaje };