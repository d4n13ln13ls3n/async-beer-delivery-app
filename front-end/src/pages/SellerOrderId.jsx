import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import UpdateOrderBar from '../components/UpdateOrderBar';

export default function SellerOrderId() {
  const [currentStatus, setCurrentStatus] = useState('');
  const [CurrentOrderData, setCurrentOrderData] = useState({
    orderId,
    saleDate,
  });

  return (
    <div>
      <Navbar />
      <UpdateOrderBar
        orderId={ CurrentOrderData.orderId }
        date={ CurrentOrderData.date }
        currentStatus={ currentStatus }
        setCurrentStatus={ setCurrentStatus }
      />
    </div>
  );
}
