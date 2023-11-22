import { delay, randomMinMax } from "./utility/utility.js";
import { drawInicio } from "./screens/Inicio.js";
import { drawPausa } from "./screens/pausa.js";
import { Guerrero } from "./class/Guerrero.js";
import { drawRect } from "./class/views/Rect.js";
import { drawSprite } from "./class/views/Image.js";
import { getSpawn } from "./utility/spawn.js";


const canvas = document.querySelector("canvas");

const app = {
    context: canvas.getContext("2d"),
    width: 1080,
    height: 1080,
    translate:0,
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
    music:new Audio("/sounds/music.wav"),
    backgroundImage: new Image(),
    setup,
    clearCanvas: () => {
        canvas.width = app.width;
        canvas.height = app.height;
    },
};


async function main() {
 
    app.clearCanvas();
    app.pantalla = drawInicio()
    app.pantalla.render()
}

async function setup() {
    //configura musica
    app.music.loop = true;
    app.music.play()
    const musicMuted = localStorage.getItem("musicMuted");
    app.music.muted = musicMuted === "false"? false: true;
    const song = [0,1.38,3.04,4.30];
    //app.music.currentTime = song[randomMinMax(1,song.length) - 1] * 60;
    app.music.volume = 0.3;
    //genera enemigo
    getSpawn(app.width,35,200,randomMinMax(1,4),"troll",3).spawn()
    getSpawn(-app.width,35,200,randomMinMax(1,4),"troll",3).spawn()

    getSpawn(app.width*3,60,200,randomMinMax(5,10),"troll",2).spawn()
    getSpawn(-app.width*3,60,200,randomMinMax(5,10),"troll",2).spawn()

    getSpawn(app.width*6,60*2,200,randomMinMax(11,15),"Orc",1).spawn()
    getSpawn(-app.width*6,60*2,200,randomMinMax(11,15),"Orc",1).spawn()

    getSpawn(app.width*8,60*3,200,randomMinMax(16,20),"minotaur",1).spawn()
    getSpawn(-app.width*8,60*3,200,randomMinMax(16,20),"minotaur",1).spawn()
    //crea player
    app.player = new Guerrero("Conan","player",120,10,7,1);
    await delay(1000);
    draw()
}

//Bucle que llama el renderizado de los objetos

app.backgroundImage.src ="/img/backgrondoPreRender.jpg";
async function draw(){
    if(!app.pause){
        //delay 
        await delay(90);
        clearTimeout(app.timeOut);
        //limpia el lienzo
        app.clearCanvas();
        
        app.context.translate(app.translate,0);
        
        drawSprite(app.backgroundImage,app.backgroundImage.width,app.height,{x:0,y:0}).render()
         

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
         //Gradient para que todo tenga el mismo colorAmbient
         var grd=app.context.createLinearGradient(0,0,app.width/2,app.height);
         grd.addColorStop(0,"#29141a55");
         grd.addColorStop(1,"#0f0f1a55");
        drawRect(-app.translate,0,app.width,app.height,{color:grd}).render()
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
    }else if(app.pause){
        app.pantalla.lisien(key)
    }
    if(app.player.muerto){
        app.pantalla.lisien(key);
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