
import { update} from "../../main.js";
class Controller{
 
    use(app,guerrero,enemigo){
        let opcion = 0;
        let press = 0;
        const ataques = { "KeyZ": 1, "KeyX": 2, "KeyC": 3,"KeyQ":4,"KeyE":5,"KeyR":6};
        
        //linten for key
        addEventListener("keyup", (e) => {
            opcion = ataques[e.code];
            if ((app.turno  % 2) === 1 && opcion > 0 &&  (opcion <= guerrero.ataques.length) && press ===0) {
                press = 1;
                let powerUp = guerrero.armas.item.powerUps[0];
                app.messageColor = '#64f177';
                app.message = guerrero.realizarAtaque(opcion, enemigo,powerUp);
                update();
            }
            if(((app.turno  % 2) === 1) && (opcion >= guerrero.ataques.length) && (opcion <= (guerrero.ataques.length + guerrero.inventario.length))&& press === 0){
                let newArma =guerrero.inventario[(opcion - guerrero.ataques.length) - 1].name
                guerrero.elegirArma(newArma);
                this.use(app,guerrero,enemigo);
            }
           
        });

        addEventListener("keypress",(e)=>{
            const keys = {
                "KeyD": ()=>{
                    guerrero.x = guerrero.x +guerrero.velocidad;
                    guerrero.animacion= guerrero.animaciones["caminarR"];
                    guerrero.animacionDefault = guerrero.animaciones["parado"];
                 },
                "KeyA":()=>{
                    guerrero.x =guerrero.x - guerrero.velocidad;
                    guerrero.animacion = guerrero.animaciones["caminarL"]
                    guerrero.animacionDefault = guerrero.animaciones["paradoL"];
                }
            }
            keys[e.code]();
        })

    }
    
}

function getcontroller(){
    return new Controller();
}

export {getcontroller}