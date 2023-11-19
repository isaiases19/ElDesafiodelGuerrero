import { app } from "../main.js";
class Posion{
    constructor(give,sx,sy){
        this.give =give;
        this.sx = sx;
        this.sy = sy;
        //image
        this.sprite = new Image();
        this.sprite.src = "/img/itemsSprite/tilemap_packed.png";
    }

    use(id){
           //calcula el total
           const totalGive = app.player.vida + (app.player.vidabase*this.give);
           ///Si se pasa de la vidaBase restale la diferencia 
           app.player.vida =  totalGive <= app.player.vidabase ? totalGive: (totalGive - (totalGive % app.player.vidabase));
        //delete cuando se use
           app.player.posiones.splice(id,1);
    }
}


export { Posion}