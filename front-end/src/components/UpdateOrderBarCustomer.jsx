import React from 'react';
import PropTypes from 'prop-types';
import { readStorage } from '../services/localStorageServices';
import { updateData } from '../services/endPointRequest';

export default function UpdateOrderBarCustomer({ order, getOrder }) {
  const updateStatus = async () => {
    const token = readStorage('token');
    await updateData(`/sales/${order.id}`, token);
    await getOrder();
  };
  const dataTestId = 'customer_order_details__element-order-details-label-';

  return (
    <div>
      <h3>Detalhes do pedido</h3>
      <span data-testid={ `${dataTestId}order-id` }>{`Pedido: ${order.id}`}</span>
      <span data-testid={ `${dataTestId}seller-name` }>
        P.Vend:
        {order.sellerName}
      </span>
      <span data-testid={ `${dataTestId}order-date` }>{order.saleDate}</span>
      <span data-testid={ `${dataTestId}delivery-status${order.id}` }>
        {order.status}
      </span>
      <button
        type="button"
        disabled={ order.status !== 'Em Trânsito' }
        onClick={ updateStatus }
        data-testid="customer_order_details__button-delivery-check"
      >
        Marcar como entregue
      </button>
    </div>
  );
}

UpdateOrderBarCustomer.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    sellerName: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  getOrder: PropTypes.func.isRequired,
};
