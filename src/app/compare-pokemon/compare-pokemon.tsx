'use client';
import Image from 'next/image';
import usePokemonCompare from '../query/pokemon/use-fetch-pokemon-compare';
import LoadingSkeletonPokemonCompare from '../loading-skeleton/loading-skeleton-compare-pokemon';

type statsPokemon = {
  stat: {
    name: string;
  };
  base_stat: number;
};

type propsPokemonDetail = {
  pokemon_name: string | null;
};

export default function ComparePokemon({ pokemon_name }: propsPokemonDetail) {
  const { data: pokemon_detail, isPending } = usePokemonCompare(pokemon_name);

  if (isPending) {
    return <LoadingSkeletonPokemonCompare />;
  }

  return (
    <main className="font-mono border border-gray-400  md:w-[380px] w-[320px] mx-auto rounded-md">
      <div className="relative w-full h-[200px]">
        <Image
          className="bg-gray-200 rounded-md object-cover"
          alt="pokemon_compare_image"
          src={pokemon_detail.sprites.front_default}
          layout="fill"
          objectFit="cover"
          sizes="10"
          priority={true}
        />
      </div>
      <div className="p-5">
        <h4 className="mb-2 font-bold text-lg text-center">{pokemon_name}</h4>
        <p className="text-center">
          Types Pokemon:{' '}
          <span className="font-semibold">
            {pokemon_detail.types[0].type.name}
          </span>
        </p>
        <ul className="list-disc px-6 mt-2 flex flex-col mx-auto justify-center items-center w-full">
          {pokemon_detail.stats.map((stat: statsPokemon, idx: number) => (
            <li key={idx} className="w-full ml-5">
              <div className="text-justify ">
                <p>
                  {stat.stat.name}:{' '}
                  <span className="font-semibold">{stat.base_stat}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
