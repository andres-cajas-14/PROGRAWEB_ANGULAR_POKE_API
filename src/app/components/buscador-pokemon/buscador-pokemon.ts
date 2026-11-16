import { Component, inject, input, output, signal } from '@angular/core';
import { Luchador } from '../../models/luchador';
import { PokeapiService } from '../../services/pokeapi';

@Component({
  selector: 'app-buscador-pokemon',
  templateUrl: './buscador-pokemon.html',
  styleUrl: './buscador-pokemon.css'
})
export class BuscadorPokemon {
  private readonly servicio = inject(PokeapiService);

  
  public etiqueta = input.required<string>();

  
  public elegido = output<Luchador>();

  
  public cargando = signal(false);
  public error = signal('');

  public async buscar(texto: string): Promise<void> {
    if (this.cargando()) {
      return;
    }

    this.error.set('');
    this.cargando.set(true);

    try {
      const pokemon = await this.servicio.getPokemon(texto);
      const movimientos = await this.servicio.getMovimientosAtaque(pokemon);

      if (movimientos.length === 0) {
        throw new Error('Este Pokémon no tiene movimientos de ataque. Prueba con otro.');
      }

      this.elegido.emit({ pokemon, movimientos });
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'No fue posible consultar.');
    } finally {
      this.cargando.set(false);
    }
  }
}
