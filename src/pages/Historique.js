import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Historique.css';

function Historique() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('history') || '[]');
    setHistory(saved);
  }, []);

  const handleView = (item) => {
    localStorage.setItem('lastList', JSON.stringify(item));
    navigate('/recap');
  };

  const handleDelete = (index) => {
    if (window.confirm('Supprimer cette liste ?')) {
      const updated = [...history];
      updated.splice(index, 1);
      setHistory(updated);
      localStorage.setItem('history', JSON.stringify(updated));
    }
  };

  if (history.length === 0) return <p style={{ textAlign: 'center' }}>Aucune liste enregistrée.</p>;

  return (
    <div className="history-container">
      <h2>📂 Historique des listes</h2>

      {history.map((item, index) => {
        const total = item.products.reduce((sum, p) => sum + p.price, 0);
        return (
          <div key={index} className="history-card">
            <p><strong>Date :</strong> {new Date(item.date).toLocaleDateString()}</p>
            <p><strong>Articles :</strong> {item.products.length}</p>
            <p><strong>Budget :</strong> {item.budget} FCFA</p>
            <p><strong>Total :</strong> {total} FCFA</p>
            <div className="card-actions">
              <button onClick={() => handleView(item)}>📄 Voir</button>
              <button onClick={() => handleDelete(index)}>🗑 Supprimer</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Historique;

