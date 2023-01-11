import React from 'react';
import PropTypes from 'prop-types';
import '../styles/OrderDetails.css';

export default function UpdateStatus({ datatestid, progress }) {
  // // const [statusColor, setStatusColor] = useState('');

  // const defineColor = async () => {
  //   if (order.status === 'Preparando') {
  //     setStatusColor('statusPreparing');
  //   } if (order.status === 'Entregue') {
  //     setStatusColor('statusDelivered');
  //   } if (order.status === 'Pendente') {
  //     setStatusColor('statusPending');
  //   } if (order.status === 'Em Trânsito') {
  //     setStatusColor('statusOnTheWay');
  //   }
  // };

  // defineColor();

  const status = progress;
  const statusBg = status.replace(/\s+/g, '');
  return (
    <span
      data-testid={ datatestid }
      className={ `buttonStatus cardStatus ${statusBg}` }
    >
      {progress}
    </span>
  );
}

UpdateStatus.propTypes = {
  datatestid: PropTypes.string.isRequired,
  progress: PropTypes.string.isRequired,
};
