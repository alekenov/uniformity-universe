
import React, { useRef } from 'react';
import { Clock, Package, User, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DeliveryType = 'other' | 'self' | 'pickup';
export type DeliveryTime = 'today' | 'tomorrow';

interface DeliveryOption {
  id: DeliveryType;
  title: string;
  description?: string;
  additionalPrice?: number;
  icon: React.ReactNode;
  color: string;
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
    icon: <Package size={24} />,
    color: '#E5DEFF',
  },
  {
    id: 'self',
    title: 'Сам получатель',
    icon: <User size={24} />,
    color: '#FEF7CD',
  },
  {
    id: 'pickup',
    title: 'Самовывоз',
    icon: <Home size={24} />,
    color: '#F2FCE2',
  },
];

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  selectedType,
  selectedTime,
  onTypeChange,
  onTimeChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -120 : 120;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="panel">
      <h2 className="text-xl font-medium mb-4">Доставка</h2>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            className={cn(
              "delivery-option transition-all duration-200 border-2",
              selectedType === option.id 
                ? "border-primary shadow-sm" 
                : "border-transparent hover:border-gray-200"
            )}
            onClick={() => onTypeChange(option.id)}
          >
            {option.additionalPrice && (
              <div className="absolute top-2 right-2 text-xs bg-white rounded-full px-2 py-1 shadow-sm">
                +{option.additionalPrice} ₽
              </div>
            )}
            <div className="w-full pb-[75%] relative">
              <div className={cn(
                "absolute inset-0 flex flex-col items-center justify-center rounded-[16px]",
                selectedType === option.id 
                  ? "bg-white text-primary border border-primary/20" 
                  : `bg-[${option.color}] text-gray-600`
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                  selectedType === option.id 
                    ? "bg-primary/10 text-primary" 
                    : "bg-white/60 text-gray-600"
                )}>
                  {option.icon}
                </div>
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
              "px-4 py-1 text-sm rounded-full transition-all duration-200",
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
              "px-4 py-1 text-sm rounded-full transition-all duration-200",
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
      
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-2 gap-3 scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="bg-primary text-white text-sm py-2 px-4 rounded-full font-medium flex-shrink-0">
            Как можно скорее
          </div>
          <div className="bg-[#F8F8F8] hover:bg-[#F0F0F0] text-sm py-2 px-4 rounded-full flex-shrink-0 cursor-pointer transition-colors">
            12-15 час
          </div>
          <div className="bg-[#F8F8F8] hover:bg-[#F0F0F0] text-sm py-2 px-4 rounded-full flex-shrink-0 cursor-pointer transition-colors">
            15-18 час
          </div>
          <div className="bg-[#F8F8F8] hover:bg-[#F0F0F0] text-sm py-2 px-4 rounded-full flex-shrink-0 cursor-pointer transition-colors">
            18-21 час
          </div>
          <div className="bg-[#F8F8F8] hover:bg-[#F0F0F0] text-sm py-2 px-4 rounded-full flex-shrink-0 cursor-pointer transition-colors">
            21-23 час
          </div>
        </div>
        <style>
          {`.scrollbar-hide::-webkit-scrollbar {
            display: none;
          }`}
        </style>
      </div>
    </div>
  );
};

export default DeliveryOptions;
