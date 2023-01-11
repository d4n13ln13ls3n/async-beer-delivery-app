import React from 'react';
import propTypes from 'prop-types';
import ProductButtons from './ProductButtons';
import '../styles/Products.css';

export default function Products({ price, urlImage, productName, id, product }) {
  return (
    <div className="card border-5 container-product-card shadow m-2 bg-body">
      <div className="priceContainer">
        <span>R$ </span>
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >

          { price.replace('.', ',') }
        </span>
      </div>
      <img
        className="mx-auto d-block "
        src={ urlImage }
        alt={ productName }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        width="100rem"
      />
      <div className="card-body">
        <p
          className="text-center"
          data-testid={ `customer_products__element-card-title-${id}` }
          value={ productName }
        >
          { productName }
        </p>
        <ProductButtons product={ product } />
      </div>
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
