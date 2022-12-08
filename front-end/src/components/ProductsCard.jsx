import React from 'react';
import propTypes from 'prop-types';
import ProductButtons from './ProductButtons';

export default function Products({ price, urlImage, productName, id }) {
  return (
    <container>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </p>
      <img
        src={ urlImage }
        alt={ productName }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { productName }
      </p>
      <ProductButtons />
    </container>
  );
}

Products.propTypes = {
  id: propTypes.number.isRequired,
  productName: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  urlImage: propTypes.string.isRequired,
};
