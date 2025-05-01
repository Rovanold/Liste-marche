import React, { useState } from 'react';

function BudgetForm({ onValidate }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(input);
    if (!isNaN(parsed) && parsed > 0) {
      onValidate(parsed);
    } else {
      alert('Entrer un budget valide');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>💰 Entrez votre budget total</h2>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ex: 10000"
      />
      <button type="submit">Valider le budget</button>
    </form>
  );
}

export default BudgetForm;

