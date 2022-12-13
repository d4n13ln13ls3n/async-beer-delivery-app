import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { signLogin } from '../services/endPointRequest';

export default function UpdateOrderBar({ date, orderStatus, orderId }) {
  const [isDisabledPrep, setIsDisabledPrep] = useState(false);
  const [isDisabledOFD, setIsDisabledOFD] = useState(true);
  const [status, newStatus] = useState();

  const orderStatusType = {
    OP: 'Pendente', // order Pendent
    OPrep: 'Preparando', // order Preparing
    OFD: 'Em Trânsito', // Out For Delivery
  };

  useEffect(() => {
    if (orderStatus === 'Pendente') {
      setIsDisabledPrep(false);
      setIsDisabledOFD(true);
      newStatus({ newStatus: orderStatusType.OP });
    }
    if (orderStatus === 'Preparando') {
      setIsDisabledPrep(true);
      setIsDisabledOFD(false);
      newStatus({ newStatus: orderStatusType.OFD });
    }
    if (orderStatus === 'Em Trânsito') {
      setIsDisabledPrep(true);
      setIsDisabledOFD(true);
      newStatus({ newStatus: orderStatusType.OFD });
    }
  }, [
    orderStatus,
    isDisabledPrep,
    isDisabledOFD,
    orderStatusType.OP,
    orderStatusType.OFD,
  ]);

  const changeOrderStatus = async (id, body) => {
    const changeStatus = await signLogin(`sales/${Number(id)}`, body);
    return changeStatus;
  };

  const handleButtonPreparing = async () => {
    setIsDisabledPrep(true);
    newStatus({ newStatus: orderStatusType.OP });
    await changeOrderStatus(orderId, status);
    setIsDisabledOFD(false);
  };

  const handleButtonOFD = async () => {
    setIsDisabledPrep(true);
    isDisabledOFD(true);
    newStatusSeller({ newStatus: orderStatusType.OFD });
    await changeOrderStatus(orderId, status);
  };

  return (
    <div>
      <p>{ orderId }</p>
      <p>{ date }</p>
      <p>{ status }</p>
      <button type="button" disabled={ isDisabledPrep } onClick={ handleButtonPreparing }>
        PREPARAR PEDIDO
      </button>
      <button type="button" disabled={ isDisabledOFD } onClick={ handleButtonOFD }>
        SAIU PARA ENTREGA
      </button>
    </div>
  );
}

UpdateOrderBar.propTypes = {
  date: PropTypes.string.isRequired,
  orderStatus: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
};
