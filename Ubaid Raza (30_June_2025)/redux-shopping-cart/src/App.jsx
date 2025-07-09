import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem, decreaseQty } from './redux/cartSlice'

import appleImg from './assets/apple.jpg'
import bananaImg from './assets/banana.jpg'
import orangeImg from './assets/orange.jpg'
import grapesImg from './assets/grapes.jpg'
import strawberryImg from './assets/strawberry.jpg'
import pineappleImg from './assets/pineapple.jpg'
import mangoImg from './assets/mango.jpg'
import peachImg from './assets/peach.jpg'
import kiwiImg from './assets/kiwi.jpg'
import lemonImg from './assets/lemon.jpg'
import blueberryImg from './assets/blueberry.jpg'
import pomegranateImg from './assets/pomegranate.jpg'
import avocadoImg from './assets/avocado.jpg'
import cherryImg from './assets/cherry.jpg'
import watermelonImg from './assets/watermelon.jpg'

const products = [
  { id: 1, name: 'Apple', price: 100, img: appleImg },
  { id: 2, name: 'Banana', price: 60, img: bananaImg },
  { id: 3, name: 'Orange', price: 80, img: orangeImg },
  { id: 4, name: 'Grapes', price: 120, img: grapesImg },
  { id: 5, name: 'Strawberry', price: 150, img: strawberryImg },
  { id: 6, name: 'Pineapple', price: 130, img: pineappleImg },
  { id: 7, name: 'Mango', price: 180, img: mangoImg },
  { id: 8, name: 'Peach', price: 140, img: peachImg },
  { id: 9, name: 'Kiwi', price: 90, img: kiwiImg },
  { id: 10, name: 'Lemon', price: 70, img: lemonImg },
  { id: 11, name: 'Blueberry', price: 160, img: blueberryImg },
  { id: 12, name: 'Pomegranate', price: 190, img: pomegranateImg },
  { id: 13, name: 'Avocado', price: 200, img: avocadoImg },
  { id: 14, name: 'Cherry', price: 110, img: cherryImg },
  { id: 15, name: 'Watermelon', price: 220, img: watermelonImg },
]

export default function App() {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty.')
    } else {
      alert(`✅ Order placed successfully!\nTotal amount: Rs.${total}`)
    }
  }

  return (
    <div className="container">
      <h1>🛒 Redux Shopping Cart</h1>

      <section>
        <h2>Products</h2>
        <div className="product-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.img} alt={p.name} />
              <h3>{p.name}</h3>
              <p>Rs.{p.price}</p>
              <button onClick={() => dispatch(addItem(p))}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p className="empty">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong> — Rs.{item.price * item.qty}
              </div>
              <div className="qty-controls">
                <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => dispatch(addItem(item))}>+</button>
                <button className="remove-btn" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
              </div>
            </div>
          ))
        )}
        <hr />
        <h3>Total: Rs.{total}</h3>
        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
      </section>
    </div>
  )
}
