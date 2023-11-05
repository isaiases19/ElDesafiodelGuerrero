import { Screens } from "../class/views/Screens.js";
import { drawText } from "../class/views/Text.js";
class Inicio extends Screens {
    constructor(app){
        super(app)
        this.content =[
            drawText("Press Any Key",app,{})
        ];
    }
}

function drawInicio(app){
    return new Inicio(app);
}

export {drawInicio};