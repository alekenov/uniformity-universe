
import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DeliveryType = 'priority' | 'standard' | 'other';
export type DeliveryTime = 'today' | 'tomorrow';

interface DeliveryOption {
  id: DeliveryType;
  title: string;
  subtitle?: string;
  info?: string;
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
    subtitle: 'Самая быстрая',
    info: 'Сразу к вам',
    additionalPrice: 149,
  },
  {
    id: 'standard',
    title: 'Стандарт',
  },
  {
    id: 'other',
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
      <h2 className="text-4xl font-bold mb-8">Доставка</h2>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            className={cn(
              "delivery-option rounded-3xl border overflow-hidden aspect-[4/3]",
              selectedType === option.id 
                ? "border-primary" 
                : "border-gray-200",
              selectedType === option.id && option.id === 'standard' 
                ? "bg-[#F8F8F8]" 
                : "bg-white"
            )}
            onClick={() => onTypeChange(option.id)}
          >
            {option.additionalPrice && (
              <div className="absolute top-3 right-3 text-sm bg-white/80 rounded-full px-3 py-1">
                +{option.additionalPrice} ₽
              </div>
            )}
            
            {selectedType === option.id && option.id === 'standard' && (
              <div className="absolute top-3 left-3 rounded-full bg-black w-8 h-8 flex items-center justify-center">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            
            <div className="flex flex-col justify-end h-full p-5">
              <h3 className="text-xl font-bold mb-1">{option.title}</h3>
              {option.subtitle && (
                <p className="text-base text-gray-700">{option.subtitle}</p>
              )}
              {option.info && (
                <p className="text-lg text-[#33C3F0] mt-2">{option.info}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center mb-6">
        <Clock size={24} className="text-black mr-4" />
        <div className="flex rounded-full bg-[#F1F1F1] p-1.5 text-lg">
          <button
            className={cn(
              "px-8 py-2 rounded-full transition-colors",
              selectedTime === 'today'
                ? "bg-white shadow-sm font-bold"
                : "text-gray-500"
            )}
            onClick={() => onTimeChange('today')}
          >
            Сегодня
          </button>
          <button
            className={cn(
              "px-8 py-2 rounded-full transition-colors",
              selectedTime === 'tomorrow'
                ? "bg-white shadow-sm font-bold"
                : "text-gray-500"
            )}
            onClick={() => onTimeChange('tomorrow')}
          >
            Завтра
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[#F1F1F1] py-4 px-4 rounded-3xl text-center text-lg font-bold">
          120–150 мин
        </div>
        <div className="bg-[#F1F1F1] py-4 px-4 rounded-3xl text-center text-lg">
          18:00–19:00
        </div>
        <div className="bg-[#F1F1F1] py-4 px-4 rounded-3xl text-center text-lg">
          19:00–20:00
        </div>
        <div className="bg-[#F1F1F1] py-4 px-4 rounded-3xl text-center text-lg">
          20:00–21:00
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;
