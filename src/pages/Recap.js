import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';  // Importation de jsPDF
import html2canvas from 'html2canvas'; // Importation de html2canvas
import './Recap.css';

function Recap() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProducts, setEditedProducts] = useState([]);
  const [editedBudget, setEditedBudget] = useState('');
  const componentRef = useRef();

  useEffect(() => {
    const lastList = JSON.parse(localStorage.getItem('lastList'));
    if (!lastList) return navigate('/');
    setData(lastList);
    setEditedProducts(lastList.products);
    setEditedBudget(lastList.budget);
  }, [navigate]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPDF = () => {
    const input = componentRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      const imgX = (pageWidth - imgWidth * ratio) / 2;
      const imgY = 20;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`liste-marche-${new Date().toLocaleDateString()}.pdf`);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (index, key, value) => {
    const updated = [...editedProducts];
    updated[index][key] = key === 'price' ? parseFloat(value) : value;
    setEditedProducts(updated);
  };

  const handleSave = () => {
    const updatedData = {
      ...data,
      budget: parseFloat(editedBudget),
      products: editedProducts,
    };
    setData(updatedData);
    localStorage.setItem('lastList', JSON.stringify(updatedData));

    // Mettez aussi à jour l'historique
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history[history.length - 1] = updatedData;
    localStorage.setItem('history', JSON.stringify(history));

    setIsEditing(false);
  };

  if (!data) return null;

  const total = data.products.reduce((sum, p) => sum + p.price, 0);
  const reste = data.budget - total;

  return (
    <div className="recap-container" >
      <h2>📄 Récapitulatif de la liste</h2>

      <div className="recap-actions">
        <button onClick={handlePrint}>📄 Imprimer</button>
        <button onClick={handleDownloadPDF}>📥 Télécharger en PDF</button> {/* Nouveau bouton */}
        <button onClick={handleEdit}>✏️ Modifier</button>
      </div>

      <div ref={componentRef} className="recap-content">
        <p><strong>Date :</strong> {new Date(data.date).toLocaleDateString()}</p>
        <p><strong>Budget :</strong> {data.budget} FCFA</p>

        <ul>
          {data.products.map((prod, i) => (
            <li key={i}>{prod.name} - {prod.price} FCFA</li>
          ))}
        </ul>

        <p><strong>Total :</strong> {total} FCFA</p>
        <p><strong>Reste :</strong> {reste} FCFA</p>
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>✏️ Modifier la liste</h3>
            <label>Budget :
              <input
                type="number"
                value={editedBudget}
                onChange={(e) => setEditedBudget(e.target.value)}
              />
            </label>
            {editedProducts.map((item, i) => (
              <div key={i} className="edit-row">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleEditChange(i, 'name', e.target.value)}
                />
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleEditChange(i, 'price', e.target.value)}
                />
              </div>
            ))}
            <div className="modal-buttons">
              <button onClick={handleSave}>✅ Sauvegarder</button>
              <button onClick={() => setIsEditing(false)}>❌ Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recap;

