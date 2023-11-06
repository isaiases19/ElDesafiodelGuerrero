import { drawText } from "../views/Text.js";
import { update } from "../../main.js";
import { drawInvetarios, drawVida } from "../../utility/utility.js";

class Controller{
    constructor(){
       
    }

    use(app,guerrero,enemigo){
        let opcion = 0;
        const ataques = { "KeyZ": 1, "KeyX": 2, "KeyC": 3,"KeyA":4,"KeyS":5,"KeyD":6};
        
        
        drawVida(app,enemigo,guerrero);
        drawInvetarios(app,enemigo,guerrero);
        drawText(" [ Z ] [ X ] [ C ] \n Estocada | Corte Feroz | Tajo Desgarrador ", app, { color: "#ffffff", x: app.width *.5, y: app.height *.93, fontSize: 35 }).render()
        //linten for key
        addEventListener("keyup", (e) => {
            opcion = ataques[e.code];
            if ((app.turno  % 2) === 1 && opcion > 0 &&  opcion <= guerrero.ataques.length) {
                let powerUp = guerrero.armas.item.powerUps[0];
                update(guerrero.realizarAtaque(opcion, enemigo,powerUp), "#64f177");
            }
            if(((app.turno  % 2) === 1) && (opcion >= guerrero.ataques.length) && (opcion <= (guerrero.ataques.length + guerrero.inventario.length))){
                let newArma =guerrero.inventario[(opcion - guerrero.ataques.length) - 1].name
                guerrero.elegirArma(newArma);
                app.clearCanvas();
                this.use(app,guerrero,enemigo);
            }
        });
    }
    
}

function getcontroller(){
    return new Controller();
}

export {getcontroller}