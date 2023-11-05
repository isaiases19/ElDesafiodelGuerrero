class Screens{
    constructor(app){
        this.app = app;
        this.ctx = app.context;
        this.content= [];
    }

    render(){
        this.app.clearCanvas();
        for(let c of this.content){
            c.render(this.ctx);
        }
    }
}

export {Screens};