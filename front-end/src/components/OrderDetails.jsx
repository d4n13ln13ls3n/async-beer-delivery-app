import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getData } from '../services/endPointRequest';

export default function OrderDetails({
  setCurrentStatus,
  setCurrentOrderData,
  currentPath,
}) {
  const [currentOrder, setCurrentOrder] = useState([]);
  const [userToken, setUserToken] = useState('');
  const location = useLocation();
  const { id } = location.state;
  //   const element = '_order_details__element-order-';

  const getOrderDetails = async (endpoint, orderId) => getData(
    `/sales/${orderId}/${endpoint}`,
    userToken,
  )
    .then((reponse) => {
      setCurrentOrderData({ orderId, saleDate });
      setCurrentStatus(reponse.status);
      setCurrentOrder(reponse);
      console.log(reponse);
    })
    .catch((error) => console.log(error));

  useEffect(() => {
    const token = readStorage('token');
    setUserToken(token);
  }, []);

  useEffect(() => {
    if (!currentOrder.length) {
      getOrderDetails(currentPath, id);
    }
  }, []);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <thead>
          {currentOrder.products.map(({
            name, quantity, price,
          }, index) => (
            <tr key={ index }>
              <td>{index}</td>
              <td>{name}</td>
              <td>{quantity}</td>
              <td>{price}</td>
              <td>{price * quantity}</td>
            </tr>
          ))}
        </thead>
      </table>
      <div>
        <p>{`Total R$${reponse.totalPrice}`}</p>
      </div>
    </>
  );
}

OrderDetails.defaultProps = {
  setCurrentStatus: () => {},
  setCurrentOrderData: () => {},
};

OrderDetails.propTypes = {
  setCurrentStatus: PropTypes.func,
  setCurrentOrderData: PropTypes.func,
  currentPath: PropTypes.string.isRequired,
};
