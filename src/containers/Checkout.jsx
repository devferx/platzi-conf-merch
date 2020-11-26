import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppContext from '../context/AppContext';
import '../styles/components/Checkout.css';

const Checkout = () => {
  const { state, removeFromCart } = useContext(AppContext);
  const { cart } = state;

  const handleRemove = (productIndex) => () => {
    removeFromCart(productIndex);
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <>
      <Helmet>
        <title>Lista de Pedidos - Platzi Conf Merch</title>
      </Helmet>

      <div className="Checkout">
        <div className="Checkout-content">
          <h3>{cart.length > 0 ? 'Lista de Pedidos:' : 'Sin pedidos...'}</h3>
          {cart.map((item, index) => (
            <div
              key={`${item.title}-${Math.round(Math.random() * 1000, 1)}`}
              className="Checkout-item"
            >
              <div className="Checkout-element">
                <h4>{item.title}</h4>
                <span>$ {item.price}</span>
              </div>
              <button type="button" onClick={handleRemove(index)}>
                <i className="fas fa-trash-alt" />
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="Checkout-sidebar">
            <h3>{`Precio Total: $ ${handleSumTotal()}`}</h3>
            <Link to="/checkout/information">
              <button type="button">Continuar pedido</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
