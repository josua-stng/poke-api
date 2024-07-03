import Image from 'next/image';
import ButtonCompare from '../compare-pokemon/button-compare';
import PokemonSaveButton from './pokemon-save-button';

type statsPokemon = {
  stat: {
    name: string;
  };
  base_stat: number;
};

type propsPokemonDetail = {
  pokemon_name: string;
  pokemon_image: string;
  pokemon_type: string;
  pokemon_stats: statsPokemon[];
};

export default function PokemonDetail({
  pokemon_name,
  pokemon_image,
  pokemon_type,
  pokemon_stats,
}: propsPokemonDetail) {
  return (
    <main
      className="font-mono border border-gray-400 
        md:w-[380px] w-[320px] mx-auto rounded-md"
    >
      <div className="relative w-full h-[200px]">
        <Image
          className="bg-gray-200 rounded-md object-cover"
          alt="pokemon_detail_image"
          src={pokemon_image}
          layout="fill"
          objectFit="cover"
          sizes="10"
          priority={true}
        />
      </div>
      <div className="p-5">
        <h4 className="mb-2 font-bold text-lg text-center">{pokemon_name}</h4>
        <p className="text-center">
          Types Pokemon: <span className="font-semibold">{pokemon_type}</span>
        </p>
        <ul className="list-disc px-6 mt-2 flex flex-col mx-auto justify-center items-center w-full">
          {pokemon_stats.map((stat, idx) => (
            <li key={idx} className="w-full">
              <div className="text-justify ">
                <p>
                  {stat.stat.name}:{' '}
                  <span className="font-semibold">{stat.base_stat}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 md:flex justify-center items-center md:space-x-5 space-y-2 md:space-y-0">
          <ButtonCompare pokemon_name={pokemon_name} />
          <PokemonSaveButton
            pokemon_name={pokemon_name}
            pokemon_image={pokemon_image}
            pokemon_type={pokemon_type}
          />
        </div>
      </div>
    </main>
  );
}
