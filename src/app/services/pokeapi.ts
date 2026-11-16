import { Injectable } from '@angular/core';
import { Movimiento } from '../models/movimiento';
import { Pokemon } from '../models/pokemon';
import { MoveResponse, PokemonResponse, TypeResponse } from '../models/respuestas';
import { Tipo } from '../models/tipo';
import { limpiarNombre } from '../utils/entrada';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private readonly base = 'https://pokeapi.co/api/v2';

 
  private readonly cache = new Map<string, unknown>();

  
  public async getPokemon(entrada: string): Promise<Pokemon> {
    const clave = limpiarNombre(entrada);
    const datos = await this.pedir<PokemonResponse>('pokemon', clave);

    return {
      id: datos.id,
      nombre: datos.name,
      tipos: datos.types.map(item => item.type.name),
      imagen: datos.sprites.front_default,
      vida: this.valorEstadistica(datos, 'hp'),
      ataque: this.valorEstadistica(datos, 'attack'),
      defensa: this.valorEstadistica(datos, 'defense'),
      movimientos: datos.moves.map(item => item.move.name)
    };
  }

  public async getMovimiento(nombre: string): Promise<Movimiento> {
    const datos = await this.pedir<MoveResponse>('move', nombre);

    return {
      nombre: datos.name.replaceAll('-', ' '),
      poder: datos.power ?? 0, 
      tipo: datos.type.name
    };
  }

  
  public async getTipo(nombre: string): Promise<Tipo> {
    const datos = await this.pedir<TypeResponse>('type', nombre);

    return {
      nombre: datos.name,
      dobleDanio: datos.damage_relations.double_damage_to.map(item => item.name),
      mitadDanio: datos.damage_relations.half_damage_to.map(item => item.name),
      sinDanio: datos.damage_relations.no_damage_to.map(item => item.name)
    };
  }

 
  public async getMovimientosAtaque(pokemon: Pokemon, cantidad = 4): Promise<Movimiento[]> {
    const ataques: Movimiento[] = [];
    const lote = 8;

    for (let i = 0; i < pokemon.movimientos.length && ataques.length < cantidad; i += lote) {
      const nombres = pokemon.movimientos.slice(i, i + lote);
      
        const resultados = await Promise.allSettled(
          nombres.map(nombre => this.getMovimiento(nombre))
        );

        const movimientos = resultados
          .filter(resultado => resultado.status === 'fulfilled')
          .map(resultado => resultado.value);


      for (const movimiento of movimientos) {
        if (movimiento.poder > 0 && ataques.length < cantidad) {
          ataques.push(movimiento);
        }
      }
    }

    return ataques;
  }

  
  private valorEstadistica(datos: PokemonResponse, nombre: string): number {
    const estadistica = datos.stats.find(item => item.stat.name === nombre);
    return estadistica ? estadistica.base_stat : 1;
  }

 
  private async pedir<T>(recurso: string, clave: string): Promise<T> {
    const ruta = `${recurso}/${clave}`;

    const guardado = this.cache.get(ruta);
    if (guardado) {
      return guardado as T;
    }

    let respuesta: Response;
    try {
      respuesta = await fetch(`${this.base}/${ruta}/`);
    } catch {
      throw new Error('No fue posible conectar con PokéAPI. Revisa tu conexión.');
    }

    if (respuesta.status === 404) {
      throw new Error(
        recurso === 'pokemon' ? 'No existe ese Pokémon.' : 'No se encontró el recurso solicitado.'
      );
    }

    if (!respuesta.ok) {
      throw new Error('No fue posible consultar PokéAPI. Intenta de nuevo.');
    }

    const datos = (await respuesta.json()) as T;
    this.cache.set(ruta, datos);
    return datos;
  }
}
