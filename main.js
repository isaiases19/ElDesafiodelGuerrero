const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const app = {
    FPS:60,
    width:1080,
    height:1080,
    clearCanvas:()=>{
        canvas.width = app.width;
        canvas.height = app.height;
    }
}; 

function init(){
    const text = "Pess Any Key";
    const textSpase = (text.length) * 20;
    app.clearCanvas();
    ctx.fillStyle = "#fff";
    ctx.font = "20pt Arial";
    ctx.fillText(text,(app.width/2) - textSpase/2.5, app.height/2 );
}


function setUp(){
    setInterval(update,app.FPS);
}


function update(){
    app.clearCanvas();
}

init();
document.addEventListener("keydown",(e)=>{
    switch(e.keyCode){
        case 32:
            setUp();
            break;
    }
})