export default function Summary({ selectedCount, totalPrice }) {
    return (
      <p className="text">
        You have selected <span>{selectedCount}</span> seats for a price of $
        <span>{totalPrice}</span>
      </p>
    );
}