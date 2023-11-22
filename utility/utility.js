import { app } from "../main.js";
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
  return Math.max(3,nivel*.7);
}
function calcularVidaPorNivel(nivel){
  return Math.max(50,nivel * 20);
}
function calcularFuerzaPorNivel(nivel){
    return Math.max(5,nivel*.7);
}


function calcularDistancia(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}


export { randomMinMax, delay, calcularDistancia,calcularVidaPorNivel,calcularVelocidadPorNivel,calcularFuerzaPorNivel}