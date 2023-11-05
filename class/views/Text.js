class Text{
    constructor(text,app,{color,fontSize,x,y}){
        this.text = text;
        this.color = color||"white";
        this.fontSize = fontSize || 20;
        this.ctx = app.context; 
        
        this.textlength = this.fontSize* this.text.length;
        this.x = x || (app.width/2 - this.textlength/2);
        this.y = y || (app.height/2 + this.fontSize/2);

    }

    render(){
        this.ctx.fillStyle = "#000000c6";
        this.ctx.fillRect(this.x - 20,this.y - this.fontSize-10,this.textlength/1.5,this.fontSize + 20);
        

        this.ctx.fillStyle = this.color;
        this.ctx.font = `${this.fontSize}pt Arial`
        this.ctx.fillText(this.text, this.x, this.y);
    }
}

function drawText(text,app,{color,fontSize,x,y}){
    return new Text(text,app,{color,fontSize,x,y});
}

export {drawText};