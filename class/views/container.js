class Container{
    constructor(x,y){
        this.x =x;
        this.y = y;
        this.contents = [];
    }

    render(){
        for(let content of this.contents){
            content.render();
        }
    }
}



class playerInfo extends Container{
    constructor(){
        
    }
}