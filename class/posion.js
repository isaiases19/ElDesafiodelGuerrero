import { app } from "../main.js";
class Posion{
    constructor(give,sx,sy){
        this.give =give;
        this.sx = sx;
        this.sy = sy;
        //image
        this.sprite = new Image();
        this.sprite.src = "/img/tilemap_packed.png";
    }

    use(id){
           //calcula el total
           const totalGive = app.player.vida + (app.player.vidabase*this.give);
           ///Si se pasa de la vidaBase restale la diferencia 
           app.player.vida =  totalGive <= app.player.vidabase ? totalGive: (totalGive - parseInt(-(app.player.vidabase -  totalGive)));
        //delete cuando se use
           app.player.posiones.splice(id,1);
    }
}


export { Posion}