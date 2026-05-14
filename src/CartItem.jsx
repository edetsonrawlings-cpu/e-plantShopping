import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Link } from 'react-router-dom';
import './App.css';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
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

      <div className="cart-page">
        <div className="total-cart-amount">
          Total Cart Amount: ${calculateTotalAmount()}
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty. Start shopping!</p>
            <Link to="/products" className="continue-shopping-btn" style={{ marginTop: '20px' }}>
              Browse Plants
            </Link>
          </div>
        ) : (
          <>
            <p style={{ textAlign: 'center', color: '#555', marginBottom: '20px' }}>
              Total items in cart: <strong>{totalCount}</strong>
            </p>
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.name} className="cart-item-card">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="unit-price">Unit Price: ${item.cost}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleDecrement(item)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item)}>+</button>
                    </div>
                    <p className="item-total">Total: ${calculateTotalCost(item)}</p>
                  </div>
                  <button className="delete-btn" onClick={() => handleRemove(item)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-actions">
              <Link to="/products" className="continue-shopping-btn">
                Continue Shopping
              </Link>
              <button className="checkout-btn" onClick={handleCheckoutShopping}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;