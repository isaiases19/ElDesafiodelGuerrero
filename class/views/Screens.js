class Screens{
    constructor(width,height,context,content){
        this.width = width;
        this.height = height;

        this.ctx = context;
        this.content = content;
    }

    render(){
        for(let c of this.content){
            c.render();
        }
    }
}

export {Screens};