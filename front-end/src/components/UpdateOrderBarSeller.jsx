import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { readStorage } from '../services/localStorageServices';
import { updateData } from '../services/endPointRequest';

export default function UpdateOrderBarSeller({ order, getOrder }) {
  const [statusColor, setStatusColor] = useState('');

  const updateStatus = async () => {
    const token = readStorage('token');
    await updateData(`/sales/${order.id}`, token);
    await getOrder();
  };

  const dataTestId = 'seller_order_details__element-order-details-label-';

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
        <span
          data-testid={ `${dataTestId}order-id` }
          className="OrderID"
        >
          {`Pedido ${order.id}`}

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
          disabled={ order.status !== 'Pendente' }
          onClick={ updateStatus }
          data-testid="seller_order_details__button-preparing-check"
          className="btn btn-success buttonDelivered"
        >
          Preparar Pedido
        </button>
        <button
          type="button"
          disabled={ order.status !== 'Preparando' }
          onClick={ updateStatus }
          data-testid="seller_order_details__button-dispatch-check"
          className="btn btn-success buttonDelivered"
        >
          Saiu Para Entrega
        </button>
      </div>
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
