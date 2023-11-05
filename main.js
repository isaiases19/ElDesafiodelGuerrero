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
    setInterval(update,5000/app.FPS);
}


let arena = drawArena(app)
const guerrero = new Guerrero("Conan",0,0,0,0);
const enemigo = new Enemigo("Troll",0,20,3,2);
function update(){
    app.clearCanvas()
 
    let enemigoMSG = enemigo.realizarAtaque(guerrero);
    let guerreroMSG = guerrero.ataqueBasico(enemigo);
    
    drawVida(enemigo,guerrero);
    drawText(enemigoMSG,app,{color:"brown",x:150}).render(app.context)
    setTimeout(()=>{
        app.clearCanvas()
        drawText(guerreroMSG,app,{color:"#2f6742",x:150}).render(app.context);
        drawVida(enemigo,guerrero);
    },3000);
    
}   

init();


function drawVida(enemigo,guerrero){
    drawText(`${guerrero.nombre} ${guerrero.vida}💖`,app,{x:50,y:app.height - 50}).render(app.context);
    drawText(`${enemigo.nombre} ${enemigo.vida}💖`,app,{x:app.width - 150,y:50}).render(app.context);
}



document.addEventListener("keydown",(e)=>{
    switch(e.keyCode){
        case 32:
            setUp();
            break;
    }
})