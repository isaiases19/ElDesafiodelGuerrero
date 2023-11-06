import { drawText } from "../views/Text.js";
import { update } from "../../main.js";
import { drawVida } from "../../utility/utility.js";

class Controller{
    constructor(){
       
    }

    use(app,guerrero,enemigo){
        let opcion = 0;
        const ataques = { "KeyZ": 1, "KeyX": 2, "KeyC": 3,"KeyA":4,"KeyS":5,"KeyD":6};
        const espdasTeclas = ["A","S","D"];
        const inventario = guerrero.inventario.map((items,i)=>{
            if(guerrero.armas.name === items.name && i <3)
                return` [${espdasTeclas[i]}] ${items.name} ✅ ` 
            else if(i<3){ 
                return` [${espdasTeclas[i]}] ${items.name} `
            }
        
        }).join(" \n ");
        drawVida(app,enemigo,guerrero);
        drawText("Inventario \n"+inventario,app,{color:"orange",x:app.width*.5,y:app.height*.3}).render()
        drawText(" [ Z ] [ X ] [ C ] \n Estocada | Corte Feroz | Tajo Desgarrador ", app, { color: "#ffffff", x: app.width * .5, y: app.height * .878, fontSize: 35 }).render()
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