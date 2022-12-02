import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import GenericTextDiv from './GenericTextDiv';

export default function OrderCard(orderId, date, price, address) {
  const { navbar } = useContext(GlobalContext);
  const genericDTId = '_orders__element-'; // Generic Data Test ID
  const userType = navbar.role;
  return (
    <Link to={ orderId }>
      <div>
        <GenericTextDiv
          text={ `Pedido ${orderId}` }
          datatestid={ `${userType}${genericDTId}order-${orderId}` }
        />
        <GenericTextDiv
          text={ OrderStatus }
          datatestid={ `${userType}${genericDTId}delivery-status-${orderId}` }
        />
        <GenericTextDiv
          text={ date }
          datatestid={ `${userType}${genericDTId}order-date-${orderId}` }
        />
        <GenericTextDiv
          text={ `R$ ${price}` }
          datatestid={ `${userType}${genericDTId}card-price-${orderId}` }
        />
        { userType === 'seller' ? (<p>{{ address }}</p>) : null}
      </div>
    </Link>
  );
}
