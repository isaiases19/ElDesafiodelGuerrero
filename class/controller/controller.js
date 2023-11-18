import { app } from "../../main.js";
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

                    app.player.sprite.src=newArma.item.sprite
                    app.player.animaciones = newArma.item.animacion;
                    app.player.rangoAtaque= newArma.item.rango;
                }
            },
            {key:"KeyR", name:"Cambio de PowerUp",accion:()=>{
                    app.player.armas.item.powerUps[poweUpIndex].enUso = false;
                    app.player.armas.item.powerUps[((poweUpIndex + 1) % app.player.armas.item.powerUps.length)].enUso = true;
                }
            },
            {key:"KeyD",name:"Derecha",accion:async ()=>{
                    app.player.x = app.player.x + app.player.velocidad;
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
               
            }},
            {key:"Digit1",name:"posion1",accion:()=>{
                app.player.posiones[0]?.use(0);
            }},
            {key:"Digit2",name:"posion2",accion:()=>{
                app.player.posiones[1]?.use(1);
            }},
        ];
    
            if(!app.pause && app.appStart && !app.player.muerto){
                poweUpIndex = app.player.armas.item.powerUps.findIndex((powerUp)=> powerUp.enUso === true);
                acciones.find(accion=> accion.key === app.keys[0])?.accion();
            }
    }
}



function getcontroller(){
    return new Controller();
}

export {getcontroller}