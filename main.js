import { drawInicio } from "./screens/Inicio.js";
import { Guerrero } from "./class/Guerrero.js";
import { Enemigo } from "./class/Enemigo.js";
import { drawText } from "./class/views/Text.js";
import { randomMinMax } from "./utility/utility.js";
import { drawSprite } from "./class/views/Image.js";

const canvas = document.querySelector("canvas");
const backGroundMuisc = new Audio("/sounds/background.mp3");

const app = {
    FPS: 1,
    width: 1080,
    height: 1080,
    context: canvas.getContext("2d"),
    turno: 0,
    appStart: false,
    timeOut: 5,
    clearCanvas: () => {
        canvas.width = app.width;
        canvas.height = app.height;
        clearTimeout(app.timeOut);
    }
};


async function init() {
    drawInicio(app).render()
}
const guerrero = new Guerrero("Conan", "player", 100,3, 6);
const enemigo = new Enemigo("Troll", "enemy",randomMinMax(20,80) ,randomMinMax(3,7) ,randomMinMax(3,7));

async function setUp() {
    backGroundMuisc.loop = true;
    backGroundMuisc.play()
    backGroundMuisc.volume = 0.3;

    await delay(1000);
    drawVida(enemigo, guerrero);
    ejecutarTurno(guerrero.velocidad > enemigo.velocidad ? 1 : 2);
}
function turnoEnemigo() {
    app.clearCanvas();
    let opcion = randomMinMax(1,enemigo.ataques.length);
    update(enemigo.realizarAtaque(opcion, guerrero), "#e33030");
}

function turnoGuerrero() {
    let opcion = 0;
    let ataque = { "KeyZ": 1, "KeyX": 2, "KeyC": 3 };
    
    drawText(" Z Estocada | X  Corte Feroz | C  Tajo Desgarrador ", app, { color: "#ffffff", x: app.width * .5, y: app.height * .90, fontSize: 30 }).render()
    //linten for key
    addEventListener("keyup", (e) => {
        opcion = ataque[e.code];
        if ((app.turno  % 2) === 1 && opcion > 0) {
            update(guerrero.realizarAtaque(opcion, enemigo), "#64f177");
        }
    });


}


async function update(MSG, color) {
    app.clearCanvas()
    if (enemigo.muerto || guerrero.muerto) {
        app.turno = 0;
        const url = guerrero.muerto ? "/sounds/failure.mp3": "/sounds/success.mp3"
        guerrero.playSound(url);
        enemigo.vida < guerrero.vida ? drawText(` 🎉${guerrero.nombre} a vencido!!🎉 \n 🤩`, app, { color: "#64f177", fontSize: 50 }).render() : drawText(` Has sido vencido por ${enemigo.nombre.toUpperCase()}!! \n 😭`, app, { color: "#e33030", fontSize: 50 }).render();
        return
    }else{
        drawVida(enemigo, guerrero);
        drawText(MSG, app, { color, x: app.width * .5, y: app.height * .8, fontSize: 30,fontFamily:"Comic Sans" }).render();
        
       
        await delay(3000);
        ejecutarTurno(app.turno + 1);
        return
    }
}

function ejecutarTurno(turno) {
    app.turno = turno;
    (turno % 2) === 1 ? turnoGuerrero() : turnoEnemigo();
}


function drawVida(enemigo, guerrero) {
    const {fontFamily,fontSize} = {fontFamily:"Impact",fontSize: 30};
  
    drawText(` ${guerrero.nombre} ${guerrero.vida}❤️`, app, { x: app.width * .15, y: app.height * .52, fontSize,fontFamily }).render();
    drawText(` ${enemigo.nombre} ${enemigo.vida}💚`, app, { x: app.width * .85, y: app.height * .50, fontSize,fontFamily}).render();
}

async function delay(ms) {
    return new Promise(resolve => {
       app.timeOut = setTimeout(resolve, ms);
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