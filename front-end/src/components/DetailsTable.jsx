import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { readStorage } from '../services/localStorageServices';

export default function DetailsTable({ products, totalPrice }) {
  const [role, setRole] = useState('');

  useEffect(() => {
    const user = readStorage('user');
    setRole(user.role);
  }, []);

  const dataTestId = `${role}_order_details__element-order-`;
  return (
    <div className="OrderDetailsContainer">
      <Table>
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
                <td
                  data-testid={ `${dataTestId}table-item-number-${index}` }
                  className="numberTable rounded-start"
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `${dataTestId}table-name-${index}` }
                  className="descriptionTable"
                >
                  {product.name}
                </td>
                <td
                  data-testid={ `${dataTestId}table-quantity-${index}` }
                  className="quantityTable"
                >
                  {product.quantity}
                </td>
                <td
                  data-testid={ `${dataTestId}table-unit-price-${index}` }
                  className="valueItem"
                >
                  {`R$ ${Number(product.price).toFixed(2).replace('.', ',')}`}
                </td>
                <td
                  data-testid={ `${dataTestId}table-sub-total-${index}` }
                  className="partialValue rounded-end"
                >
                  {`R$ ${Number(product.price * product.quantity)
                    .toFixed(2)
                    .replace('.', ',')}`}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="totalContainer">
        <h3 data-testid={ `${role}_order_details__element-order-total-price` }>
          {`Total: R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}`}
        </h3>
      </div>
    </div>
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
  totalPrice: PropTypes.string.isRequired,
};
