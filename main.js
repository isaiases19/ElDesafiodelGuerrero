import { delay, generadorEnemigo, randomMinMax } from "./utility/utility.js";
import { drawInicio } from "./screens/Inicio.js";
import { drawPausa } from "./screens/pausa.js";
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
    pause:false,
    setup,
    keys: [],
    pantalla: {},
    clearCanvas: () => {
        canvas.width = app.width;
        canvas.height = app.height;
    },
    player:{},
    enemigos:[],
    items:[]
};


async function main() {
    app.clearCanvas();
    app.pantalla = drawInicio()
    app.pantalla.render()
}

async function setup() {
    //configura musica
    backGroundMuisc.loop = true;
    backGroundMuisc.play()
    const song = [0.16,1.55,3.19,3.45,4.51,5.50];
    backGroundMuisc.currentTime = song[randomMinMax(1,song.length) - 1] * 60;
    backGroundMuisc.volume = 0.3;
    //genera enemigo
    generadorEnemigo();
    //crea player
    app.player = new Guerrero("Conan","player",120,10,7,1);
    app.player.use();
    
    await delay(1000);
    draw()
}

//Bucle que llama el renderizado de los objetos
async function draw(){
    if(!app.pause){
        //delay 
        await delay(90);
        clearTimeout(app.timeOut);
        //limpia el lienzo
        app.clearCanvas();
        //Renderiza cada enemigo 
        for(const enemy of app.enemigos){
            if(!enemy.destroyed){
                enemy.render()
            }
            
        }
        //Renderiza El Jugadar
        app.player.render();

        //render Items
        for(const item of app.items){
            if(!item.isDone)
                item.render();
        }

        //LLama al siguiente frame
        window.requestAnimationFrame(draw);
    }else{
        app.pantalla = drawPausa();
        app.pantalla.render();
    }
    
}

//linten for key
addEventListener("keydown", (key) => {
    app.keys.unshift(key.code);
    if(!app.pause){
        app.player?.use()
    }
});

addEventListener("keyup",async(e)=>{
    if(e.code === "KeyD" || e.code === "KeyA"){
        app.player.animacion = app.player.animaciones[app.player.animacionDefault];
    }
});

main();
//inica el programa

export {app,draw}