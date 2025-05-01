import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Liste.css';

function Liste() {
  const [budget, setBudget] = useState('');
  const [budgetValid, setBudgetValid] = useState(false);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleBudgetSubmit = () => {
    if (parseFloat(budget) > 0) {
      setBudgetValid(true);
    }
  };

  const addProduct = () => {
    if (!name || !price) return;
    const newProduct = { name, price: parseFloat(price) };
    setProducts([...products, newProduct]);
    setName('');
    setPrice('');
  };

  const total = products.reduce((sum, p) => sum + p.price, 0);
  const reste = budget - total;

  const saveList = () => {
    const data = {
      date: new Date(),
      budget: parseFloat(budget),
      products,
    };

    // enregistrer la liste actuelle dans l'historique
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.push(data);
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('lastList', JSON.stringify(data)); // pour le récap

    navigate('/recap');
  };

  return (
    <div className="liste-container animate">
      <h2>📝 Saisie de la liste</h2>

      {!budgetValid ? (
        <div className="budget-section">
          <label>Entrer votre budget :</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <button onClick={handleBudgetSubmit}>Valider Budget ✅</button>
        </div>
      ) : (
        <>
          <div className="product-section">
            <input
              type="text"
              placeholder="Nom du produit"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Prix"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={addProduct}>Ajouter ➕</button>
          </div>

          <div className="liste-summary">
            <h3>🛍️ Produits</h3>
            <ul>
              {products.map((prod, i) => (
                <li key={i}>
                  {prod.name} - {prod.price} FCFA
                </li>
              ))}
            </ul>

            <p><strong>Total :</strong> {total} FCFA</p>
            <p><strong>Reste :</strong> {reste} FCFA</p>

            <button onClick={saveList} disabled={products.length === 0}>
              Enregistrer ✅
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Liste;

