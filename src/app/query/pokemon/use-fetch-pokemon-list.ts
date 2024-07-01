import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function usePokemonList() {
  const { data, isPending } = useQuery({
    queryKey: ['list pokemon'],
    queryFn: async () => {
      const pokemonListResponse = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=50&offset=50'
      );
      return pokemonListResponse.data.results;
    },
  });
  return {
    data,
    isPending,
  };
}
