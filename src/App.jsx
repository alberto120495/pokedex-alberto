import { useEffect, useState } from "react";
import "./App.css";
import Pokemon from "./components/Pokemon";

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [busquedaPokemon, setBusquedaPokemon] = useState("")

 
  useEffect(() => {
    const fetchPokemones = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await response.json();
      const { results } = data;

      const pokemonesDetalles = await Promise.all(
        results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const poke = await response.json();
          return {
            id: poke.id,
            name: poke.name,
            image: poke.sprites.front_default,
            height: poke.height,
            weight: poke.weight,
            types: poke.types.map((t) => t.type.name),
            abilities: poke.abilities.map((a) => a.ability.name),
          };
        })
      );

      setPokemones(pokemonesDetalles);
    };

    fetchPokemones();
  }, []);

  const typeColor = {
    fire: "#f08030",
    water: "#6890f0",
    grass: "#78c850",
    electric: "#f8d030",
    psychic: "#f85888",
    ice: "#98d8d8",
    dragon: "#7038f8",
    dark: "#705848",
    fairy: "#ee99ac",
    normal: "#a8a878",
    bug: "#a8b820",
    ground: "#e0c068",
    poison: "#a040a0",
    flying: "#a890f0",
    fighting: "#c03028",
    rock: "#b8a038",
    ghost: "#705898",
    steel: "#b8b8d0",
  };

  const pokemonesFiltrados = pokemones.filter((p) =>{
  return p.name.toLowerCase().includes(busquedaPokemon)
  }
    
  );




  return (
    <>
      <h1 className="titulo">POKÉDEX</h1>

      <Pokemon />


      <h2>Welcome to the Pokedex</h2>
      <p>Find your favorite Pokémon!</p>

      <input 
      className="busqueda" 
      type="text" 
      placeholder="Busca a tu pokemon"
      value={busquedaPokemon}
      onChange={(e) => setBusquedaPokemon(e.target.value.toLowerCase()) }
      />
    



     {pokemones.length === 0 ? (
  <p className="loading">Loading...</p>
) : (
  <div className="container">
    {pokemonesFiltrados.length > 0 ? (

      pokemonesFiltrados.map((pokemon) => (
        <div
          className="card"
          key={pokemon.id}
          style={{
            backgroundColor: typeColor[pokemon.types[0]] || "#f5f5f5",
          }}
        >
          <h3>
            {pokemon.name} (#{pokemon.id})
          </h3>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>Height: {pokemon.height / 10} m</p>
          <p>Weight: {pokemon.weight / 10} kg</p>
          <p>Type(s): {pokemon.types.join(", ")}</p>
          <p>Abilities: {pokemon.abilities.join(", ")}</p>
        </div>
      ))
    ) : (
      <div className="no-results">No Pokémon found 😢</div>
    )}
  </div>
)}


      <div className="footer">
        <p>Developed by Alberto Pimentel</p>
        <p>2025</p>
        <p>All rights reserved</p>
      </div>
    </>
  );
}

export default App;