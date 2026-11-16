
export interface Pokemon {
  id: number;
  nombre: string;
  tipos: string[];
  imagen: string | null;
  vida: number;
  ataque: number;
  defensa: number;
  movimientos: string[]; 
}
