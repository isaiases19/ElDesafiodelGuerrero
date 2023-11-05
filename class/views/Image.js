class Sprite{
    constructor(src,app,w,h,{x,y,sx,sy,sw,sh}){
        this.sprite = new Image();
        this.sprite.src =src;
        
        this.x = x || (app.width/2 - w/2);
        this.y = y || (app.height/2 - h/2);
        
        this.w =w;
        this.h =h;

        this.sx = sx || 0;
        this.sy = sy || 0;
        this.sw = sw || w;
        this.sh = sh || h;

        this.app = app;
    }

    render(){     
        this.app.context.drawImage(this.sprite,this.sx,this.sy,this.sw,this.sh,this.x,this.y,this.w, this.h);
    }
}


function drawSprite(src,app,w,h,{x,y,sx,sy,sw,sh}){
    return new Sprite(src,app,w,h,{x,y,sx,sy,sw,sh});
}

export {drawSprite};