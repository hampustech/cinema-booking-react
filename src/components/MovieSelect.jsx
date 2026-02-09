export default function MovieSelect({ movies, selectedPrice, onPriceChange}) {
    return (
    <div className="movie-container">
        <label htmlFor="movie"></label>

        <select 
        id="movie"
        value={selectedPrice}
        onChange={(e) => onPriceChange(Number(e.target.value))}
        >
          <option value= "" disabled>
            — Pick a movie —
          </option>


          {/* {Array.isArray(movies) &&  */}
            {movies.map((movie, index) => (
              <option key={index} value={movie.price}>
                {movie.title} (${movie.price})
              </option>
            ))}
        </select>
      </div>
    );
}