import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Liste from './pages/Liste';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Historique from './pages/Historique';
import Recap from './pages/Recap';

function App() {
  return (
    <Router>
      <div className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recap" element={<Recap />} />
              <Route path="/liste" element={<Liste />} />
              <Route path="/historique" element={<Historique />} />


            </Routes>
      </div>
    </Router>
  );
}

export default App;

