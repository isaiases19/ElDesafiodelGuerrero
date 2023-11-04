import { Enemigo } from "./class/Enemigo";
import { Guerrero } from "./class/Guerrero";
function main(){

    const guerrero = new Guerrero("Conan",0,0,0,0);
    const enemigo = new Enemigo("Troll",0,20,3,2);
    
    enemigo.ataqueBasico(guerrero);
    guerrero.ataqueDefinitivo(enemigo);

}
//inicializacion
main();