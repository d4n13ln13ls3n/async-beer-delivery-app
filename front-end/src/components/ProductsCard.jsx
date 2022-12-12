import React from 'react';
import propTypes from 'prop-types';
import ProductButtons from './ProductButtons';

export default function Products({ price, urlImage, productName, id, product }) {
  return (
    <div>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </p>
      <img
        src={ urlImage }
        alt={ productName }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        width="150px"
      />
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
        value={ productName }
      >
        { productName }
      </p>
      <ProductButtons product={ product } />
    </div>
  );
}

Products.propTypes = {
  id: propTypes.string.isRequired,
  productName: propTypes.string.isRequired,
  price: propTypes.string.isRequired,
  urlImage: propTypes.string.isRequired,
  product: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
  }).isRequired,
};
