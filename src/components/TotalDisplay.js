function TotalDisplay({ items, budget }) {
  const total = items.reduce((sum, i) => sum + parseFloat(i.price), 0);
  const isOver = total > budget;

  return (
    <div>
      <h3>Total : {total.toFixed(2)} FCFA</h3>
      {isOver && <p style={{ color: 'red' }}>⚠️ Dépasse le budget !</p>}
    </div>
  );
}

export default TotalDisplay;

