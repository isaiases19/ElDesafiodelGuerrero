class Text{
    constructor(text,color="#fff",x = null,y = null ,fontSize){
        this.text = text;
        this.color = color;
        this.fontSize = fontSize;
        this.x = x || (app.width/2 - this.textlength/2);
        this.y = y || (app.height/2);

        this.textlength = fontSize* text.length;
    }

    render(ctx){
        ctx.fillStyle = this.color;
        ctx.font = `${this.fontSize}pt Arial`
        ctx.fillText(this.text, this.x, this.y);
    }
}