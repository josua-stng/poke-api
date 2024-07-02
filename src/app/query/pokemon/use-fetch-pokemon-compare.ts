import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function usePokemonCompare(pokemon_name: string | null) {
  const { data, isPending } = useQuery({
    queryKey: ['pokemon-detail', pokemon_name],
    queryFn: async () => {
      const pokemonDetailResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`
      );
      return pokemonDetailResponse.data;
    },
  });
  return {
    data,
    isPending,
  };
}
