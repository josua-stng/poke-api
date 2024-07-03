'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoadingSkeletonSavePokemon from '../loading-skeleton/loading-skeleton-save-pokemon';
import NotAvailablePokemon from './not-available-pokemon';

type Pokemon = {
  title: string;
  image: string;
  type: string;
};

export default function MyPokemon() {
  const [savePokemon, setSavePokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedPokemonFromStorage = localStorage.getItem('pokemon') || '[]';
    setSavePokemon(JSON.parse(savedPokemonFromStorage));
    setIsLoading(false);
  }, []);

  const handleDelete = (title: string) => {
    const updatedPokemon = savePokemon.filter(
      (pokemon) => pokemon.title !== title
    );
    setSavePokemon(updatedPokemon);
    localStorage.setItem('pokemon', JSON.stringify(updatedPokemon));
  };

  const isSavedPokemonNotAvailable = !isLoading && savePokemon.length === 0;

  return (
    <div>
      {isLoading ? (
        <LoadingSkeletonSavePokemon />
      ) : isSavedPokemonNotAvailable ? (
        <NotAvailablePokemon />
      ) : (
        <main>
          <h1 className="text-center font-bold mt-5 mb-5 text-2xl font-sans">
            Saved Pokemon
          </h1>
          <div className="grid justify-center mx-auto sm:grid-cols-2 sm:max-w-xl lg:grid-cols-3 lg:max-w-4xl xl:grid-cols-4 xl:max-w-6xl gap-5  p-5 ">
            {savePokemon.map((pokemon, idx: number) => {
              return (
                <main
                  key={idx}
                  className="border border-gray-400 max-w-xl w-[250px]"
                >
                  <div className="relative w-full h-[180px]">
                    <Image
                      className="bg-gray-200 rounded-md object-cover"
                      alt="pokemon-image-saved"
                      src={pokemon.image}
                      layout="fill"
                      objectFit="cover"
                      sizes="10"
                      priority={true}
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-center text-lg font-bold">
                      {pokemon.title}
                    </p>
                    <p className="mt-2 text-center">
                      Type Pokemon:
                      <span className="font-semibold"> {pokemon.type}</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center px-2 pb-5 space-x-2">
                    <button
                      onClick={() => handleDelete(pokemon.title)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md"
                    >
                      Delete
                    </button>
                    <Link
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1.5 rounded-md"
                      href={`/${pokemon.title}`}
                    >
                      See Detail
                    </Link>
                  </div>
                </main>
              );
            })}
          </div>
        </main>
      )}
    </div>
  );
}
