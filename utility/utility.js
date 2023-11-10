import { app } from "../main.js";
import { Enemigo } from "../class/Enemigo.js";
function randomMinMax(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//delay funcion
async function delay(ms) {
    return new Promise(resolve => {
       app.timeOut = setTimeout(resolve, ms);
    });
}

function generadorEnemigo(x = 750){
    app.enemigos.push(new Enemigo("Troll", "enemy",randomMinMax(50,120) ,randomMinMax(3,7) ,randomMinMax(3,7),2,{x}));
  }

  function calcularDistancia(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }
  function calcularDistancia1D(x1, x2,) {
    return Math.hypot(x2,x1);
  }

export {randomMinMax,delay,generadorEnemigo,calcularDistancia,calcularDistancia1D}