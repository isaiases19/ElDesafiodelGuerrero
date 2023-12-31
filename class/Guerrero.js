import { Personaje } from "./Personaje.js";
import { espadaFilosa, espadaNormal } from "./Armas.js";
import { Controller } from "./controller/controller.js";
import { app } from "../main.js";
import { animacionArma1 } from "./animaciones/guerreroAnm.js";
import { Posion } from "./posion.js";
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
    this.sprite.src = "/img/playerSprite/baseDaga.png";

    //Habilidades 
    this.ataques = [
      { name: "Ataque Basico", fuerza,usable: true,counDown:.1,count:.1, audio: "/sounds/recibe2.mp3", animacionR: "espada1R", animacionL: "espada1L" },
      { name: "Ataque Especial", fuerza: (fuerza * 2),usable:true,counDown:3,count:3,audio: "/sounds/resibe1.mp3", animacionR: "espada2R", animacionL: "espada2L" },
    ]

    //Items
    this.inventarioLen = 3;
    this.inventario = [
      { id: 0, name: "Espada Normal", item: espadaNormal() },
    ]
    this.armas = { id: 0, name: "Espada Normal", item: espadaNormal() };
    this.posiones = [];
    //Transfrom
    this.x = app.width*.5;

    //Audios
    //Audio
    this.recibirAudio = "/sounds/recibe1.mp3";

    //Animacion
    this.animaciones = animacionArma1;
    this.animacionDefault = "parado";
    this.animacion = this.animaciones[this.animacionDefault];

    //Controller
    this.controller = new Controller();
  }

}

export { Guerrero };