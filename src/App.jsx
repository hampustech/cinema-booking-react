import { useState } from "react";
import { useEffect } from "react";
import './App.css'
import MovieSelect from "./components/MovieSelect";
import SeatRows from "./components/SeatRows";
import Summary from "./components/Summary";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
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
  const totalPrice = selectedCount * selectedPrice;

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
      </div>

      <SeatRows
        occupiedSeats={occupiedSeats}
        selectedSeats={selectedSeats}
        toggleSeat={toggleSeat}
      />


      <Summary selectedCount={selectedCount} totalPrice={totalPrice} />

    </>
  );
}

export default App;
