import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ProductsContext from './ProductsContext';

function ProductsProvider({ children }) {
  const [price, setPrice] = useState('');

  const context = useMemo(() => ({
    price,
    setPrice,
  }), [price]);

  return (
    <ProductsContext.Provider value={ context }>
      {children}
    </ProductsContext.Provider>
  );
}

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductsProvider;
