import React from 'react';
import PropTypes from 'prop-types';
import { readStorage } from '../services/localStorageServices';
import { updateData } from '../services/endPointRequest';

export default function UpdateOrderBarSeller({ order, getOrder }) {
  const updateStatus = async () => {
    const token = readStorage('token');
    await updateData(`/sales/${order.id}`, token);
    await getOrder();
  };

  const dataTestId = 'customer_order_details__element-order-details-label-';

  return (
    <div>
      <h3>Detalhes do pedido</h3>
      <span data-testid={ `${dataTestId}order-id` }>{`Pedido ${order.id}`}</span>
      <span data-testid={ `${dataTestId}order-date` }>{order.saleDate}</span>
      <span data-testid={ `${dataTestId}delivery-status${order.id}` }>
        {order.status}
      </span>
      <button
        type="button"
        disabled={ order.status !== 'Pendente' }
        onClick={ updateStatus }
        data-testid="customer_order_details__button-delivery-check"
      >
        Preparar Pedido
      </button>
      <button
        type="button"
        disabled={ order.status !== 'Preparando' }
        onClick={ updateStatus }
        data-testid="customer_order_details__button-delivery-check"
      >
        Saiu Para Entrega
      </button>
    </div>
  );
}

UpdateOrderBarSeller.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    sellerName: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  getOrder: PropTypes.func.isRequired,
};
