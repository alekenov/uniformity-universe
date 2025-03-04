
import React from 'react';
import { cn } from '@/lib/utils';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  onSubmit: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  total,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-24 text-sm">
      <div className="flex justify-between">
        <span className="font-medium text-gray-800">Итого</span>
        <span className="font-bold text-base">{total} ₸</span>
      </div>
    </div>
  );
};

export default OrderSummary;
