import React from 'react';
import OrderCard from '../components/OrderCard';

const apiResponse = [
  {
    id: 1,
    orderDate: '01/01/2020',
    totalPrice: 10,
    costumerAddress: 'Rua do Bobo, nº 0',
    orderStatus: 'pendente',
  },
];

export default function Seller() {
  return (
    <main>
      {apiResponse.map((order) => (
        <OrderCard
          key={ order.id }
          orderId={ order.id }
          orderDate={ order.date }
          totalPrice={ order.totalPrice }
          costumerAddress={ order.costumerAddress }
          orderStatus={ order.orderStatus }
        />
      ))}
    </main>
  );
}
