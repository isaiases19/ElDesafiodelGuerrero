import { delay, generadorEnemigo } from "./utility/utility.js";
import { drawInicio } from "./screens/Inicio.js";
import { Guerrero } from "./class/Guerrero.js";

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

//Bucle que llama el renderizado de los objetos
async function draw(){
    //delay 
    await delay(90);
    clearTimeout(app.timeOut);
    //limpia el lienzo
    app.clearCanvas();
    //Renderiza cada enemigo 
    for(const enemy of app.enemigos){enemy.render()}
    //Renderiza El Jugadar
    app.player.render();
    //LLama al siguiente frame
    window.requestAnimationFrame(draw);
}

//inica el programa
main();

export {app}