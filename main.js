import { drawInicio } from "./screens/Inicio.js";
import { Guerrero } from "./class/Guerrero.js";
import { Enemigo } from "./class/Enemigo.js";
import { drawText } from "./class/views/Text.js";
import { randomMinMax, drawVida,delay,ejecutarTurno} from "./utility/utility.js";

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
const guerrero = new Guerrero("Conan", "player", 100,3, 6);
const enemigo = new Enemigo("Troll", "enemy",randomMinMax(50,90) ,randomMinMax(3,7) ,randomMinMax(3,7));

async function main() {
    drawInicio(app).render()
    const satrt = new Audio("/sounds/click.mp3");
    addEventListener("keyup", (e) => {
        let accions = {
            "Space": () => {
                app.clearCanvas()
                satrt.play()
                setup();
                app.appStart = true;
            }
        }
        if (!app.appStart)
        accions[e.code]()
    })
}

async function setup() {
    backGroundMuisc.loop = true;
    backGroundMuisc.play()
    backGroundMuisc.volume = 0.3;

    await delay(app,1000);
    drawVida(app,enemigo, guerrero);
    ejecutarTurno(app,guerrero.velocidad > enemigo.velocidad ? 1 : 2,guerrero,enemigo);
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
        drawVida(app,enemigo, guerrero);
        drawText(MSG, app, { color, x: app.width * .5, y: app.height * .75, fontSize: 40,fontFamily:"Comic Sans" }).render();
        
       
        await delay(app,3000);
        ejecutarTurno(app,app.turno + 1,guerrero,enemigo);
        return
    }
}

main();
export {update}