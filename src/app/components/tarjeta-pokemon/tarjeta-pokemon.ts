import { Component, computed, input } from '@angular/core';
import { Luchador } from '../../models/luchador';

@Component({
  selector: 'app-tarjeta-pokemon',
  templateUrl: './tarjeta-pokemon.html',
  styleUrl: './tarjeta-pokemon.css'
})
export class TarjetaPokemon {
  
  public luchador = input.required<Luchador>();
  public vida = input.required<number>();

  
  public claseTipo = computed(() => 'tipo-' + (this.luchador().pokemon.tipos[0] ?? 'normal'));
}