import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/pokemons");
        setPokemons(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (pokemons.length === 0) {
      fetchData();
    }
  }, [pokemons]);

  return (
    <PokemonContext.Provider value={pokemons}>
      {children}
    </PokemonContext.Provider>
  );
};