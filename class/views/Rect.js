import { app } from "../../main.js";

class Rect{
    constructor(x,y,w,h,{color,roundRadius}){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color || "#000000";
        this.radius = roundRadius || 0;
        this.ctx = app.context;
    }

    render(){
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.roundRect(this.x,this.y,this.w,this.h,this.radius);
        this.ctx.fill();
    }
}

function drawRect(x,y,w,h,{color,roundRadius}){
    return new Rect(x,y,w,h,{color,roundRadius});
}

export { drawRect};