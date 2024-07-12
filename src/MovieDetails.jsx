import { useState } from "react";
import { useEffect } from "react";
import StarRating from "./StarRating";
const MovieDetails = ({ selectedID, onCloseMovie }) => {
  const [movie, setMovie] = useState({});
  console.log(movie);
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
  useEffect(function () {
    async function getMovieDetails() {
      const res = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&i=${selectedID}`
      );
      const data = await res.json();
      setMovie(data);
    }
    getMovieDetails();
  }, []);
  return (
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
        <StarRating />
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed By {director}</p>
      </section>
    </div>
  );
};

export default MovieDetails;
