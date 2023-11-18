const animacionArma1 = {
    parado: { sx: 0, sy: 455, size: 64, len: 1, scale: .66 },
    golpear: { sx: 0, sy: 970, size: 64, len: 6, scale: .66 },
    recibirR: { sx: 0, sy: 200, size: 64, len: 7, scale: .66 },
    recibirL: { sx: 0, sy: 72, size: 64, len: 7, scale: .66 },
    espada2R: { sx: 0, sy: 968, size: 64, len: 6, scale: .66 },
    espada1R: { sx: 0, sy: 457, size: 64, len: 8, scale: .66 },
    tajo: { sx: 0, sy: 1223, size: 64, len: 13, scale: .66 },
    morir: { sx: 0, sy: 1287, size: 64, len: 10, scale: .66 },
    muerto: { sx: 323, sy: 1290, size: 64, len: 1, scale: .66 },
    caminarR: { sx: 0, sy: 712, size: 64, len: 8, scale: .66 },
    caminarL: { sx: 0, sy: 583, size: 64, len: 8, scale: .66 },
    paradoL: { sx: 513, sy: 584, size: 64, len: 1, scale: .66 },
    espada1L: { sx: 0, sy: 328, size: 64, len: 8, scale: .66 },
    espada2L: { sx: 0, sy: 840, size: 64, len: 6, scale: .66 },
}

const baseLongSword = {
   
    
    recibirL:{sx:64,sy:67,size:64,margin:0,len:4,scale:.66},
    recibirR:{sx:64,sy:195,size:64,margin:0,len:4,scale:.66},
    espada1L: { sx: 0, sy: 3077, size: 193, margin: 0, len: 6, scale: 2 },
    espada1R: { sx: 0, sy: 3461, size: 193, margin: 0, len: 6, scale: 2 },
    espada2R: { sx: 0, sy: 1927, size: 193, margin: 0, len: 6, scale: 2 },
    espada2L: { sx: 0, sy: 1542, size: 193, margin: 0, len: 6, scale: 2 },

    muerto: { sx: 320, sy: 1280, size: 64, margin: 0, len: 1, scale: .66 },
    morir: { sx: 0, sy: 1280, size: 64, margin: 0, len: 6, scale: .66 },
    caminarR: { sx: 0, sy: 710, size: 64, margin: 0, len: 8, scale: .66 },
    caminarL: { sx: 0, sy: 582, size: 64, margin: 0, len: 8, scale: .66 },
    parado: { sx: 0, sy: 710, size: 64, margin: 0, len: 1, scale: .66 },
    paradoL: { sx: 0, sy: 582, size: 64, margin: 0, len: 1, scale: .66 }
}

export { animacionArma1, baseLongSword }