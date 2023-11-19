import { Screens } from "../class/views/Screens.js";
import { drawText } from "../class/views/Text.js";
import { drawRect } from "../class/views/Rect.js";
import { app } from "../main.js";
import { draw } from "../main.js";

class Pausa extends Screens {
    constructor(){
        super()
  
        this.content =[
            drawRect(0,0,app.width,app.height,{color:"#0a0e1ab5"}),
            drawText("PAUSED",{fontSize:50,fontFamily:"PatrickHand",roundRadius:25}),
            drawText(`Music:${app.music.muted? "🔇":"🔊"} `,{y:app.height/1.8,fontSize:30,fontFamily:"PatrickHand"})
        ];
        app.keys.unshift("");
        
    }

    lisien(e){
    
            let accions = [
                {key:"Escape",name:"Start", accion:()=>{
                        app.pause = false;
                        app.keys.unshift("")
                        draw()
                        clearInterval(this.bucle);
                    }
                },
                {key:"KeyM",name:"Music Mute",accion:()=>{
                    app.music.muted = app.music.muted? false:true;
                    localStorage.setItem("musicMuted", app.music.muted);
                    app.keys.unshift("")
                    app.context.clearRect(app.width/1.95,app.height/1.86,50,35);
                    drawRect(app.width/1.95,app.height/1.86,50,35,{color:"#0a0e1ab5"}).render()
                    drawText(`Music:${app.music.muted? "🔇":"🔊"} `,{y:app.height/1.8,fontSize:30,fontFamily:"PatrickHand"}).render()
                   
                }}
            ]
       
            accions.find(ops=> ops.key === e.code)?.accion(this)
        }
}

function drawPausa(){
    return new Pausa();
}

export {drawPausa};