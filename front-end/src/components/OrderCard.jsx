import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getData } from '../services/endPointRequest';
import { readStorage } from '../services/localStorageServices';

export default function OrderCard() {
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState('');
  const [userToken, setUserToken] = useState('');
  const genericDTId = '_orders__element-'; // Generic Data Test ID
  const location = useLocation();
  console.log(userType);
  console.log(data);

  useEffect(() => {
    const token = readStorage('token');
    setUserToken(token);
  }, []);

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    const fetchOrders = async (route) => {
      console.log(path);
      setUserType(path);
      const response = await getData(`sales/${route}s`, userToken);
      setData(response);
    };
    fetchOrders(path);
  }, [location.pathname, userToken]);

  return (
    <div>
      { data.map((order) => {
        const {
          id,
          saleDate,
          totalPrice,
          status,
          deliveryAddress,
          deliveryNumber,
        } = order;
        return (
          <div key={ id }>
            <Link to={ `orders/${id}` }>
              <div>
                <p data-testid={ `${userType}${genericDTId}order-${id}` }>
                  {`Pedido ${id}`}
                </p>
              </div>
              <div>
                <p
                  data-testid={ `${userType}${genericDTId}delivery-status-${id}` }
                >
                  {status}
                </p>
              </div>
              <div>
                <p data-testid={ `${userType}${genericDTId}order-date-${id}` }>
                  {saleDate}
                </p>
              </div>
              <div>
                <p data-testid={ `${userType}${genericDTId}card-price-${id}` }>
                  {`R$ ${totalPrice}`}
                </p>
              </div>
              {userType === 'seller' ? (
                <p>{`${deliveryAddress}, N ${deliveryNumber}`}</p>
              ) : null}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
