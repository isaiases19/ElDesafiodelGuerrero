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
            drawText("PAUSED",{fontSize:50,fontFamily:"PatrickHand",roundRadius:25})
        ];
        app.keys.unshift("");
        this.bucle = setInterval(this.lisien,340);
    }

    lisien(){
      
        if(app.pause){
            let accions = [
                {key:"Escape",name:"Start", accion:()=>{
                        app.pause = false;
                        app.keys.unshift("")
                        draw()
                        clearInterval(this.bucle);
                    }
                }
            ]
               
            accions.find(ops=> ops.key === app.keys[0])?.accion()
           
        }
    }
   
}

function drawPausa(){
    return new Pausa();
}

export {drawPausa};