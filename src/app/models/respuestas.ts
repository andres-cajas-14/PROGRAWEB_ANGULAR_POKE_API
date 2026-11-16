

export interface PokemonResponse {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string | null };
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
}

export interface MoveResponse {
  name: string;
  power: number | null;
  type: { name: string };
}

export interface TypeResponse {
  name: string;
  damage_relations: {
    double_damage_to: { name: string }[];
    half_damage_to: { name: string }[];
    no_damage_to: { name: string }[];
  };
}
