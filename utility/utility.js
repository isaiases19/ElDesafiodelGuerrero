import { drawText } from "../class/views/Text.js";
import {update} from "../main.js";
function randomMinMax(min,max){
    return Math.floor(Math.random() * max) + min;
}

function turnoEnemigo(app,enemigo,guerrero) {
    app.clearCanvas();
    let opcion = randomMinMax(1,enemigo.ataques.length);
    let powerUp = enemigo.armas.item.powerUps[0];
    update(enemigo.realizarAtaque(opcion, guerrero,powerUp), "#e33030");
}

function turnoGuerrero(app,guerrero,enemigo) {
    guerrero.use(app,enemigo);
}
//delay funcion
async function delay(app,ms) {
    return new Promise(resolve => {
       app.timeOut = setTimeout(resolve, ms);
    });
}

function ejecutarTurno(app,turno,guerrero,enemigo) {
    app.turno = turno;
    (turno % 2) === 1 ? turnoGuerrero(app,guerrero,enemigo) : turnoEnemigo(app,enemigo,guerrero);
}

function drawVida(app,enemigo, guerrero) {
    const {fontFamily,fontSize} = {fontFamily:"Impact",fontSize: 30};
    drawText(` ${guerrero.nombre} ${guerrero.vida}❤️`, app, { x: app.width * .15, y: app.height * .52, fontSize,fontFamily,roundBk:true }).render();
    drawText(` ${enemigo.nombre} ${enemigo.vida}💚`, app, { x: app.width * .85, y: app.height * .50, fontSize,fontFamily,roundBk:true}).render();
}

export {randomMinMax,drawVida,delay,ejecutarTurno}