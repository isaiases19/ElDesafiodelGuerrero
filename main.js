import { drawInicio } from "./screens/Inicio.js";
import { Guerrero } from "./class/Guerrero.js";
import { Enemigo } from "./class/Enemigo.js";
import { drawText } from "./class/views/Text.js";
import { randomMinMax } from "./utility/utility.js";
const canvas = document.querySelector("canvas");
const backGroundMuisc = new Audio("/sounds/background.mp3");

const app = {
    FPS: 1,
    width: 1080,
    height: 1080,
    context: canvas.getContext("2d"),
    turno: 0,
    appStart: false,
    clearCanvas: () => {
        canvas.width = app.width;
        canvas.height = app.height;
    }
};


async function init() {
    drawInicio(app).render()
}
const guerrero = new Guerrero("Conan", 0, 0, 0, 0);
const enemigo = new Enemigo("Troll", 0,randomMinMax(20,80) ,randomMinMax(3,7) ,randomMinMax(3,7));

function setUp() {
    backGroundMuisc.loop = true;
    backGroundMuisc.play()
    backGroundMuisc.volume = 0.3;
    app.turno = guerrero.velocidad > enemigo.velocidad ? 1 : 2;
    ejecutarTurno();
}
function turnoEnemigo() {
    app.clearCanvas();
    let opcion = randomMinMax(1,3);
    update(enemigo.realizarAtaque(opcion, guerrero), "#e33030");
}

function turnoGuerrero() {
    let opcion = 0;
    let ataque = { "KeyZ": 1, "KeyX": 2, "KeyC": 3 };

    drawText(" Z Estocada | X  Corte Feroz | C  Tajo Desgarrador ", app, { color: "#ffffff", x: app.width * .5, y: app.height * .90, fontSize: 30 }).render()
    //linten for key
    addEventListener("keyup", (e) => {
        opcion = ataque[e.code];
        if ((app.turno  % 2) && opcion > 0) {
            update(guerrero.realizarAtaque(opcion, enemigo), "#64f177");
        }
    });


}


async function update(MSG, color) {
    app.clearCanvas()
    if (enemigo.muerto) {
        app.turno = 0;
        guerrero.playSound("/sounds/success.mp3");
        drawText(` 🎉${guerrero.nombre.toUpperCase()} ah vencido!!🎉 `, app, { color: "#64f177", fontSize: 50 }).render()
        return
    } if (guerrero.muerto) {
        app.turno = 0;
        guerrero.playSound("/sounds/failure.mp3");
        drawText(` Hazido vencido por ${enemigo.nombre.toUpperCase()}!! `, app, { color: "#e33030", fontSize: 50 }).render()
        return
    }

    drawVida(enemigo, guerrero);
    drawText(MSG, app, { color, x: app.width * .5, y: app.height * .7, fontSize: 30,fontFamily:"Comic Sans" }).render();

    app.turno++;
    await delay(3000);
    ejecutarTurno()
}

function ejecutarTurno() {
    if ((app.turno  % 2)) {
        turnoGuerrero()
    } else {
        turnoEnemigo()
    }
}


function drawVida(enemigo, guerrero) {
    const {fontFamily,fontSize} = {fontFamily:"Impact",fontSize: 30};
  
    drawText(` ${guerrero.nombre} ${guerrero.vida}💖`, app, { x: app.width * .2, y: app.height * .50, fontSize,fontFamily }).render();
    drawText(`${enemigo.nombre} ${enemigo.vida}💖`, app, { x: app.width * .80, y: app.height * .50, fontSize,fontFamily}).render();
}

async function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


const satrt = new Audio("/sounds/click.mp3");
document.addEventListener("keyup", (e) => {
    let accions = {
        "Space": () => {
            app.clearCanvas()
            satrt.play()
            setUp();
            app.appStart = true;
        }
    }
    if (!app.appStart)
    accions[e.code]()
})
init();