import {delay,generadorEnemigo} from "./utility/utility.js";
import { drawInicio } from "./screens/Inicio.js";
import { Guerrero } from "./class/Guerrero.js";
import { drawText } from "./class/views/Text.js";

const canvas = document.querySelector("canvas");
const backGroundMuisc = new Audio("/sounds/background.mp3");

const app = {
    width: 1080,
    height: 1080,
    context: canvas.getContext("2d"),
    turno: 0,
    timeOut: 5,
    gameOver: false,
    appStart: false,
    setup,
    clearCanvas: () => {
        canvas.width = app.width;
        canvas.height = app.height;
        
    },
    player:{},
    enemigos:[],
};


async function main() {
    drawInicio(app).render()
}

async function setup() {
    backGroundMuisc.loop = true;
    backGroundMuisc.play()
    backGroundMuisc.volume = 0.3;
    generadorEnemigo();
    app.player = new Guerrero("Conan","player",120,10,7);
    app.player.use();
    await delay(1000);
    draw()
}

async function update() {
    
    if (app.player.muerto) {
        app.gameOver = true;
        app.turno = 0;
        const url = "/sounds/failure.mp3";
        app.player.playSound(url);
        drawText(` Has sido vencido!! `,{ color: "#e33030", fontSize: 50,fontFamily:"PatrickHand",roundBk:true }).render();
    }
}

async function draw(){
    await delay(100);
    clearTimeout(app.timeOut);
    app.clearCanvas(); 
    for(const enemy of app.enemigos){enemy.render()}
    app.player.render();

    window.requestAnimationFrame(draw);
}

main();
export {update,app}