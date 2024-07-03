'use client';
import usePokemonDetail from '../query/pokemon/use-fetch-pokemon-detail';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PokemonDetail from './pokemon_detail';
import { useRouter, useSearchParams } from 'next/navigation';
import ComparePokemon from '../compare-pokemon/compare-pokemon';
import LoadingSkeletonPokemonDetail from '../loading-skeleton/loading-skeleton-pokemon-detail';

type slug = {
  params: {
    slug: string;
  };
};

export default function PokemonDetailPage({ params: { slug } }: slug) {
  const searchParams = useSearchParams();
  const paramsCompare = searchParams.get('compare');
  const router = useRouter();
  const { data: pokemon_detail, isPending: loading } = usePokemonDetail(slug);
  if (loading) {
    return <LoadingSkeletonPokemonDetail />;
  }

  return (
    <main>
      <div
        className="flex items-center m-3 gap-2 bg-gray-300 w-max px-3 py-1.5 rounded-md border border-gray-400 hover:bg-gray-400 hover:text-white cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <KeyboardBackspaceIcon />
        <p>Back</p>
      </div>
      <div className="md:flex justify-center   max-w-5xl space-y-5 md:space-y-0  mx-auto">
        <PokemonDetail
          pokemon_name={slug}
          pokemon_image={pokemon_detail.sprites.front_default}
          pokemon_type={pokemon_detail.types[0].type.name}
          pokemon_stats={pokemon_detail.stats}
        />
        {paramsCompare ? <ComparePokemon pokemon_name={paramsCompare} /> : null}
      </div>
    </main>
  );
}
