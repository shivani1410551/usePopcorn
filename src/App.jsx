import ErrorHandler from "./ErrorHandler";
import MovieDetails from "./MovieDetails";
import MoviesList from "./MoviesList";
import "./App.css";
import Box from "./ListBox";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import { useEffect } from "react";
import Loader from "./Loader";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const KEY = "822584fc";
  function handleSelectedMovie(id) {
    console.log(id);
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }
  function handleCloseMovie() {
    setSelectedID(null);
  }
  useEffect(
    function () {
      async function fetchMovie() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
          );
          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovie();
    },
    [query]
  );
  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Hero>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorHandler message={error} />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelect={handleSelectedMovie} />
          )}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />

              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Hero>
    </>
  );
}

// passing elements as props
{
  /* <Box element={<MoviesList movies={movies} />}/> */
}
