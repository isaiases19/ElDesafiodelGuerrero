import { Screens } from "../class/views/Screens.js";
import { drawText } from "../class/views/Text.js";
class Inicio extends Screens {
    constructor(app){
        super(app)
        this.app =app;
        this.content =[
            drawText("Press Space To Start",{fontSize:50,fontFamily:"PatrickHand",roundBk:true})
        ];
        this.actilizar()
    }
    actilizar(){
        const satrt = new Audio("/sounds/click.mp3");
        addEventListener("keyup", (e) => {
            let accions = {
                "Space": () => {
                    this.app.clearCanvas();
                    satrt.play()
                    this.app.setup();
                    this.app.appStart = true;
                }
            }
            if (!this.app.appStart)
            accions[e.code]()
        })
    }
}

function drawInicio(app){
    return new Inicio(app);
}

export {drawInicio};