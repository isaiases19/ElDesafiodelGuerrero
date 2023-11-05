import { Enemigo } from "./class/Enemigo.js";
import { Guerrero } from "./class/Guerrero.js";
import read from "readline"

const readline = require('read');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

function main(){



    
    const guerrero = new Guerrero("Conan",0,0,0,0);
    const enemigo = new Enemigo("Troll",0,200,3,2);
    
   mostrarMenu(guerrero,enemigo);

}

function mostrarMenu(guerrero,enemigo) {
    console.log('Elige un ataque:');
    console.log('1. Ataque Básico');
    console.log('2. Ataque Especial');
    console.log('3. Ataque Definitivo');

    rl.question('Opción: ', (opcion) => {
      guerrero.realizarAtaque(opcion,enemigo);
      if (enemigo.vida > 0) {
        mostrarMenu(); // Muestra el menú nuevamente si el enemigo sigue vivo
      } else {
        rl.close();
      }
    });
  }

//inicializacion
main();