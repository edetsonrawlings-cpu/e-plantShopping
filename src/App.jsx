import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome To<br />Paradise Nursery</h1>
        <div className="divider" />
        <p className="tagline">Where Green Meets Serenity</p>
        <button className="get-started-btn" onClick={() => navigate('/products')}>
          Get Started
        </button>
      </div>
      <div className="landing-about">
        <p>At Paradise Nursery, we are passionate about bringing nature closer to you. Our mission is to provide a wide range of high-quality plants that not only enhance the beauty of your surroundings but also contribute to a healthier and more sustainable lifestyle.</p>
        <p>From air-purifying plants to aromatic fragrant ones, we have something for every plant enthusiast.</p>
        <p>Join us in our mission to create a greener, healthier world. Visit Paradise Nursery today!</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;