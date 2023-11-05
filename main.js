import { drawInicio } from "./screens/Inicio.js";
import {drawArena} from "./screens/arena.js"
import { Guerrero } from "./class/Guerrero.js";
import { Enemigo } from "./class/Enemigo.js";
import { drawText } from "./class/views/Text.js";
const canvas = document.querySelector("canvas");
const app = {
    FPS:1,
    width:1080,
    height:1080,
    context:canvas.getContext("2d"),
    clearCanvas:()=>{
        canvas.width = app.width;
        canvas.height = app.height;
    }
};


function init(){
   drawInicio(app).render()
}


function setUp(){
    setInterval(update,2000/app.FPS);
}


let arena = drawArena(app)
const guerrero = new Guerrero("Conan",0,0,0,0);
const enemigo = new Enemigo("Troll",0,20,3,2);
function update(){
    arena.render()
    arena.update()
    enemigo.ataqueBasico(guerrero);
    guerrero.ataqueBasico(enemigo);

    arena.content.push(drawText(`${guerrero.nombre} ${guerrero.vida}💖`,app,{x:50,y:app.height - 50}))
        (drawText(`${enemigo.nombre} ${enemigo.vida}💖`,app,{x:app.width - 150,y:50}))
}

init();
document.addEventListener("keydown",(e)=>{
    switch(e.keyCode){
        case 32:
            setUp();
            break;
    }
})