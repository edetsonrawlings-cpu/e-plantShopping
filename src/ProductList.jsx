import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import { Link } from 'react-router-dom';
import './App.css';

const plantsArray = [
  // Air Purifying Plants
  { category: "Air Purifying Plants", name: "Snake Plant", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Sansevieria_trifasciata_Laurentii.jpg/800px-Sansevieria_trifasciata_Laurentii.jpg", description: "Produces oxygen at night, improving air quality.", cost: 15 },
  { category: "Air Purifying Plants", name: "Spider Plant", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chlorophytum_comosum_-_1.jpg/800px-Chlorophytum_comosum_-_1.jpg", description: "Filters formaldehyde and xylene from the air.", cost: 12 },
  { category: "Air Purifying Plants", name: "Peace Lily", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Spathiphyllum_cochlearispathum_RTBG.jpg/800px-Spathiphyllum_cochlearispathum_RTBG.jpg", description: "Removes mold spores and purifies the air.", cost: 18 },
  { category: "Air Purifying Plants", name: "Boston Fern", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Nephrolepis_exaltata.jpg/800px-Nephrolepis_exaltata.jpg", description: "Acts as a natural humidifier and removes toxins.", cost: 14 },
  { category: "Air Purifying Plants", name: "Rubber Plant", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Ficus_elastica_-_1.jpg/800px-Ficus_elastica_-_1.jpg", description: "Absorbs airborne chemicals and is easy to grow.", cost: 20 },
  { category: "Air Purifying Plants", name: "Dracaena", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Dracaena_marginata_2.jpg/800px-Dracaena_marginata_2.jpg", description: "Removes benzene, formaldehyde, and CO2.", cost: 16 },

  // Aromatic Fragrant Plants
  { category: "Aromatic Fragrant Plants", name: "Lavender", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Bloemen_van_een_lavendel.jpg/800px-Bloemen_van_een_lavendel.jpg", description: "Calming scent that promotes relaxation and sleep.", cost: 22 },
  { category: "Aromatic Fragrant Plants", name: "Jasmine", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Jasminum_polyanthum.jpg/800px-Jasminum_polyanthum.jpg", description: "Sweet fragrance, great for indoor gardens.", cost: 18 },
  { category: "Aromatic Fragrant Plants", name: "Rosemary", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Rosemary_bush.jpg/800px-Rosemary_bush.jpg", description: "Aromatic herb with culinary and medicinal uses.", cost: 12 },
  { category: "Aromatic Fragrant Plants", name: "Mint", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Illustration_Mentha_aquatica0.jpg/800px-Illustration_Mentha_aquatica0.jpg", description: "Refreshing aroma and perfect for teas and cooking.", cost: 8 },
  { category: "Aromatic Fragrant Plants", name: "Gardenia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Gardenia_jasminoides.jpg/800px-Gardenia_jasminoides.jpg", description: "Rich, sweet scent; beautiful white blooms.", cost: 25 },
  { category: "Aromatic Fragrant Plants", name: "Lemon Balm", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-100.jpg/800px-Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-100.jpg", description: "Lemon-scented; relieves stress and anxiety.", cost: 10 },

  // Medicinal Plants
  { category: "Medicinal Plants", name: "Aloe Vera", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/800px-Aloe_vera_flower_inset.png", description: "Soothes skin burns and has anti-inflammatory properties.", cost: 14 },
  { category: "Medicinal Plants", name: "Echinacea", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Echinacea_purpurea.jpg/800px-Echinacea_purpurea.jpg", description: "Boosts immunity and helps fight colds.", cost: 16 },
  { category: "Medicinal Plants", name: "Peppermint", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Illustration_Mentha_aquatica0.jpg/800px-Illustration_Mentha_aquatica0.jpg", description: "Relieves headaches and improves digestion.", cost: 10 },
  { category: "Medicinal Plants", name: "Chamomile", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Chamaemelum_nobile_-_Camomille.jpg/800px-Chamaemelum_nobile_-_Camomille.jpg", description: "Calming properties; used for teas and relaxation.", cost: 12 },
  { category: "Medicinal Plants", name: "Turmeric", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Curcuma_longa_roots.jpg/800px-Curcuma_longa_roots.jpg", description: "Powerful anti-inflammatory and antioxidant plant.", cost: 18 },
  { category: "Medicinal Plants", name: "Ginger", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Zingiber_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-209.jpg/800px-Zingiber_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-209.jpg", description: "Aids digestion and has anti-nausea properties.", cost: 13 },
];

const categories = [...new Set(plantsArray.map(p => p.category))];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div className="product-listing-page">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <h1>Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Plants</Link>
          <Link to="/cart" className="cart-icon-wrapper">
            🛒
            {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
          </Link>
        </div>
      </nav>

      {categories.map(category => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="product-grid">
            {plantsArray.filter(plant => plant.category === category).map(plant => (
              <div key={plant.name} className="plant-card">
                <span className="sale-badge">SALE</span>
                <img src={plant.image} alt={plant.name} />
                <div className="plant-card-body">
                  <h3>{plant.name}</h3>
                  <p className="plant-price">${plant.cost}</p>
                  <p className="plant-description">{plant.description}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={!!addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;