import { useEffect, useState } from "react";
import SelectedMovie from "./SelectedMovie";
import WatchedList from "./WatchedList";
import Loader from "./Loader";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

// Header components
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Search({ query, setQuery }) {
  return <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} />;
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function NumberOfSearchResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies ? movies.length : 0}</strong> results
    </p>
  );
}
// Main Body Components
function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
function Watchlist({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, key, onSelectMovie }) {
  return (
    <li key={key} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MinMaxButton({ isOpen2, setIsOpen2 }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
      {isOpen2 ? "–" : "+"}
    </button>
  );
}

function ErrorMessage({ error }) {
  return (
    <p className="error">
      <span>😔</span>
      {error}
    </p>
  );
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watched, setWatched] = useState([]);
  function handleSetWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    console.log(watched);
  }

  function handleMovieSelection(id) {
    setSelectedMovieId(id);
  }
  function handleCloseMovieDetails() {
    setSelectedMovieId(null);
  }

  const KEY = "c3959e48";
  const URL = `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`;
  useEffect(
    function () {
      async function fetchData() {
        try {
          setIsLoading(true);
          setError();
          const response = await fetch(URL);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.Respinse === "False") {
            throw new Error("Movie not found!");
          }
          console.log(data);
          console.log(data.Search);
          setMovies(data.Search);
        } catch (err) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    },
    [query]
  );
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumberOfSearchResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <Watchlist movies={movies} onSelectMovie={handleMovieSelection} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>{selectedMovieId ? <SelectedMovie onSetWatched={handleSetWatched} selectedID={selectedMovieId} onCloseMovieDetails={handleCloseMovieDetails} watched={watched} /> : <WatchedList watched={watched} handleDeleteWatched={handleDeleteWatched} />}</Box>
      </Main>
    </>
  );
}
