class Screens{
    constructor(){
        this.content= [];
    }
  
    render(){
      
        for(let c of this.content){
            c.render();
        }
    }
}

export {Screens};