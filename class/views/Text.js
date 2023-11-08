var f = await new FontFace('PatrickHand', 'url(../../../styles/PatrickHand.ttf)').load();
document.fonts.add(f);
import { app } from "../../main.js";
class Text{
    constructor(text,{x,y,color,fontSize,fontFamily,roundBk}){
        this.text = text;
        this.color = color||"white";
        this.fontSize = fontSize || 20;
        this.fontFamily =fontFamily || "PatrickHand";
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

        let lines = this.text.split('\n')
        let lineLn = lines.reduce((anterio,actual)=> anterio > actual ? anterio:actual,"");
        this.textlength = this.roundBk? (this.fontSize) * lineLn.length: this.textlength; 
        lines.forEach((line)=> {
            this.roundBk? this.drawRoundRect():this.drawRect(); 
            this.ctx.fillStyle = this.color;
            this.ctx.fillText(line.trim(), this.x, this.y);
            this.y += this.roundBk? this.fontSize*1.75: this.fontSize*1.49;
            
        });

       
    }

    drawRect(){
        this.ctx.fillStyle = "#000000ff";
        this.ctx.fillRect((this.x - this.textlength/1.8),(this.y - this.fontSize*0.8),this.textlength*1.1 ,(this.fontSize*1.5));
    }

    drawRoundRect(){
        this.ctx.fillStyle = "#000000ff";
        this.ctx.beginPath();
        this.ctx.roundRect((this.x - this.textlength/3),(this.y - this.fontSize*0.8),this.textlength*.65 ,(this.fontSize*1.5),this.fontSize*.5);
        this.ctx.fill();
    }

    
}

function drawText(text,{color,fontSize,fontFamily,x,y,roundBk}){
    return new Text(text,{color,fontSize,fontFamily,x,y,roundBk});
}

export {drawText};