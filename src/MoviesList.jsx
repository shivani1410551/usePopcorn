import Movie from "./Movie";

const MoviesList = ({ movies, onSelect }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelect={onSelect} />
      ))}
    </ul>
  );
};

export default MoviesList;
