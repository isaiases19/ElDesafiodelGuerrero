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
    const {fontFamily,fontSize} = {fontFamily:"PatrickHand",fontSize: 30};
    drawText(` ${guerrero.nombre} ${guerrero.vida}❤️`, app, { x: app.width * .15, y: app.height * .52, fontSize,fontFamily,roundBk:true }).render();
    drawText(` ${enemigo.nombre} ${enemigo.vida}💚`, app, { x: app.width * .85, y: app.height * .50, fontSize,fontFamily,roundBk:true}).render();
}

function drawInvetarios(app,enemigo, guerrero){
    const espdasTeclas = ["A","S","D"];
    const inventarioGuerro = guerrero.inventario.map((items,i)=>{
        if(guerrero.armas.name === items.name && i <3)
            return` [${espdasTeclas[i]}] ${items.name} ✅ ` 
        else if(i<3){ 
            return` [${espdasTeclas[i]}] ${items.name} `
        }
    }).join("\n");
    drawText(inventarioGuerro,app,{color:"orange",x:app.width*.18,y:app.height*.35,fontSize:30,roundBk:true}).render()

    ///eENEMIGO
    const inventarioEnemigo = enemigo.inventario.map((items,i)=>{
        if(enemigo.armas.name === items.name && i <3)
            return`${items.name} ✅ ` 
        else if(i<3){ 
            return`${items.name} `
        }
    }).join("\n");
    drawText(inventarioEnemigo,app,{color:"#d6ba72",x:app.width*.85 ,y:app.height*.35,fontSize:30,roundBk:true}).render()
}

export {randomMinMax,drawVida,delay,ejecutarTurno,drawInvetarios}