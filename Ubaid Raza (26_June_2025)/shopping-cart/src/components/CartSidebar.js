import React from 'react';
import CartItem from './CartItem';

export default function CartSidebar({ cart, remove, close }) {
  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <aside className="sidebar">
      <header>
        <h2>Your Cart</h2>
        <button className="close" onClick={close}>×</button>
      </header>

      {cart.length ? (
        <>
          <ul>{cart.map(i => (
              <CartItem key={i.id + Math.random()} item={i} remove={remove}/>
          ))}</ul>
          <p className="total">Total: ${total.toFixed(2)}</p>
        </>
      ) : (
        <p style={{padding:"1rem"}}>Cart is empty.</p>
      )}
    </aside>
  );
}
