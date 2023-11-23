import { app } from "../main.js";
import { drawText } from "../class/views/Text.js";
import { drawRect } from "../class/views/Rect.js";
import { Screens } from "../class/views/Screens.js";
class Inicio extends Screens {
    constructor(){
        super()
        this.content =[
            drawRect(0,0,app.width,app.height,{color:"#13090991"}),
            drawText("Press Space\n To Start ",{fontSize:50,fontFamily:"PatrickHand"})
        ];
        this.bucle = setInterval(this.lisien,340);
    }
    lisien(){
        
        if (!app.appStart){
       

            let accions = [
                {key:"Space",name:"Start", accion:()=>{
                        const satrt = new Audio("/sounds/click.mp3");
                        satrt.play()
                        app.setup();
                        app.appStart = true;
                        clearInterval(this.bucle);
                    }
                }
            ]
               
            accions.find(ops=> ops.key === app.keys[0])?.accion()
      
        }
    }
}

function drawInicio(){
    return new Inicio();
}

export {drawInicio};