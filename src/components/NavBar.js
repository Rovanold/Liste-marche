import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink to="/" className="nav-link">
        🛒 Liste
      </NavLink>
      <NavLink to="/recap" className="nav-link">
        📄 Récap
      </NavLink>
      <NavLink to="/historique" className="nav-link">
        📚 Historique
      </NavLink>
    </nav>
  );
}

export default NavBar;

