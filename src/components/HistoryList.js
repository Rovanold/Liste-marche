import React, { useEffect } from 'react';

function HistoryList({ history }) {
  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsed.reverse(); // Optionnel : ordre décroissant
        }
      } catch (e) {
        console.error("Historique corrompu");
      }
    }
  }, []);

  return (
    <div>
      <h2>📅 Historique des listes</h2>
      {history.length === 0 ? (
        <p>Aucune liste enregistrée.</p>
      ) : (
        history.map((entry, idx) => (
          <div key={idx} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <strong>Date :</strong> {entry.date}
            <ul>
              {entry.items.map((item, i) => (
                <li key={i}>{item.name} – {item.price} FCFA</li>
              ))}
            </ul>
            <p><strong>Total :</strong> {entry.total} FCFA</p>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoryList;

