import React from 'react';
import './App.css';

function formatDate(dateString) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

const StarWarsFilmsTable = ({ filmIds }) => {
  const [filmData, setFilmData] = React.useState([]);

  const fetchStarWarsFilm = (id) => {
    return fetch(`https://swapi.dev/api/films/${id}/`)
      .then((response) => response.json())
      .then((json) => ({ ...json, id }));
  }

  React.useEffect(async () => {
    const results = [];
    for (let filmId of filmIds) {
      const data = await fetchStarWarsFilm(filmId);
      results.push(data);
    }

    setFilmData(results);
  }, [filmIds, filmData]);

  return (
    <>
      <h1 class="header">Star Wars Films</h1>
      <table id="films-table">
        <thead>
          <tr>
            <td>Film Id</td>
            <td>Title</td>
            <td>Release Date</td>
            <td>Director(s)</td>
            <td>Producer(s)</td>
          </tr>
        </thead>
        <tbody id="films-table-body">
          {filmData.map((data) => (
            <tr>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td>{formatDate(data.release_date)}</td>
              <td>{data.director}</td>
              <td>{data.producer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const PokemonTable = ({ characters }) => {
  const [pokemonData, setPokemonData] = React.useState([]);

  const fetchPokemon = (character) => {
      // @see https://pokeapi.co
      return fetch(`https://pokeapi.co/api/v2/pokemon/${character}`)
          .then(response => response.json())
          .then(json => ({ ...json, character }));
  }

  React.useEffect(async () => {
    const results = [];
    for (let character of characters) {
      const data = await fetchPokemon(character);
      results.push(data);
    }

    setPokemonData(results);
  }, [characters, pokemonData]);

  return (
    <>
      <h1 class="header">Pokemon Characters</h1>
      <table id="pokemon-table">
        <thead>
          <tr>
            <td>Pokemon Id</td>
            <td>Name</td>
            <td>Height</td>
            <td>Weight</td>
            <td>Picture</td>
          </tr>
        </thead>
        <tbody id="pokemon-table-body">
          {pokemonData.map((data) => (
            <tr>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.height}</td>
              <td>{data.weight}</td>
              <td>
                <img src={data.sprites.front_default} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const App = () => {
  return (
    <div className="App">
      <StarWarsFilmsTable filmIds={[1, 2, 3, 4, 5, 6]} />
      <PokemonTable characters={["ditto", "pikachu", "charmander", "geodude", "jigglypuff"]} />
    </div>
  );
}

export default App;
