import { drawInicio } from "./screens/Inicio.js";
import { Guerrero } from "./class/Guerrero.js";
import { Enemigo } from "./class/Enemigo.js";
import { drawText } from "./class/views/Text.js";
import { drawSprite } from "./class/views/Image.js";
const canvas = document.querySelector("canvas");
const backGroundMuisc = new Audio("/sounds/background.mp3");

const app = {
    FPS:1,
    width:1080,
    height:1080,
    context:canvas.getContext("2d"),
    turno: 0,
    appStart: false,
    clearCanvas:()=>{
        canvas.width = app.width;
        canvas.height = app.height;
    }
};


async function init(){

   drawInicio(app).render()
  
}
const guerrero = new Guerrero("Conan",0,0,0,0);
const enemigo = new Enemigo("Troll",0,20,3,2);


function setUp(){
    backGroundMuisc.loop = true;
    backGroundMuisc.play()
    backGroundMuisc.volume = 0.3;
    app.turno = guerrero.velocidad > enemigo.velocidad ? 1:2;
    ejecutarTurno();
}
function turnoEnemigo(){
    app.clearCanvas();
    update(enemigo.realizarAtaque(guerrero),"#e33030");
}

function turnoGuerrero(){
    let opcion= 0;
    let ataque = {"KeyZ":1,"KeyX":2,"KeyC":3};
  
    drawText("[Z]Estocada [X]Corte Feroz [C]Tajo Desgarrador",app,{color:"#ffffff",x:app.width*.1,y:app.height*.90,fontSize:30}).render()
    //linten for key
    addEventListener("keyup",(e)=>{
        opcion = ataque[e.code];
        if(app.turno === 1 && opcion > 0){
            update(guerrero.realizarAtaque(opcion,enemigo),"#64f177");
        }
    });
   
   
}


async function update(MSG,color){
    app.clearCanvas()
    if(enemigo.muerto){
        app.turno = 0;
        guerrero.playSound("/sounds/success.mp3");
        drawText(`🎉${guerrero.nombre.toUpperCase()} ah vencido!!🎉`,app,{color:"#64f177",x:130, fontSize:50}).render()
        return
    }if(guerrero.muerto){
        app.turno = 0;
        guerrero.playSound("/sounds/failure.mp3");
        drawText(`Hazido vencido por ${enemigo.nombre.toUpperCase()}!!`,app,{color:"#e33030",x:100, fontSize:50}).render()
        return
    }

    drawVida(enemigo,guerrero);
    drawText(MSG,app,{color,x:app.width*.1,y:app.height*.70,fontSize:22}).render()
    drawSprite("/img/warrior01.png",app,70,56,{}).render(); 
    app.turno = app.turno === 1 ? 2:1;
    await delay(3000);
    ejecutarTurno()
}   

function ejecutarTurno(){
    if(app.turno === 1){
        turnoGuerrero()
    }else{
        turnoEnemigo()
    }
}


init();


function drawVida(enemigo,guerrero){
    drawText(`${guerrero.nombre} ${guerrero.vida}💖`,app,{x:100,y:app.height*.50,fontSize:30}).render();
    drawText(`${enemigo.nombre} ${enemigo.vida}💖`,app,{x:app.width*.80 ,y:app.height*.50,fontSize:30}).render();
}

async function delay(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }


const satrt = new Audio("/sounds/click.mp3");  
document.addEventListener("keyup",(e)=>{
    let accions = {"Space":()=>{
        app.clearCanvas()
        satrt.play()
        setUp();
        app.appStart = true;
    }}
    
    if(!app.appStart)
        accions[e.code]()
})