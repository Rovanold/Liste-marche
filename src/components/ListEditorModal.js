import React from 'react';
import './ListEditorModal.css';

function ListEditorModal({ show, onClose, products, setProducts }) {
  if (!show) return null;

  const handleUpdateProduct = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = field === 'price' ? parseFloat(value) : value;
    setProducts(updated);
  };

  const handleDeleteProduct = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-in">
        <h2>Modifier la liste</h2>
        <ul className="edit-list">
          {products.map((p, i) => (
            <li key={i}>
              <input
                type="text"
                value={p.name}
                onChange={(e) => handleUpdateProduct(i, 'name', e.target.value)}
              />
              <input
                type="number"
                value={p.price}
                onChange={(e) => handleUpdateProduct(i, 'price', e.target.value)}
              />
              <button onClick={() => handleDeleteProduct(i)}>🗑️</button>
            </li>
          ))}
        </ul>
        <button className="close-btn" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

export default ListEditorModal;

