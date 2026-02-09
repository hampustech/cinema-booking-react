export default function SeatRows({occupiedSeats, selectedSeats, toggleSeat}) {
    return (
        <>
                {Array.from({ length: 6 }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: 8 }).map((_, seatIndex) => {
              const index = rowIndex * 8 + seatIndex;

              let className = "seat";
              if (occupiedSeats.includes(index)) className = "seat occupied";
              else if (selectedSeats.includes(index)) className = "seat selected";

              return (
                <div
                  key={index}
                  className={className}
                  onClick={() => toggleSeat(index)}
                ></div>
              );
            })}
          </div>
        ))}
        </>
    );
}