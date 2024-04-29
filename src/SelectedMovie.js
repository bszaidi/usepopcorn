import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

export default function SelectedMovie({ selectedID, onCloseMovieDetails, onSetWatched }) {
  const KEY = "c3959e48";
  const URL = `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`;
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movieRating, setMovieRating] = useState(0);
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      runtime: movie.Runtime.split(" ").at(0),
      imdbRating: Number(movie.imdbRating),
      userRating: 0,
    };
    onSetWatched(newWatchedMovie);
  }

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      fetchData();
    },
    [selectedID]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <img src={movie?.Poster} alt={movie?.Title} />
            <div className="details-overview">
              <h2>{movie?.Title}</h2>
              <p>
                {movie?.Released} &bull; {movie?.Runtime}
              </p>
              <p>{movie?.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie?.imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {" "}
              <StarRating onSetRating={setMovieRating} />
              <button className="btn-add" onClick={handleAdd}>
                Add to List
              </button>
            </div>
            <p>
              <em>{movie?.Plot}</em>
            </p>
            <p>Starring: {movie?.Actors}</p>
            <p>Directed By {movie?.Director}</p>
          </section>
        </>
      )}
      <button className="btn-back" onClick={onCloseMovieDetails}>
        &larr;
      </button>
    </div>
  );
}
