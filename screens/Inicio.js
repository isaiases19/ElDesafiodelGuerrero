import { Screens } from "../class/views/Screens.js";
import { drawText } from "../class/views/Text.js";
class Inicio extends Screens {
    constructor(app){
        super(app)
        this.content =[
            drawText("Press Space To Start",app,{fontSize:50,fontFamily:"Impact"})
        ];
    }
}

function drawInicio(app){
    return new Inicio(app);
}

export {drawInicio};