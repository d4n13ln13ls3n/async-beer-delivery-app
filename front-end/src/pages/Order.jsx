import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import DetailsTable from '../components/DetailsTable';
import Navbar from '../components/Navbar';
import UpdateOrderBarCustomer from '../components/UpdateOrderBarCustomer';
import { getData } from '../services/endPointRequest';
import { readStorage } from '../services/localStorageServices';
import '../styles/OrderDetails.css';
import '../styles/Checkout.css';

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
      <Container>
        <UpdateOrderBarCustomer order={ order } getOrder={ getOrder } />
        <DetailsTable
          products={ order.products || [] }
          totalPrice={ order.totalPrice || '' }
        />
        {/* <div className="totalContainer">
          <h3 data-testid="customer_order_details__element-order-total-price">
            {`Total: R$ ${Number(order.totalPrice).toFixed(2).replace('.', ',')}`}
          </h3>
        </div> */}
      </Container>
    </>
  );
}
