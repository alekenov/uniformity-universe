
import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DeliveryType = 'other' | 'self' | 'pickup';
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
    id: 'other',
    title: 'Заказ другому',
  },
  {
    id: 'self',
    title: 'Сам получатель',
  },
  {
    id: 'pickup',
    title: 'Самовывоз',
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
            <div className="w-full pb-[75%] relative">
              <div className={cn(
                "absolute inset-0 flex items-center justify-center rounded-[16px]",
                selectedType === option.id 
                  ? "bg-primary text-white" 
                  : "bg-[#F8F8F8] text-gray-400"
              )}>
                <span className="text-sm font-medium">{option.title}</span>
              </div>
            </div>
            {option.description && (
              <span className="text-xs text-gray-500">{option.description}</span>
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
        <div className="bg-[#F8F8F8] text-sm py-2 px-4 rounded-full font-medium text-primary">
          Как можно скорее
        </div>
        <div className="bg-[#F8F8F8] text-sm py-2 px-4 rounded-full">
          12-15 час
        </div>
        <div className="bg-[#F8F8F8] text-sm py-2 px-4 rounded-full">
          15-18 час
        </div>
        <div className="bg-[#F8F8F8] text-sm py-2 px-4 rounded-full">
          18-21 час
        </div>
        <div className="bg-[#F8F8F8] text-sm py-2 px-4 rounded-full">
          21-23 час
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;
