import React from "react";
import WatchedMovies from "./WatchedMovies";
const WatchedMoviesList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovies movie={movie} key={movie.Title} />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
