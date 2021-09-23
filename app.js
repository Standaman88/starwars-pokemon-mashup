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

function fetchStarWarsFilm(id) {
  return fetch(`https://swapi.dev/api/films/${id}/`)
    .then((response) => response.json())
    .then((json) => ({ ...json, id }));
}

const StarWarsFilmsTable = ({ filmIds }) => {
  const [filmData, setFilmData] = React.useState([]);

  React.useEffect(async () => {
    const results = [];
    for (let filmId of filmIds) {
      const data = await fetchStarWarsFilm(filmId);
      results.push(data);
    }

    setFilmData(results);
  }, [filmIds, filmData]);

  return (
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
  );
}

const App = () => {
  const filmIds = [1, 2, 3, 4, 5, 6];

  return (
    <div className="App">
      <StarWarsFilmsTable filmIds={filmIds} />
    </div>
  );
}

export default App;
