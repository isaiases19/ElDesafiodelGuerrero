import { Personaje } from "./Personaje.js";
import { espadaNormal, espadaFilosa } from "./Armas.js";
import { getcontroller } from "./controller/controller.js";
import { app } from "../main.js";
import { animacionArma1 } from "./animaciones/guerreroAnm.js";
class Guerrero extends Personaje {

  constructor(nombre, tipo, vida, fuerza, velocidad, nivel) {
    super(nombre, tipo, vida, fuerza, velocidad, nivel);
    //carcteristicas
    this.vida = vida;
    this.tipo = tipo;
    this.nombre = nombre;
    this.fuerza = fuerza;
    this.velocidad = velocidad;
    this.nivel = nivel;

    this.rango = 150;
    this.enemys = app.enemigos;
    this.sprite.src = "/img/Base.png";

    //Habilidades 
    this.ataques = [
      { name: "Ataque Basico", fuerza,usable: true,counDown:.1,count:.1, audio: "/sounds/punch-estocada.mp3", animacionR: "espada1R", animacionL: "espada1L" },
      { name: "Ataque Especial", fuerza: (fuerza * 2),usable:true,counDown:2,count:2,audio: "/sounds/punch-corte-feroz.mp3", animacionR: "espada2R", animacionL: "espada2L" },

    ]

    //Items
    this.inventario = [
      { id: 0, name: "Espada Normal", item: espadaNormal() },
    ]
    this.armas = { id: 0, name: "Espada Normal", item: espadaNormal() };

    //Transfrom
    this.x = 330;
    this.y = 830;
    this.w = 500;
    this.h = 400;

    //Audios
    //Audio
    this.recibirAudio = "/sounds/recibirPlayer.mp3";

    //Animacion
    this.animaciones = animacionArma1;
    this.animacionDefault = "parado";
    this.animacion = this.animaciones[this.animacionDefault];

    //Controller
    this.controller = getcontroller();
  }

  use() {
    this.controller.use()
  }

}

export { Guerrero };