import { useState } from "react";
import { useEffect } from "react";
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedSeats, SetSelectedSeats] = useState([]);

  function toggleSeat(index) {
    const seatElement = document.getElementById(`seat-${index}`);
    if (seatElement?.classList.contains("occupied")) {
      return;
    }

    if (selectedSeats.includes(index)) {
      SetSelectedSeats(
        selectedSeats.filter(s => s !== index)
      );
    }
    else {
      SetSelectedSeats([...selectedSeats, index]);
    }
  }


  useEffect(() => {
    async function getMovies() {
      const response = await fetch("http://localhost:3001/movies");
      const moviesFromServer = await response.json();

      console.log("Filmer från server:", moviesFromServer);

      setMovies(moviesFromServer);

      if (moviesFromServer.length > 0) {
        setSelectedPrice(Number(moviesFromServer[0].Price));
      }
    }

    getMovies();
  }, []);

  return (
    <>
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

      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>N/A</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>
      <div className="container">
        <div className="screen"></div>
        <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
        <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat occupied"></div>
          <div className="seat occupied"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
        <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat occupied"></div>
          <div className="seat occupied"></div>
        </div>
        <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
        <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat occupied"></div>
          <div className="seat occupied"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
        <div className="row">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat occupied"></div>
          <div className="seat occupied"></div>
          <div className="seat occupied"></div>
          <div className="seat"></div>
        </div>
      </div>
      <p className="text">
        You have selected <span id="count">0</span> seats for a price of $<span
          id="total"
          >0</span
        >
      </p>
    </>
  );
}

export default App;
