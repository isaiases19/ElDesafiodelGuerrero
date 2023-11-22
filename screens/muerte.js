import { Screens } from "../class/views/Screens.js";
import { drawText } from "../class/views/Text.js";
import { drawRect } from "../class/views/Rect.js";
import { app } from "../main.js";
import { draw } from "../main.js";

class Muerte extends Screens {
    constructor(){
        super()
  
        this.content =[
            drawRect(-app.translate,0,app.width,app.height,{color:"#0a0e1ab5"}),
            drawText("Has Muerto",{x:-app.translate + app.width/2,y:app.height/2,color:"brown",fontSize:90,fontFamily:"PatrickHand",roundRadius:25,}),
            drawText("Press Space To Restart",{fontSize:30,x:-app.translate + app.width/2,y: app.height/1.5})
        ];
     
    }

    lisien(e){
        let accions = [
            {key:"Space",name:"Restart", accion:()=>{
                    app.keys.unshift("")
                    app.enemigos = [];
                    app.translate = 0;
                    app.setup()
                    clearInterval(this.bucle);
                }
            }
        ]
        accions.find(ops=> ops.key === e.code)?.accion(this)
    }

}

function drawMuerte(){
    return new Muerte();
}

export {drawMuerte};