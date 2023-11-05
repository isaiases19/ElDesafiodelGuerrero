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
const guerrero = new Guerrero("Conan",0,0,0,0);
const enemigo = new Enemigo("Troll",0,20,3,2);

let delayC;
function delay(func,time){
    delayC = setTimeout(func,2000);
}

function setUp(){
    if(guerrero.velocidad > enemigo.velocidad){
        delay(turnoGuerrero,1000)
    }else{
        turnoEnemigo();
    }
}
function turnoEnemigo(){
    app.clearCanvas();
    let enemigoMSG = enemigo.realizarAtaque(guerrero);
    update(enemigoMSG,"brown")
    delay(turnoGuerrero,3000);
}

function turnoGuerrero(){
    app.clearCanvas();
    drawText("[Z]Estocada [X]Corte Feroz [C]Tajo Desgarrador",app,{color:"#64aaf1",x:100,fontSize:30}).render()
    document.addEventListener("keyup",(e)=>{
        let ataque = 0;
        
        switch(e.code){
            case "KeyZ":
                ataque = 1;
                break;
            case "KeyX":
                ataque = 2;
                break;
            case "KeyC":
                ataque = 3;
                break;

        }

        if(ataque !== 0){
            document.removeEventListener("keyup",(e)=>{});
            let guerreroMSG = guerrero.realizarAtaque(ataque,enemigo);
            update(guerreroMSG,"#2f6742");
            ataque = 0;
            delay(turnoEnemigo,3000);
        }
      
    })
   
}


function update(MSG,color){
    if(enemigo.muerto){
        clearTimeout(delayC);
        drawText("🎉El Guerrero ah vencido!!🎉",app,{color:"#64f177",x:250, fontSize:50}).render()
    }if(guerrero.muerto){
        clearTimeout(delayC);
        drawText(`Hazido vencido por ${enemigo.nombre.toUperCase()}!!`,app,{color:"brown",x:250, fontSize:50}).render()
    }

    app.clearCanvas()
    drawVida(enemigo,guerrero);
    drawText(MSG,app,{color,x:150}).render()
   
}   
init();


function drawVida(enemigo,guerrero){
    drawText(`${guerrero.nombre} ${guerrero.vida}💖`,app,{x:50,y:app.height - 50}).render();
    drawText(`${enemigo.nombre} ${enemigo.vida}💖`,app,{x:app.width - 150,y:50}).render();
}



document.addEventListener("keyup",(e)=>{
    switch(e.code){
        case "Space":
            setUp();
            break;
    }
})