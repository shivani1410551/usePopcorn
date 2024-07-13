import ErrorHandler from "./ErrorHandler";
import { useState } from "react";
import { useEffect } from "react";
import StarRating from "./StarRating";
const MovieDetails = ({ selectedID, onCloseMovie }) => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const KEY = "822584fc";
  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
          );
          if (!res.ok) throw new Error("Couldn't get movie details");
          const data = await res.json();
          console.log(data);
          if (data.Response === "False") throw new Error("Incorrect IMDb ID");
          setMovie(data);
        } catch (error) {
          setError(error.message);
        }
      }
      getMovieDetails();
    },
    [selectedID]
  );
  return (
    <>
      {error ? (
        <ErrorHandler message={error} />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IBDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={18} />
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
