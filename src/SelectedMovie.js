import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

export default function SelectedMovie({ selectedID, onCloseMovieDetails, onSetWatched, watched }) {
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
      userRating: movieRating,
    };
    onSetWatched(newWatchedMovie);
  }
  useEffect(
    function () {
      function callback(event) {
        if (event.key === "Escape") onCloseMovieDetails();
        // console.log("closing");
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovieDetails]
  );
  //Derived State
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  const watchedUserrating = watched.find((movie) => movie.imdbID === selectedID)?.userRating;
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchData() {
        setIsLoading(true);
        const response = await fetch(URL, { signal: controller.signal });
        const data = await response.json();
        // console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      fetchData();
      return function () {
        controller.abort();
      };
    },
    [selectedID]
  );
  // Changing Tilte of the page
  useEffect(
    function () {
      document.title = movie?.Title || "Movie Details";
      return function () {
        document.title = "UsePopCorn";
      };
    },
    [movie]
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
              {/*If movie is not watched display the stars*/}
              {!isWatched ? (
                <>
                  <StarRating onSetRating={setMovieRating} />
                  {/*If movie rating is greater than 0 display the add button*/}
                  {movieRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to List
                    </button>
                  )}
                </>
              ) : (
                <div>Watched and Rated {watchedUserrating} ⭐️ </div>
              )}
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
