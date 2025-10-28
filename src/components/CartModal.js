import React from 'react';
import { useCart } from '../context/CartContext';

function CartModal() {
  const { isCartOpen, closeCart, cartItems, total, emptyCart, removeFromCart } = useCart();

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="cart-modal">
      <div className="cart-content">
        <h2>🛒 Carrito de Compras</h2>
        
        <ul>
          {cartItems.length === 0 ? (
            <li>Tu carrito está vacío</li>
          ) : (
            cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <span>{item.name} ({item.quantity}) - ${item.price * item.quantity}</span>
                <button onClick={() => removeFromCart(item.id)} className="btn-remove">X</button>
              </li>
            ))
          )}
        </ul>
        
        {cartItems.length > 0 && (
          <p className="cart-total">Total: ${total}</p>
        )}
        
        {/* FIX: Se envuelven los botones en un div.actions para mejor estilo */}
        <div className="actions">
          <button onClick={emptyCart} className="btn btn-secondary">Vaciar carrito</button>
          <button className="btn btn-primary">Ir a pagar</button>
        </div>

        <button onClick={closeCart} className="btn-close-modal">Cerrar</button>
      </div>
    </div>
  );
}

export default CartModal;
