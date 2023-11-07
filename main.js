import { drawInicio } from "./screens/Inicio.js";
import { Guerrero } from "./class/Guerrero.js";
import { Enemigo } from "./class/Enemigo.js";
import { drawText } from "./class/views/Text.js";
import { randomMinMax, drawVida,delay,ejecutarTurno, drawInvetarios,speakText, generadorEnemigo} from "./utility/utility.js";

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
    timeOutTurno: 3,
    gameOver: false,
    message:"",
    messageColor:"white",
    clearCanvas: () => {
        canvas.width = app.width;
        canvas.height = app.height;
        
    }
};
const guerrero = new Guerrero("Conan", "player", 100,40, 6);
let enemigo = new Enemigo("Troll", "enemy",randomMinMax(50,90) ,randomMinMax(3,7) ,randomMinMax(3,7));

async function main() {
    drawInicio(app).render()
    const satrt = new Audio("/sounds/click.mp3");
    addEventListener("keyup", (e) => {
        let accions = {
            "Space": () => {
                app.clearCanvas();
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
    ejecutarTurno(app,guerrero.velocidad > enemigo.velocidad ? 1 : 2,guerrero,enemigo);
    draw()
}

async function update() {
    
    if (enemigo.muerto || guerrero.muerto) {
        app.gameOver = true;
        app.turno = 0;
        const url = enemigo.vida < guerrero.vida ?  "/sounds/success.mp3":"/sounds/failure.mp3";
        guerrero.playSound(url);
    }else{
        if(document.querySelector("#voz").checked){
            speakText(app.message);
        }
        app.timeOutTurno = setTimeout(()=> {ejecutarTurno(app,app.turno + 1,guerrero,enemigo)},2000);
        
    }
}

async function draw(){
    app.clearCanvas(); 
   
    guerrero.render(app);
    enemigo.render(app);
    drawUI()
    await delay(app,90)
    clearTimeout(app.timeOut);
    
    window.requestAnimationFrame(draw);
}

function drawUI(){
    drawInvetarios(app,enemigo,guerrero);
    drawVida(app,enemigo, guerrero);
    drawText(app.message, app, { color:app.messageColor, x: app.width * .5, y: app.height *.03, fontSize: 40,fontFamily:"PatrickHand",roundBk:true }).render();

    if((app.turno  % 2) === 1){
        drawText(" [ Z ] [ X ] \n Ataque basico | Ataque Especial |", app, { color: "#ffffff", x: app.width *.5, y: app.height *.93, fontSize: 35 }).render()
    }
    if (enemigo.muerto || guerrero.muerto) {
        enemigo.vida < guerrero.vida ? drawText(` 🎉${guerrero.nombre} a vencido!!🎉 `, app, { color: "#64f177", fontSize: 50,fontFamily:"PatrickHand" ,roundBk:true}).render() : drawText(` Has sido vencido por ${enemigo.nombre}!! `, app, { color: "#e33030", fontSize: 50,fontFamily:"PatrickHand",roundBk:true }).render();
  
 
    }

}

main();

 // Rellenar el menú desplegable con las voces disponibles
 function populateVoiceList() {
    const voiceSelect = document.querySelector("#voiceSelect");
    const voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';

    voices.forEach(voice => {
      if (["es-ES","es-MX","es-DO"].includes(voice.lang)) {
        const option = document.createElement("option");
        option.textContent = voice.name;
        option.setAttribute('data-voice', voice.name);
        option.value = voice.name;
        voiceSelect.appendChild(option);
      }
    });

  }

  if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = (!app.appStart ? populateVoiceList:(e)=>{});
  }

export {update,drawUI}