import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { readStorage } from '../services/localStorageServices';
import { updateData } from '../services/endPointRequest';

export default function UpdateOrderBarCustomer({ order, getOrder }) {
  const [statusColor, setStatusColor] = useState('');
  const updateStatus = async () => {
    const token = readStorage('token');
    await updateData(`/sales/${order.id}`, token);
    await getOrder();
  };
  const dataTestId = 'customer_order_details__element-order-details-label-';

  const defineColor = async () => {
    if (order.status === 'Preparando') {
      setStatusColor('preparing');
    } if (order.status === 'Entregue') {
      setStatusColor('statusDelivered');
    } if (order.status === 'Pendente') {
      setStatusColor('statusPending');
    } if (order.status === 'Em Trânsito') {
      setStatusColor('statusOnTheWay');
    }
  };

  useEffect(() => {
    defineColor();
  });

  return (
    <div>
      <h3 className="detailsTitle">Detalhes do pedido</h3>
      <div className="costumerBar">
        <span data-testid={ `${dataTestId}order-id` } className="OrderID">
          {`PEDIDO: ${order.id};`}
        </span>
        <span data-testid={ `${dataTestId}seller-name` }>
          {`P. Vend: 
          ${order.sellerName}`}
        </span>
        <span data-testid={ `${dataTestId}order-date` } className="dateOrder">
          {order.saleDate}
        </span>
        <span
          data-testid={ `${dataTestId}delivery-status${order.id}` }
          className={ `buttonStatus ${statusColor}` }
        >
          {order.status}
        </span>
        <button
          type="button"
          disabled={ order.status !== 'Em Trânsito' }
          onClick={ updateStatus }
          data-testid="customer_order_details__button-delivery-check"
          className="buttonDelivered"
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
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
