import { app } from "../../main.js";
class Controller{
    use(key){
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

                    
                    app.player.animaciones = newArma.item.animacion;
                    app.player.rangoAtaque= newArma.item.rango;

                    //arama velocidad
                    let [Pataque1,Pataque2] = app.player.ataques;
                    let {ataque1,ataque2} = newArma.item.velicidad;
                        Pataque1.counDown = ataque1;
                        Pataque1.count = ataque1;
                        Pataque2.counDown = ataque2;
                        Pataque2.count = ataque2;

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
                    if(app.player.x < app.backgroundImage.width*.4 && app.player.x > -app.backgroundImage.width*.4){
                        app.translate -= app.player.velocidad;
                    }
                }
            },
            {key:"KeyA",name:"Izquierda",accion:async()=>{
                    app.player.x =app.player.x - app.player.velocidad;
                    app.player.animacion = app.player.animaciones["caminarL"];
                    app.player.animacionDefault = "paradoL";
                    if(app.player.x < app.backgroundImage.width*.4 && app.player.x > -app.backgroundImage.width*.4){
                        app.translate += app.player.velocidad;
                    }
                }
            },
            {key:"Escape",name:"Pause",accion:()=>{
                app.pause? app.pause = false : app.pause = true;
               
            }},
            {key:"KeyG",name:"posion1",accion:()=>{
                app.player.posiones[0]?.use(0);
            }},
            {key:"KeyH",name:"posion2",accion:()=>{
                app.player.posiones[1]?.use(1);
            }},
        ];
    
            if(!app.pause && app.appStart && !app.player.muerto){
                poweUpIndex = app.player.armas.item.powerUps.findIndex((powerUp)=> powerUp.enUso === true);
                acciones.find(accion=> accion.key === key.code)?.accion();
            }
    }
}





export {Controller}