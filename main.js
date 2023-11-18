import { delay, generadorEnemigo, randomMinMax } from "./utility/utility.js";
import { drawInicio } from "./screens/Inicio.js";
import { drawPausa } from "./screens/pausa.js";
import { Guerrero } from "./class/Guerrero.js";

const canvas = document.querySelector("canvas");

const app = {
    context: canvas.getContext("2d"),
    width: 1080,
    height: 1080,
    turno: 0,
    timeOut: 5,
    gameOver: false,
    appStart: false,
    pause:false,
    keys: [],
    pantalla: {},
    player:{},
    enemigos:[],
    items:[],
    music:new Audio("/sounds/background.mp3"),
    setup,
    clearCanvas: () => {
        canvas.width = app.width;
        canvas.height = app.height;
    },
};


async function main() {
    const bgs = ["./img/backColi.jpg","./img/fondo.png","./img/arenaPx.jpg","./img/bulkhead.png","/img/bg.jpg"];
    canvas.style.backgroundImage =`Url(${bgs[randomMinMax(1,bgs.length)-1]})`;
    app.clearCanvas();
    app.pantalla = drawInicio()
    app.pantalla.render()
}

async function setup() {
    //configura musica
    app.music.loop = true;
    app.music.play()
    const song = [0.16,1.55,3.19,3.45,4.51,5.50];
    app.music.currentTime = song[randomMinMax(1,song.length) - 1] * 60;
    app.music.volume = 0.3;
    //genera enemigo
    generadorEnemigo();
    //crea player
    app.player = new Guerrero("Conan","player",120,10,7,1);
    
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
        app.player.controller?.use(key)
    }else{
        app.pantalla.lisien(key)
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