
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.MouseEvent) => {
    // Prevent multiple clicks and default behavior
    e.preventDefault();
    if (isSubmitting) return;
    
    // Show loading state
    setIsSubmitting(true);
    
    // Use a reliable approach with significant delay
    setTimeout(() => {
      onSubmit();
      // Reset state after a delay to handle potential navigation issues
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }, 800);
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
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Оформление...
          </>
        ) : (
          buttonText
        )}
      </Button>
    </div>
  );
};

export default OrderSummary;
