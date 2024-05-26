import DetailOrder from '@/components/dashboard/order/DetailOrder';
import React from 'react';
import 'tailwindcss/tailwind.css';

export default function Orderdetail({params}) {

  const {id} = params

  return <DetailOrder idPayment={+id} />;
}