
import React from 'react';
import { ChevronDown, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
  onSubmit,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-24 text-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium text-gray-900">Что в цене</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors"
          aria-label={isExpanded ? "Свернуть детали" : "Развернуть детали"}
        >
          <ChevronDown 
            size={18} 
            className={cn(
              "transition-transform duration-200",
              isExpanded ? "rotate-180 transform" : ""
            )} 
          />
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Товары в заказе</span>
          <span className="font-medium">{subtotal} ₸</span>
        </div>

        <div className="border-t border-gray-100 pt-3 mt-3">
          <div className="flex justify-between mb-5">
            <span className="font-medium text-gray-800">Итого</span>
            <span className="font-bold text-base">{total} ₸</span>
          </div>
          
          <Button
            onClick={onSubmit}
            className="w-full py-6 rounded-xl text-base"
            size="lg"
          >
            <CreditCard size={20} />
            <span>Оплатить</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
