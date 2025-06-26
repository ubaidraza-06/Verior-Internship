import React, { useState } from 'react';
import { products } from './data/products';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import './App.css';

function App() {
  const [cart, setCart]   = useState([]);
  const [show, setShow]   = useState(false);

  const addToCart    = item => setCart(c => [...c, item]);
  const removeFromCart = id => setCart(c => c.filter(i => i.id !== id));

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>React Shopping Cart</h1>
        <button className="cart-btn" onClick={() => setShow(true)}>
          🛒 {cart.length}
        </button>
      </header>

      <ProductList items={products} add={addToCart}/>

      {show && (
        <CartSidebar
          cart={cart}
          remove={removeFromCart}
          close={() => setShow(false)}
        />
      )}
    </div>
  );
}

export default App;
