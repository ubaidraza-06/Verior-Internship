import React from 'react';

export default function CartItem({ item, remove }) {
  return (
    <li className="cart-item">
      {item.name} – ${item.price}
      <button onClick={() => remove(item.id)}>✕</button>
    </li>
  );
}
