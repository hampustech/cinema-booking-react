import { useState } from "react";
import { useEffect } from "react";
import './App.css'
import Movie from "./models/movie";
import MovieSelect from "./components/MovieSelect";
import SeatRows from "./components/SeatRows";
import Summary from "./components/Summary";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const occupiedSeats = [10, 11, 22, 23, 34, 35, 44, 45, 46];

  function toggleSeat(index) {

    if (occupiedSeats.includes(index)) {
      return;
    }

    if (selectedSeats.includes(index)) {
      setSelectedSeats(
        selectedSeats.filter(seat => seat !== index)
      );
    }

    else {
      setSelectedSeats([...selectedSeats, index]);
    }
  }

  const selectedCount = selectedSeats.length;
  const totalPrice = 
    selectedPrice == null
      ? 0
      : selectedCount * selectedPrice;

  useEffect(() => {
    async function getMovies() {
      try {
      const response = await fetch("http://localhost:3001/movies");

      if (!response.ok) {
        throw new Error("JSON-server svarade inte");
      }

      const moviesFromServer = await response.json();

      const movieObjects = moviesFromServer.map(
        m => new Movie(m.title, m.price)
      );

      setMovies(movieObjects);
    }
    catch (err) {
      console.warn("Faller tillbaka till lokal JSON-fil:", err);

      const fallbackResponse = await fetch("/movies.json");
      const moviesFromFile = await fallbackResponse.json();

      const movieObjects = moviesFromFile.map(
        m => new Movie(m.title, m.price)
      );
      
      setMovies(movieObjects);
    }
  }

    getMovies();
  }, []);

  return (
    <>
      
      <MovieSelect
        movies={movies}
        selectedPrice={selectedPrice}
        onPriceChange={setSelectedPrice}
      />

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

      <SeatRows
        occupiedSeats={occupiedSeats}
        selectedSeats={selectedSeats}
        toggleSeat={toggleSeat}
      />
      </div>


      <Summary selectedCount={selectedCount} totalPrice={totalPrice} />

    </>
  );
}

export default App;
