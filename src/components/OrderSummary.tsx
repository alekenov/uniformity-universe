
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
    <div className="panel">
      <h3 className="font-medium text-lg mb-3">Детали заказа</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Товары:</span>
          <span className="text-sm">{subtotal} ₸</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Доставка:</span>
          <span className="text-sm">
            {deliveryFee === 0 ? "Бесплатно" : `${deliveryFee} ₸`}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Сервисный сбор:</span>
          <span className="text-sm">{serviceFee} ₸</span>
        </div>
      </div>
      
      <div className="border-t border-[#F0F0F0] pt-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Итого:</span>
          <span className="font-bold text-lg">{total} ₸</span>
        </div>
      </div>
      
      {/* Mobile version - compact summary with fixed position at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F0F0F0] p-4 shadow-lg z-10 md:hidden">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-700">Итого:</span>
          <span className="font-bold text-lg">{total} ₸</span>
        </div>
        <Button 
          onClick={onSubmit} 
          className="w-full py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] active-scale"
        >
          Оформить заказ
        </Button>
      </div>
      
      {/* Desktop version */}
      <div className="hidden md:block">
        <Button 
          onClick={onSubmit} 
          className="w-full py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] active-scale"
        >
          Оформить заказ
        </Button>
      </div>
      
      {/* Add padding to ensure content isn't hidden behind the fixed summary on mobile */}
      <div className="pb-24 md:pb-0"></div>
    </div>
  );
};

export default OrderSummary;
