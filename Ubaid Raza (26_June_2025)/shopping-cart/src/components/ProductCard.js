import React from 'react';

export default function ProductCard({ item, add }) {
  return (
    <div className="product">
      <img src={item.img} alt={item.name}/>
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      <button onClick={() => add(item)}>Add to Cart</button>
    </div>
  );
}
