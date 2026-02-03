'use client';

import React, { useEffect, useState } from 'react';
import OrderInvoice from '../OrderInvoice';

export default function InvoicePage() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Get order data from localStorage
    const data = localStorage.getItem('currentInvoice');
    if (data) {
      setOrderData(JSON.parse(data));
    }
  }, []);

  return <OrderInvoice orderData={orderData} />;
}
