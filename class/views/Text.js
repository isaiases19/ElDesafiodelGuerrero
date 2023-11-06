class Text{
    constructor(text,app,{color,fontSize,fontFamily,x,y,roundBk}){
        this.text = text;
        this.color = color||"white";
        this.fontSize = fontSize || 20;
        this.fontFamily =fontFamily || "Arial";
        this.ctx = app.context; 
        
        this.textlength = (this.fontSize) * this.text.length ;
        this.x = x || (app.width/2);
        this.y = y || (app.height/2);
        this.roundBk = roundBk || false;

    }

    render(){
        
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.font = `${this.fontSize}pt ${this.fontFamily}`;

        this.text.split('\n').forEach((line)=> {
            this.roundBk? this.drawRoundRect():this.drawRect();
            this.ctx.fillStyle = this.color;
            this.ctx.fillText(line, this.x, this.y);
            this.y += this.fontSize*1.793;
            
        });

       
    }

    drawRect(){
        this.ctx.fillStyle = "#000000c9";
        this.ctx.fillRect(this.x - this.textlength*.33,this.y - this.fontSize + this.fontSize*0.1,this.textlength/1.5,this.fontSize*1.8,20);
    }

    drawRoundRect(){
        this.ctx.fillStyle = "#000000c9";
        this.ctx.beginPath();
        this.ctx.roundRect(this.x - this.textlength*.33,this.y - this.fontSize + this.fontSize*0.1,this.textlength/1.5,this.fontSize*1.8,20);
        this.ctx.fill();
    }

    
}

function drawText(text,app,{color,fontSize,fontFamily,x,y,roundBk}){
    return new Text(text,app,{color,fontSize,fontFamily,x,y,roundBk});
}

export {drawText};