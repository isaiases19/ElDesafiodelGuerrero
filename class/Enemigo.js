import { Personaje } from "./Personaje.js";
import { espadaFilosa } from "./Armas.js";
import { calcularDistancia, randomMinMax } from "../utility/utility.js";
import { app } from "../main.js";

class Enemigo extends Personaje {
  constructor(nombre, tipo, vida, fuerza, velocidad, nivel, { x }) {
    super(nombre, tipo, vida, fuerza, velocidad, nivel);
    //carcteristicas
    this.vida = vida;
    this.tipo = tipo;
    this.nombre = nombre;
    this.fuerza = fuerza * nivel;
    this.velocidad = velocidad;
    this.rango = 150;
    this.enemys = [app.player];
    this.nivel = nivel;
    this.destroyed = false;
    //Acciones
    this.path = randomMinMax(80, app.width * .7);
    this.target = false;

    //Habilidades
    this.ataques = [
      { name: "Ataque Basico", fuerza,usable: true,counDown:.6,count:.6, audio: "/sounds/punch-estocada.mp3", animacionR: "espada1R", animacionL: "espada1L" },
      { name: "Ataque Especial", fuerza: (fuerza * 2),usable:true,counDown:8.5,count:8.5, audio: "/sounds/punch-corte-feroz.mp3", animacionR: "espada2R", animacionL: "espada2L" },
    ]

    //Items
    this.inventario = [{ name: "Espada Filosa", item: espadaFilosa() }];
    this.armas = this.inventario[0];

    //Transform -- posicion
    this.x = x || 750;
    this.y = 830;
    this.w = 500;
    this.h = 400;

    //Audio
    this.recibirAudio = "/sounds/recibe1.mp3";

    //Animacion
    this.animaciones = {
      parado: { sx: 0, sy: 328, size: 64, len: 1, scale: .66 },
      recibirR: { sx: 0, sy: 72, size: 64, len: 5, scale: .66 },
      recibirL: { sx: 0, sy: 199, size: 64, len: 5, scale: .66 },
      espada2L: { sx: 0, sy: 1928, size: 193, len: 6, scale: 2 },
      espada1L: { sx: 0, sy: 968, size: 64, len: 6, scale: .66 },
      morir: { sx: 0, sy: 1287, size: 64, len: 6, scale: .66 },
      muerto: { sx: 323, sy: 1290, size: 64, len: 1, scale: .66 },
      caminarR: { sx: 0, sy: 712, size: 64, len: 8, scale: .66 },
      caminarL: { sx: 0, sy: 583, size: 64, len: 8, scale: .66 },
      paradoR: { sx: 0, sy: 712, size: 64, len: 1, scale: .66 },
      espada1R: { sx: 0, sy: 326, size: 64, len: 8, scale: .66 },
      espada2R: { sx: 0, sy: 1543, size: 193, len: 6, scale: 2 },
    }
    this.sprites=["/img/trollbase.png","/img/troll.png","/img/Orc.png"];

    this.sprite.src = this.nivel<=3 ? this.sprites[0]:this.sprites[1];
    this.sprite.src = this.nivel>9 ? this.sprites[2]:this.sprite.src;
    this.animacionDefault = "parado";
    this.animacion = this.animaciones[this.animacionDefault];
  }



  acciones() {
    if (!this.muerto && (this.frame % 8) === 0) {
      if (calcularDistancia(this.x, this.y, app.player.x, app.player.y) <= this.rango && !app.player.muerto) {
        this.enemys = [app.player]
        //Elige un Ataque Random
        let ataque = this.ataques[randomMinMax(1, this.ataques.length) - 1];
        if(!ataque.usable){
          return
        }else{   
          //Realiza el ataque
          this.realizarAtaque(ataque.name);
        }
        this.target = true;
      }

    }
    if (!this.muerto && (this.frame % 1) === 0 && calcularDistancia(this.x, this.y, app.player.x, app.player.y) > this.rango) {
      if(this.target){this.path = this.enemys[0].x;}

      //Elige una posicion Random para caminar
      if (this.x >= this.path) {
        this.x = this.x - this.velocidad;

        this.animacion = this.animaciones["caminarL"];
        this.animacionDefault = "parado";
      } else {
        this.x = this.x + this.velocidad;
        this.animacion = this.animaciones["caminarR"];
        this.animacionDefault = "paradoR";
      }
      //Si se termina coje otra
      if (!this.target && calcularDistancia(this.x, this.y, this.path, this.y) <= this.rango) {
        this.path = randomMinMax(app.width * .2, app.width * .8)
      }
    }
  }
}

export { Enemigo };

