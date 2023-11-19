import { app } from "../main.js";
import { Enemigo } from "../class/Enemigo.js";
function randomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//delay funcion
async function delay(ms) {
  return new Promise(resolve => {
    app.timeOut = setTimeout(resolve, ms);
  });
}

function calcularVelocidadPorNivel(nivel) {
  return Math.max(3,nivel);
}
function calcularVidaPorNivel(nivel){
  return Math.max(50,nivel * 20);
}

function generadorEnemigo(x = 0) {
  let level = 0;
  let etiqueta="";
  //decide que nivel usar
  level = app.player.nivel > 10 ? randomMinMax(8, 11) : randomMinMax(1, 5);
  app.player.nivel>19? level=16 : randomMinMax(8, 11); 
  etiqueta = level > 10 ? "Orc" : "Troll";
  //Posicion al spawnear
  x = x === 0 ? ((randomMinMax(1,2) === 1) ? app.width: -100): x;
  //Caracteristicas
  const {nombre, tipo, vida, fuerza, velocidad, nivel} = {
    nombre:etiqueta, tipo: "enemy", vida: calcularVidaPorNivel(level), fuerza: level, velocidad: calcularVelocidadPorNivel(level), nivel: level
  } 
  //Crear Enemigo
  app.enemigos.push(new Enemigo(nombre, tipo, vida, fuerza, velocidad, nivel, { x }));
}

function calcularDistancia(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}


export { randomMinMax, delay, generadorEnemigo, calcularDistancia }