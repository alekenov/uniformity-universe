
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DeliveryTime } from '@/components/DeliveryOptions';

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
    <div className="bg-[#F8F8F8] rounded-full p-1 flex items-center">
      <button
        className={`flex-1 px-4 py-2 text-sm rounded-full transition-all duration-200 ${
          selectedTime === 'today'
            ? "bg-white shadow-sm font-medium" 
            : "text-gray-600 hover:bg-white/50"
        }`}
        onClick={() => onTimeChange('today')}
      >
        Сегодня
      </button>
      <button
        className={`flex-1 px-4 py-2 text-sm rounded-full transition-all duration-200 ${
          selectedTime === 'tomorrow'
            ? "bg-white shadow-sm font-medium"
            : "text-gray-600 hover:bg-white/50"
        }`}
        onClick={() => onTimeChange('tomorrow')}
      >
        Завтра
      </button>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="flex-1 px-4 py-2 text-sm rounded-full transition-all duration-200 text-gray-600 hover:bg-white/50"
          >
            <CalendarIcon size={16} className="inline-block mr-1" />
            Выбрать
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
  );
};

export default DateSelector;
