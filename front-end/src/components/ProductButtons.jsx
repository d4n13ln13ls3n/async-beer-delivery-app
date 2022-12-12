import React, { useState } from 'react';
import propTypes from 'prop-types';

export default function ProductButtons({ id, name, price }) {
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  const handleDecrease = () => {
    setQuantity(Number(quantity - 1 < 0 ? 0 : quantity - 1));
  };

  const handleIncrement = () => {
    setQuantity(Number(quantity + 1));
    setCart([...cart]);
  };
  console.log(cart);

  return (
    <div>
      <button
        data-testid={
          `customer_products__button-card-rm-item-${id}`
        }
        type="button"
        onClick={ handleDecrease }
        value={ quantity }
      >
        -
      </button>
      <input
        type="number"
        value={ quantity }
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ ({ target }) => setQuantity(target.value) }
      />
      <button
        data-testid={
          `customer_products__button-card-add-item-${id}`
        }
        type="button"
        onClick={ handleIncrement }
      >
        +
      </button>
      {/* <h4>{ totalPrice }</h4> */}
    </div>
  );
}

ProductButtons.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.string.isRequired,
};
