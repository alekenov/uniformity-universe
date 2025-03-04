
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
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Что в цене</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600"
        >
          <ChevronDown size={20} className={isExpanded ? "rotate-180 transform" : ""} />
        </button>
      </div>
      
      <div className="flex justify-between mb-3">
        <span>Товары в заказе</span>
        <span className="font-medium">{subtotal} ₸</span>
      </div>
      
      {isExpanded && (
        <>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <span>Доставка</span>
              <ChevronDown size={16} className="ml-1 text-gray-400" />
            </div>
            <span>{deliveryFee === 0 ? "0 ₸" : `${deliveryFee} ₸`}</span>
          </div>
          
          <div className="flex justify-between mb-4">
            <span>Сервисный сбор</span>
            <span>{serviceFee} ₸</span>
          </div>
        </>
      )}
      
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium text-lg">{total} ₸</span>
            <button 
              className="ml-2 text-xs text-gray-500 hover:text-gray-700 underline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              Что в цене
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-[#FEF7F8] rounded-xl p-4 flex">
        <div className="mr-3 flex-shrink-0">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.3583 11.9833C27.025 14.65 27.025 18.95 24.3583 21.6083C21.6917 24.2667 17.3917 24.275 14.725 21.6083C12.0583 18.9417 12.0583 14.6417 14.725 11.9833C17.3917 9.325 21.6917 9.325 24.3583 11.9833Z" fill="#FF7E88"/>
            <path d="M31.225 7.125C26.5583 2.45833 19.1 2.19999 14.1333 6.21666C12.425 7.61666 11.1333 9.40833 10.3583 11.35C10.3 11.5083 10.35 11.6833 10.5 11.7417C10.6417 11.8 10.8167 11.75 10.875 11.6C12.7333 7.64166 16.7167 4.90833 21.2583 4.90833C28.3167 4.90833 34.0417 10.6333 34.0417 17.6917C34.0417 24.75 28.3167 30.475 21.2583 30.475C14.2 30.475 8.47497 24.75 8.47497 17.6917C8.47497 15.5167 9.02497 13.4333 10.0583 11.6C10.125 11.4917 10.1 11.3333 9.98331 11.2667C9.87497 11.2 9.71664 11.225 9.64997 11.3333C7.28331 15.1583 7.49164 20.1417 10.275 23.725C12.5417 26.6917 16.1583 28.4 19.8667 28.3083C19.8667 28.3083 21.7167 28.2333 22.1667 28.1083C26.25 27.3833 29.875 24.5667 31.5417 20.6083C32.9 17.3167 32.8417 13.5667 31.3333 10.3167C31.325 10.3 31.3 10.275 31.2833 10.25" fill="#4A454D"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium mb-1">Помощь рядом</p>
          <p className="text-xs text-gray-600">Подключите округление заказов, чтобы помогать благотворительным фондам</p>
        </div>
      </div>
      
      <div className="mt-4">
        <button 
          className="flex items-center justify-between w-full py-3 text-[#4BA3E3] border-t border-[#F0F0F0] pt-3"
          onClick={() => {}}
        >
          <span className="font-medium">Комментарий магазину</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
