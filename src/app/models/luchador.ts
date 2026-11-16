import { Movimiento } from './movimiento';
import { Pokemon } from './pokemon';


export interface Luchador {
  pokemon: Pokemon;
  movimientos: Movimiento[];
}
