import { Component, computed, inject, signal } from '@angular/core';
import { Luchador } from '../../models/luchador';
import { Movimiento } from '../../models/movimiento';
import { PokeapiService } from '../../services/pokeapi';
import { calcularDanio, calcularEfectividad, describirEfectividad } from '../../utils/combate';
import { BuscadorPokemon } from '../buscador-pokemon/buscador-pokemon';
import { TarjetaPokemon } from '../tarjeta-pokemon/tarjeta-pokemon';

@Component({
  selector: 'app-batalla',
  imports: [BuscadorPokemon, TarjetaPokemon],
  templateUrl: './batalla.html',
  styleUrl: './batalla.css'
})
export class Batalla {
  private readonly servicio = inject(PokeapiService);

  
  public jugador = signal<Luchador | null>(null);
  public rival = signal<Luchador | null>(null);
  public vidaJugador = signal(0);
  public vidaRival = signal(0);

  
  public registro = signal<string[]>([]);
  public ganador = signal('');
  public turnoEnCurso = signal(false);
  public aviso = signal('');

  
  
  public puedeAtacar = computed(() =>
    this.jugador() !== null &&
    this.rival() !== null &&
    this.ganador() === '' &&
    !this.turnoEnCurso()
  );

  
  public elegirJugador(luchador: Luchador): void {
    this.jugador.set(luchador);
    this.reiniciar();
  }

  public elegirRival(luchador: Luchador): void {
    this.rival.set(luchador);
    this.reiniciar();
  }

  
  public reiniciar(): void {
    this.vidaJugador.set(this.jugador()?.pokemon.vida ?? 0);
    this.vidaRival.set(this.rival()?.pokemon.vida ?? 0);
    this.registro.set([]);
    this.ganador.set('');
    this.aviso.set('');
  }

  
  public async atacar(movimiento: Movimiento): Promise<void> {
    const yo = this.jugador();
    const otro = this.rival();

    if (!yo || !otro || !this.puedeAtacar()) {
      return;
    }

    this.turnoEnCurso.set(true);
    this.aviso.set('');

    try {
      
      const danioJugador = await this.ejecutarAtaque(yo, otro, movimiento);
      this.vidaRival.update(vida => Math.max(0, vida - danioJugador));

      if (this.vidaRival() === 0) {
        this.ganador.set(yo.pokemon.nombre);
        return;
      }

      
      const posicion = Math.floor(Math.random() * otro.movimientos.length);
      const danioRival = await this.ejecutarAtaque(otro, yo, otro.movimientos[posicion]);
      this.vidaJugador.update(vida => Math.max(0, vida - danioRival));

      if (this.vidaJugador() === 0) {
        this.ganador.set(otro.pokemon.nombre);
      }
    } catch {
      this.aviso.set('No fue posible calcular el ataque. Intenta de nuevo.');
    } finally {
      this.turnoEnCurso.set(false);
    }
  }

 
  private async ejecutarAtaque(
    atacante: Luchador,
    defensor: Luchador,
    movimiento: Movimiento
  ): Promise<number> {
    
    const tipoAtaque = await this.servicio.getTipo(movimiento.tipo);
    const efectividad = calcularEfectividad(tipoAtaque, defensor.pokemon.tipos);

    const danio = calcularDanio(
      movimiento.poder,
      atacante.pokemon.ataque,
      defensor.pokemon.defensa,
      efectividad
    );

    const comentario = describirEfectividad(efectividad);
    const linea =
      `${atacante.pokemon.nombre} usó ${movimiento.nombre}. ` +
      (comentario ? comentario + ' ' : '') +
      `Hizo ${danio} de daño.`;

    this.registro.update(lista => [...lista, linea]);
    return danio;
  }
}
