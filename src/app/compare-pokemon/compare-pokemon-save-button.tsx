'use client';
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

type propsPokemonSave = {
  pokemon_name: string | null;
  pokemon_image: string;
  pokemon_type: string;
};

export default function PokemonCompareSaveButton({
  pokemon_name,
  pokemon_image,
  pokemon_type,
}: propsPokemonSave) {
  const [openSnackBar, setSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarSeverity, setSnackBarSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const handleSnackBar = (message: string, severity: 'success' | 'error') => {
    if (openSnackBar) {
      setSnackBar(false);
      setTimeout(() => {
        setSnackBarMessage(message);
        setSnackBarSeverity(severity);
        setSnackBar(true);
      }, 100);
    } else {
      setSnackBarMessage(message);
      setSnackBarSeverity(severity);
      setSnackBar(true);
    }
  };

  const handleClose = () => {
    setSnackBar(false);
  };

  const handleSavePokemon = () => {
    const savePokemon = {
      title: pokemon_name,
      image: pokemon_image,
      type: pokemon_type,
    };
    const currentSavePokemon = JSON.parse(
      localStorage.getItem('pokemon') || '[]'
    );
    const pokemonAlreadySaved = currentSavePokemon.some(
      (savedPokemon: { title: string }) =>
        savedPokemon.title === savePokemon.title
    );
    if (pokemonAlreadySaved) {
      handleSnackBar('Pokemon already saved', 'error');
      return;
    }
    const updatedSavePokemon = [...currentSavePokemon, savePokemon];
    localStorage.setItem('pokemon', JSON.stringify(updatedSavePokemon));
    handleSnackBar('Pokemon saved', 'success');
  };
  return (
    <div className="text-center">
      <button
        onClick={handleSavePokemon}
        className="bg-green-700 text-white px-2 py-3 rounded-md md:ml-2 hover:bg-green-800 w-full md:w-max mt-5 text-center"
      >
        Save Pokemon
      </button>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarSeverity}
          sx={{ width: '100%' }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
