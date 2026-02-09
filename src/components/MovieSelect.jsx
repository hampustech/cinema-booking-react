export default function MovieSelect({ movies, selectedPrice, onPriceChange}) {
    return (
    <div className="movie-container">
        <label htmlFor="movie">Pick a movie:</label>

        <select 
        id="movie"
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(Number(e.target.value))}
        >
          {Array.isArray(movies) && 
            movies.map((movie, index) => (
              <option key={index} value={movie.Price}>
                {movie.Title} ({movie.Price} kr)
              </option>
            ))}
        </select>
      </div>
    );
}