import React from 'react';
import products from '../mock/products';

export default function Checkout() {
  const vedendor = 'Fulana Pereira';
  return (
    <>
      <thead>
        <h3>Finalizar Pedido</h3>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        {products.map((pro) => (
          <tr key={ pro.id }>
            <td
              data-
              testid={ `customer_checkout__element-order-table-item-number-${pro.id}` }
            >
              {pro.id}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${pro.id}` }
            >
              {pro.name}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${pro.id}` }
            >
              {pro.id}
            </td>
            <td
              data-
              testid={ `customer_checkout__element-order-table-unit-price-${pro.id}` }
            >
              {Number(pro.price).toFixed(2)}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${pro.id}` }
            >
              {Number(pro.price) * Number(pro.id).toFixed(2)}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-remove-${pro.id}` }
            >
              <button type="button">
                Remover
              </button>
            </td>
          </tr>
        ))}
        <h3 data-testid="customer_checkout__element-order-total-price">Total</h3>
      </tbody>
      <h3>Detalhes e Endereço para Entrega</h3>
      <tbody>
        <tr>
          <th>P.Vendedora Responsável</th>
          <th> Endereço</th>
          <th>Número</th>
        </tr>
        <tr>
          <select data-testid="customer_checkout__select-seller">
            <option>
              { vedendor }
            </option>
          </select>
          <td>
            <input type="text" data-testid="customer_checkout__input-address" />
          </td>
          <td>
            <input type="text" data-testid="customer_checkout__input-address-number" />
          </td>
        </tr>
      </tbody>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </>
  );
}
