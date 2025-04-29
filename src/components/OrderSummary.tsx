import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  onSubmit: () => void;
  buttonText?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  deliveryFee,
  serviceFee,
  total,
  onSubmit,
  buttonText = "Оформить заказ"
}) => {
  const isMobile = useIsMobile();
  
  const handleSubmit = (e: React.MouseEvent) => {
    // Предотвращаем любые действия по умолчанию
    e.preventDefault();
    
    // Безусловно вызываем onSubmit с достаточной задержкой на мобильных устройствах
    setTimeout(() => {
      onSubmit();
    }, 500); // Установим значительную задержку для гарантированного срабатывания
  };
  
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
      
      <Button 
        onClick={handleSubmit} 
        className="w-full py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] active-scale"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default OrderSummary;
