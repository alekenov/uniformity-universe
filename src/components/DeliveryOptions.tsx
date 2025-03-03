
import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DeliveryType = 'priority' | 'standard' | 'someone';
export type DeliveryTime = 'today' | 'tomorrow';

interface DeliveryOption {
  id: DeliveryType;
  title: string;
  description?: string;
  additionalPrice?: number;
}

interface DeliveryOptionsProps {
  selectedType: DeliveryType;
  selectedTime: DeliveryTime;
  onTypeChange: (type: DeliveryType) => void;
  onTimeChange: (time: DeliveryTime) => void;
}

const deliveryOptions: DeliveryOption[] = [
  {
    id: 'priority',
    title: 'Приоритет',
    description: 'Самая быстрая',
    additionalPrice: 199,
  },
  {
    id: 'standard',
    title: 'Стандарт',
  },
  {
    id: 'someone',
    title: 'Заказ другому',
  },
];

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  selectedType,
  selectedTime,
  onTypeChange,
  onTimeChange,
}) => {
  return (
    <div className="panel">
      <h2 className="text-xl font-medium mb-4">Доставка</h2>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            className={cn(
              "delivery-option",
              selectedType === option.id && "delivery-option-selected"
            )}
            onClick={() => onTypeChange(option.id)}
          >
            {option.additionalPrice && (
              <div className="absolute top-2 right-2 text-xs text-gray-500">+{option.additionalPrice} ₽</div>
            )}
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-1",
              selectedType === option.id 
                ? "bg-primary text-white" 
                : "bg-[#F8F8F8] text-gray-400"
            )}>
              {option.id === 'priority' && (
                <div className="w-4 h-4 rounded-full bg-white"></div>
              )}
              {option.id === 'standard' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {option.id === 'someone' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <span className="text-sm font-medium">{option.title}</span>
            {option.description && (
              <span className="text-xs text-gray-500">{option.description}</span>
            )}
            {option.id === 'priority' && (
              <span className="text-xs text-[#4BA3E3]">Сразу к вам</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center mb-4">
        <Clock size={20} className="text-gray-400 mr-2" />
        <div className="flex bg-[#F8F8F8] rounded-full p-1">
          <button
            className={cn(
              "px-4 py-1 text-sm rounded-full transition-colors",
              selectedTime === 'today'
                ? "bg-white shadow-sm font-medium"
                : "text-gray-600 hover:bg-white/50"
            )}
            onClick={() => onTimeChange('today')}
          >
            Сегодня
          </button>
          <button
            className={cn(
              "px-4 py-1 text-sm rounded-full transition-colors",
              selectedTime === 'tomorrow'
                ? "bg-white shadow-sm font-medium"
                : "text-gray-600 hover:bg-white/50"
            )}
            onClick={() => onTimeChange('tomorrow')}
          >
            Завтра
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div className="bg-[#F8F8F8] text-sm py-2 px-4 rounded-full">
          120-150 мин
        </div>
        <button className="bg-[#F8F8F8] text-sm py-2 px-4 rounded-full flex items-center">
          Места на Завтра
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DeliveryOptions;
