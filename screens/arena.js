import { Screens } from "../class/views/Screens.js";
import { drawText } from "../class/views/Text.js";
class Arena extends Screens {
    constructor(app){
        super(app)
        this.content =[];
    }
}

function drawArena(app){
    return new Arena(app);
}

export {drawArena};