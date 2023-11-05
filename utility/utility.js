import { drawText } from "../class/views/Text.js";
import {update} from "../main.js";
function randomMinMax(min,max){
    return Math.floor(Math.random() * max) + min;
}

function turnoEnemigo(app,enemigo,guerrero) {
    app.clearCanvas();
    let opcion = randomMinMax(1,enemigo.ataques.length);
    update(enemigo.realizarAtaque(opcion, guerrero), "#e33030");
}

function turnoGuerrero(app,guerrero,enemigo) {
    let opcion = 0;
    let ataque = { "KeyZ": 1, "KeyX": 2, "KeyC": 3 };
    
    drawText(" [ Z ] [ X ] [ C ] \n Estocada | Corte Feroz | Tajo Desgarrador ", app, { color: "#ffffff", x: app.width * .5, y: app.height * .878, fontSize: 35 }).render()
    //linten for key
    addEventListener("keyup", (e) => {
        opcion = ataque[e.code];
        if ((app.turno  % 2) === 1 && opcion > 0) {
            update(guerrero.realizarAtaque(opcion, enemigo), "#64f177");
        }
    });


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
    drawText(` ${guerrero.nombre} ${guerrero.vida}❤️`, app, { x: app.width * .15, y: app.height * .52, fontSize,fontFamily }).render();
    drawText(` ${enemigo.nombre} ${enemigo.vida}💚`, app, { x: app.width * .85, y: app.height * .50, fontSize,fontFamily}).render();
}

export {randomMinMax,drawVida,delay,ejecutarTurno}