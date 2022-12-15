import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailsTable from '../components/DetailsTable';
import Navbar from '../components/Navbar';
import UpdateOrderBarCustomer from '../components/UpdateOrderBarCustomer';
import { getData } from '../services/endPointRequest';
import { readStorage } from '../services/localStorageServices';

export default function Order() {
  const [order, setOrder] = useState({});
  const { id } = useParams();

  const getOrder = async () => {
    const token = readStorage('token');
    const sale = await getData(`/sales/${id}/customers`, token);
    setOrder(sale);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Navbar />
      <UpdateOrderBarCustomer order={ order } getOrder={ getOrder } />
      <DetailsTable products={ order.products || [] } />
      <p data-testid="customer_order_details__element-order-total-price">
        {`R$ ${Number(order.totalPrice).toFixed(2).replace('.', ',')}`}
      </p>
    </>
  );
}
