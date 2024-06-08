import React from 'react';
import Searchbar from './Searchbar';

export default function Autocomplete() {
  return (
    <div className="h-fit">
      <header className="">
        <h1 className="text-2xl font-bold text-center">Introduisez votre adresse</h1>
        <Searchbar />
      </header>
    </div>
  );
}

