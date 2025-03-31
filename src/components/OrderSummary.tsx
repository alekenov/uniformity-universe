
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  onSubmit: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  deliveryFee,
  serviceFee,
  total,
  onSubmit
}) => {
  return (
    <div>
      {/* Mobile version - compact summary with fixed position at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-700">Итого:</span>
          <span className="font-bold text-lg">{total} ₸</span>
        </div>
        <Button 
          onClick={onSubmit} 
          className="w-full py-3"
        >
          Оформить заказ
        </Button>
      </div>
      
      {/* Add padding to ensure content isn't hidden behind the fixed summary */}
      <div className="pb-24"></div>
    </div>
  );
};

export default OrderSummary;
