import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { readStorage } from '../services/localStorageServices';

export default function DetailsTable({ products }) {
  const [role, setRole] = useState('');

  useEffect(() => {
    const user = readStorage('user');
    setRole(user.role);
  }, []);

  const dataTestId = `${role}_order_details__element-order-`;

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-Total</th>
        </tr>
      </thead>
      <tbody>
        {products
          && products.map((product, index) => (
            <tr key={ index }>
              <td data-testid={ `${dataTestId}table-item-number-${index}` }>
                {index + 1}
              </td>
              <td data-testid={ `${dataTestId}table-name-${index}` }>
                {product.name}
              </td>
              <td data-testid={ `${dataTestId}table-quantity-${index}` }>
                {product.quantity}
              </td>
              <td data-testid={ `${dataTestId}table-unit-price-${index}` }>
                {`R$ ${Number(product.price).toFixed(2).replace('.', ',')}`}
              </td>
              <td data-testid={ `${dataTestId}table-sub-total-${index}` }>
                {`R$ ${Number(product.price * product.quantity)
                  .toFixed(2)
                  .replace('.', ',')}`}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

DetailsTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.number,
      price: PropTypes.string,
    }),
  ).isRequired,
};
