import React, { useMemo, useState } from 'react';
import proptypes from 'prop-types';
import CartContext from './CartContext';

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const cartContext = useMemo(() => ({
    cart,
    setCart,
  }), [cart, setCart]);

  return (
    <CartContext.Provider value={ cartContext }>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: proptypes.node.isRequired,
};

export default CartProvider;
