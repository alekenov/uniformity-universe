
import React, { useRef, useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export type DeliveryType = 'other' | 'self' | 'pickup';
export type DeliveryTime = 'today' | 'tomorrow';

interface DeliveryOption {
  id: DeliveryType;
  title: string;
  description?: string;
  additionalPrice?: number;
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
    color: '#E5DEFF',
  },
  {
    id: 'self',
    title: 'Сам получатель',
    color: '#FEF7CD',
  },
  {
    id: 'pickup',
    title: 'Самовывоз',
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

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
            <div className="flex flex-col items-center justify-center p-2 rounded-[16px]">
              <span className="text-sm font-medium">{option.title}</span>
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
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="px-4 py-1 text-sm rounded-full transition-all duration-200 text-gray-600 hover:bg-white/50"
              >
                {selectedDate ? 
                  format(selectedDate, 'dd MMM', { locale: ru }) : 
                  'Выбрать дату'}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{ before: new Date() }}
                initialFocus
                locale={ru}
              />
            </PopoverContent>
          </Popover>
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
