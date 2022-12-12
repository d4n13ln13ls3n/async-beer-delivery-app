import React, { useContext } from 'react';
import propTypes from 'prop-types';
import CartContext from '../context/CartContext';

export default function ProductButtons({ product }) {
  const { cart, setCart } = useContext(CartContext);
  console.log(cart);

  // const handleDecrease = (item) => {
  //   const isAlreadyAddedOnCart = cart.some(
  //     (cartProduct) => cartProduct.id === item.id,
  //   );

  //   if (isAlreadyAddedOnCart) {
  //     setCart((prev) => prev.map((cartProduct) => {
  //       if (cartProduct.id === item.id) {
  //         return { ...cartProduct, quantity: cartProduct.quantity - 1 };
  //       }

  //       return cartProduct;
  //     }));
  //   } else if (item.quantity === 1) {
  //     setCart(cart.filter((cartItem) => cartItem.quantity !== 0));
  //   }
  // };

  const handleDecrease = () => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.quantity <= 0) {
        return cart.filter((item) => item.quantity <= 0);
      }
      cartItem.quantity -= 1;
      return cartItem;
    });

    return setCart(updatedCart);
  };

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

  // function updateQuantity(cartProductToUpdate, amount) {
  //   if (cartProductToUpdate.quantity + amount <= 0) {
  //     setCart((prev) => prev
  //       .filter((cartProduct) => cartProduct.id !== cartProductToUpdate.id));
  //   }

  //   setCart((prev) => prev.map((cartProduct) => {
  //     if (cartProduct.id === cartProductToUpdate.id) {
  //       return { ...cartProduct, quantity: cartProduct.quantity + amount };
  //     }

  //     return cartProduct;
  //   }));
  // }

  return (
    <div>
      <button
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        type="button"
        onClick={ handleDecrease }
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
      {/* <h4>{ totalPrice }</h4> */}
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
