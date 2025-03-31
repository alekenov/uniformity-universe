
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DeliveryTime } from '@/components/DeliveryOptions';
import { cn } from '@/lib/utils';

interface DateSelectorProps {
  selectedTime: DeliveryTime;
  onTimeChange: (time: DeliveryTime) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedTime,
  onTimeChange,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <div>
      <div className="text-sm text-gray-500 mb-3">Дата доставки</div>
      <div className="grid grid-cols-3 gap-3">
        <button
          className={cn(
            "delivery-option py-3 transition-all duration-200 border-2 hover:shadow-sm rounded-lg overflow-hidden",
            selectedTime === 'today' 
              ? "border-primary bg-secondary shadow-sm" 
              : "border-gray-100 hover:border-gray-200"
          )}
          onClick={() => onTimeChange('today')}
        >
          <span className="text-sm font-medium">Сегодня</span>
        </button>
        
        <button
          className={cn(
            "delivery-option py-3 transition-all duration-200 border-2 hover:shadow-sm rounded-lg overflow-hidden",
            selectedTime === 'tomorrow' 
              ? "border-primary bg-secondary shadow-sm" 
              : "border-gray-100 hover:border-gray-200"
          )}
          onClick={() => onTimeChange('tomorrow')}
        >
          <span className="text-sm font-medium">Завтра</span>
        </button>
        
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="delivery-option py-3 transition-all duration-200 border-2 border-gray-100 hover:border-gray-200 hover:shadow-sm rounded-lg overflow-hidden flex items-center justify-center gap-2"
            >
              <CalendarIcon size={16} />
              <span className="text-sm font-medium">Выбрать</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
              }}
              disabled={{ before: new Date() }}
              initialFocus
              locale={ru}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateSelector;
