var f = await new FontFace('PatrickHand', 'url(../../../styles/PatrickHand.ttf)').load();
document.fonts.add(f);
import { app } from "../../main.js";
import { drawRect } from "./Rect.js";
class Text{
    constructor(text,{x,y,color,fontSize,fontFamily,roundRadius,bgColor,style}){
        this.text = text;
        this.color = color||"white";
        this.style = style || '';
        this.fontSize = fontSize || 20;
        this.fontFamily =fontFamily || "PatrickHand";
        this.bgColor = bgColor || "#00000000";
        this.ctx = app.context; 
        
        this.textlength = (this.fontSize) * this.text.length ;
        this.x = x || (-app.translate + app.width/2);
        this.y = y || (-app.translate + app.height/2);
        this.roundRadius = roundRadius || 0;


    }

    render(){
        
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.font = `${this.style} ${this.fontSize}pt ${this.fontFamily}`;

        let lines = this.text.split('\n')
        let lineLn = lines.reduce((anterio,actual)=> anterio > actual ? anterio:actual,"");
        this.textlength =  (this.fontSize) * lineLn.length; 
        lines.forEach((line)=> {
            drawRect((this.x - this.textlength/3),(this.y - this.fontSize),this.textlength*.65 ,(this.fontSize*2),{color:this.bgColor,roundRadius:this.roundRadius}).render();
            this.ctx.fillStyle = this.color;
            this.ctx.fillText(line, this.x, this.y);
            this.y += this.fontSize*2.2;
            
        });

       
    }

  
    
}

function drawText(text,{color,fontSize,fontFamily,x,y,roundRadius,bgColor,style}){
    return new Text(text,{color,fontSize,fontFamily,x,y,roundRadius,bgColor,style});
}

export {drawText};