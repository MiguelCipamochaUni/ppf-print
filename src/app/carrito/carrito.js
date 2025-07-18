import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Carrito() {
  const { cartItems, total, checkout } = useContext(CartContext);

  return (
    <div>
      <h1>Carrito de compras</h1>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>
            {item.title} - {item.price} x {item.quantity}
          </p>
        </div>
      ))}
      <h2>Total: {total} COP</h2>
      <button onClick={checkout}>Comprar con PSE</button>
    </div>
  );
}
