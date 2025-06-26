import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ items, add }) {
  return (
    <section className="products">
      {items.map(p => (
        <ProductCard key={p.id} item={p} add={add}/>
      ))}
    </section>
  );
}
