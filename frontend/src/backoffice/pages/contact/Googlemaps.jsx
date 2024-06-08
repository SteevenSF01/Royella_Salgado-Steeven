// src/App.js
import React from 'react';
import Searchbar from './Searchbar';

export default function Autocomplete() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-2xl font-bold">Introduisez votre adresse</h1>
        <Searchbar />
      </header>
    </div>
  );
}

