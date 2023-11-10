import { Screens } from "../class/views/Screens.js";
import { drawText } from "../class/views/Text.js";
import { drawRect } from "../class/views/Rect.js";
import { app } from "../main.js";
import { draw } from "../main.js";

class Muerte extends Screens {
    constructor(){
        super()
  
        this.content =[
            drawRect(0,0,app.width,app.height,{color:"#0a0e1ab5"}),
            drawText("Has Muerto",{color:"brown",fontSize:90,fontFamily:"PatrickHand",roundRadius:25,})
        ];
     
    }

}

function drawMuerte(){
    return new Muerte();
}

export {drawMuerte};