import { app } from "../../main.js";
import { delay } from "../../utility/utility.js";

class Controller{
    use(){
        let poweUpIndex;
        //Teclas * Aciones
        const acciones = [
            {key:"KeyQ",name:"Ataque Basico",accion:()=>{
                    app.player.realizarAtaque("Ataque Basico");
            }},
            {key:"KeyE",name:"Ataque Especial",accion:()=>{
                    app.player.realizarAtaque("Ataque Especial");
                }
            },
            {key:"KeyF", name:"Otra Arma",accion:()=>{
                    const newArma = app.player.inventario[(app.player.armas.id + 1)% app.player.inventario.length];
                    app.player.elegirArma(newArma.name);
                }
            },
            {key:"KeyR", name:"Cambio de PowerUp",accion:()=>{
                    app.player.armas.item.powerUps[poweUpIndex].enUso = false;
                    app.player.armas.item.powerUps[((poweUpIndex + 1) % app.player.armas.item.powerUps.length)].enUso = true;
                }
            },
            {key:"KeyD",name:"Derecha",accion:async ()=>{
                    app.player.x = app.player.x +app.player.velocidad;
                    app.player.animacion = app.player.animaciones["caminarR"];
                    app.player.animacionDefault = "parado";
                }
            },
            {key:"KeyA",name:"Izquierda",accion:async()=>{
                    app.player.x =app.player.x - app.player.velocidad;
                    app.player.animacion = app.player.animaciones["caminarL"];
                    app.player.animacionDefault = "paradoL";
                }
            },
            {key:"Escape",name:"Pause",accion:()=>{
                app.pause? app.pause = false : app.pause = true;
            }}
        ];
        
        //linten for key
        addEventListener("keydown", (e) => {
            poweUpIndex = app.player.armas.item.powerUps.findIndex((powerUp)=> powerUp.enUso === true);
            if (app.appStart && !app.player.muerto && !app.pause){
                acciones.find(accion=> accion.key === e.code)?.accion();
            }
            if(app.pause){
                
            }
               
        });

        addEventListener("keyup",async(e)=>{
            if(e.code === "KeyD" || e.code === "KeyA"){
                app.player.animacion = app.player.animaciones[app.player.animacionDefault];
            }
           
        })
    }
}

function getcontroller(){
    return new Controller();
}

export {getcontroller}