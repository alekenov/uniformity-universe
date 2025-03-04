
import React from 'react';
import { ChevronDown, CreditCard } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-sm p-4 mb-24 text-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-medium">Что в цене</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600"
        >
          <ChevronDown size={16} className={isExpanded ? "rotate-180 transform" : ""} />
        </button>
      </div>
      
      <div className="flex justify-between mb-2">
        <span>Товары в заказе</span>
        <span className="font-medium">{subtotal} ₸</span>
      </div>
      
      {isExpanded && (
        <>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span>Доставка</span>
              <ChevronDown size={14} className="ml-1 text-gray-400" />
            </div>
            <span>{deliveryFee === 0 ? "0 ₸" : `${deliveryFee} ₸`}</span>
          </div>
          
          <div className="flex justify-between mb-2">
            <span>Сервисный сбор</span>
            <span>{serviceFee} ₸</span>
          </div>
        </>
      )}

      <div className="border-t border-gray-100 mt-3 pt-3">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Итого</span>
          <span className="font-bold text-base">{total} ₸</span>
        </div>
        
        <button
          onClick={onSubmit}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <CreditCard size={20} />
          <span>Оплатить</span>
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
