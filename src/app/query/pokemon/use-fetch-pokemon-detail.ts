import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function usePokemonDetail(pokemon_name: string) {
  const { data, isPending } = useQuery({
    queryKey: ['pokemon-detail'],
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
