class Text{
    constructor(text,x,y,fontSize){
        this.text = text;
        this.fontSize = fontSize;
        this.x = x;
        this.y = y;

        this.textlength = fontSize* text.length;
    }

    render(ctx){
        ctx.fillStyle = "#fff";
        ctx.font = `${this.fontSize}pt Arial`
        ctx.fillText(this.text, this.x, this.y);
    }
}