import React, { useContext } from 'react';
import propTypes from 'prop-types';
import CartContext from '../context/CartContext';

export default function ProductButtons({ product }) {
  const { cart, setCart } = useContext(CartContext);

  function handleDecrease(item) {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });

    const filteredCart = updatedCart.filter((cartItem) => cartItem.quantity > 0);

    setCart(filteredCart);
  }

  function handleAddToCart(item) {
    const isAlreadyAddedOnCart = cart.some(
      (cartProduct) => cartProduct.id === item.id,
    );

    if (isAlreadyAddedOnCart) {
      setCart((prev) => prev.map((cartProduct) => {
        if (cartProduct.id === item.id) {
          return { ...cartProduct, quantity: cartProduct.quantity + 1 };
        }

        return cartProduct;
      }));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  }

  function findQuantity() {
    const NEGATIVEONE = -1;
    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== NEGATIVEONE) {
      const element = cart[index];
      return element.quantity;
    }

    return 0;
  }

  return (
    <div>
      <button
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        type="button"
        onClick={ () => handleDecrease(product) }
      >
        -
      </button>
      <input
        type="number"
        value={ findQuantity() }
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
        onChange={ ({ target }) => setCart(target.value) }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
        type="button"
        onClick={ () => handleAddToCart(product) }
      >
        +
      </button>
    </div>
  );
}

ProductButtons.propTypes = {
  product: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
  }).isRequired,
};
