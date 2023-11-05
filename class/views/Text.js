class Text{
    constructor(text,app,{color,fontSize,x,y}){
        this.text = text;
        this.color = color||"white";
        this.fontSize = fontSize || 20;
        
        this.textlength = this.fontSize* this.text.length;
        this.x = x || (app.width/2 - this.textlength/2);
        this.y = y || (app.height/2);

    }

    render(ctx){
        ctx.fillStyle = this.color;
        ctx.font = `${this.fontSize}pt Arial`
        ctx.fillText(this.text, this.x, this.y);
    }
}

function drawText(text,app,{color,fontSize,x,y}){
    return new Text(text,app,{color,fontSize,x,y});
}

export {drawText};