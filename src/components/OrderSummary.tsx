
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-sm p-3 mb-3 text-sm">
      <div className="flex items-center justify-between mb-2">
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
      
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <span className="font-medium text-base">{total} ₸</span>
          <button 
            className="text-xs text-gray-500 hover:text-gray-700 underline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Что в цене
          </button>
        </div>
      </div>
      
      <div className="mt-2">
        <button 
          className="flex items-center justify-between w-full py-2 text-[#4BA3E3] border-t border-[#F0F0F0] pt-2"
          onClick={() => {}}
        >
          <span className="font-medium">Комментарий магазину</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
