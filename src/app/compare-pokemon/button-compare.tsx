'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import usePokemonList from '../query/pokemon/use-fetch-pokemon-list';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ButtonCompare({
  pokemon_name,
}: {
  pokemon_name: string;
}) {
  const { data: pokemon_name_compare } = usePokemonList();
  const [isCompare, setIsCompare] = useState(false);
  const [pokemonName, setPokemonName] = useState('');
  const router = useRouter();

  const handleChange = (event: any) => {
    const newAge = event.target.value;
    setPokemonName(newAge);
    router.push(`/${pokemon_name}?compare=${newAge}`);
  };

  const searchParams = useSearchParams();
  const hasCompareParams = searchParams.has('compare');

  const handleCancelCompare = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('compare') || pokemonName || !pokemonName) {
      urlParams.delete('compare');
      router.replace(`/${pokemon_name}`);
      setIsCompare(false);
    }
  };
  return (
    <div>
      {isCompare || hasCompareParams ? (
        <Box sx={{ minWidth: 120 }}>
          <div className="flex gap-2 justify-center md:justify-normal">
            <FormControl style={{ minWidth: 110 }}>
              <InputLabel id="demo-simple-select-label">Pokemon</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pokemonName}
                label="Pokemon"
                onChange={handleChange}
              >
                {pokemon_name_compare?.map(
                  (pokemon: { name: string }, idx: number) => {
                    return (
                      <MenuItem key={idx} value={pokemon.name}>
                        {pokemon.name}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
            <button
              onClick={handleCancelCompare}
              className="rounded-md text-red-500 font-semibold hover:text-red-600 hover:font-bold text-lg "
            >
              Cancel
            </button>
          </div>
        </Box>
      ) : (
        <button
          className="bg-blue-700 text-white px-3 py-3 rounded-md md:ml-2 hover:bg-blue-800 w-full md:w-max"
          onClick={() => {
            setIsCompare(true);
          }}
        >
          Compare
        </button>
      )}
    </div>
  );
}
