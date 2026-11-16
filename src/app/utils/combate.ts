import { Tipo } from '../models/tipo';


export function calcularEfectividad(tipoAtaque: Tipo, tiposDefensor: string[]): number {
  let efectividad = 1;

  for (const tipo of tiposDefensor) {
    if (tipoAtaque.sinDanio.includes(tipo)) {
      efectividad = efectividad * 0;
    } else if (tipoAtaque.dobleDanio.includes(tipo)) {
      efectividad = efectividad * 2;
    } else if (tipoAtaque.mitadDanio.includes(tipo)) {
      efectividad = efectividad * 0.5;
    }
  }

  return efectividad;
}


export function calcularDanio(
  poder: number,
  ataque: number,
  defensa: number,
  efectividad: number
): number {
  if (efectividad === 0) {
    return 0;
  }

  const danio = Math.round(((poder * (ataque / Math.max(defensa, 1))) / 5) * efectividad);
  return Math.max(1, danio);
}


export function describirEfectividad(efectividad: number): string {
  if (efectividad === 0) {
    return 'No afecta al rival.';
  }
  if (efectividad > 1) {
    return '¡Es muy efectivo!';
  }
  if (efectividad < 1) {
    return 'No es muy efectivo.';
  }
  return '';
}
