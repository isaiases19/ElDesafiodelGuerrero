class Screens{
    constructor(){
        this.content= [];
    }
    actilizar(){

    }
    render(){
        this.actilizar()
        for(let c of this.content){
            c.render();
        }
    }
}

export {Screens};