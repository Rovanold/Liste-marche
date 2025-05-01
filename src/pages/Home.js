import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/liste'); // redirige vers la page de saisie de la liste
  };

  return (
    <div className="home-container animate">
      <h1>🛍️ Bienvenue dans Liste Marché</h1>
      <p>
        Créez, gérez et sauvegardez vos listes de courses avec votre budget.
        Restez organisé et ne dépassez pas vos dépenses !
      </p>
      <img src="/shopping.svg" alt="Illustration" className="home-img" />
      <button onClick={handleStart}>Commencer ➡️</button>
    </div>
  );
}

export default Home;

