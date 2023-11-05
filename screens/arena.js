import { Screens } from "../class/views/Screens.js";
import { drawText } from "../class/views/Text.js";
class Arena extends Screens {
    constructor(app){
        super(app)
        this.content =[];
    }

    update(){
        if(this.content.length > 0){
            setTimeout(()=>{
                this.content.splice(0,1);
            },500);
        }
        this.content.map((text,index)=> index > 1)
    }
}

function drawArena(app){
    return new Arena(app);
}

export {drawArena};