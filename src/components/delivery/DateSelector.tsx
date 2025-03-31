
import React, { useState } from 'react';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
              className={cn(
                "px-4 py-1 text-sm rounded-full transition-all duration-200",
                selectedDate && !['today', 'tomorrow'].includes(selectedTime) 
                  ? "bg-white shadow-sm font-medium" 
                  : "text-gray-600 hover:bg-white/50"
              )}
            >
              {selectedDate && !['today', 'tomorrow'].includes(selectedTime) ? 
                format(selectedDate, 'dd MMM', { locale: ru }) : 
                'Выбрать дату'}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                if (date) {
                  const today = new Date();
                  const tomorrow = new Date(today);
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  
                  const isToday = date.getDate() === today.getDate() && 
                                  date.getMonth() === today.getMonth() && 
                                  date.getFullYear() === today.getFullYear();
                  
                  const isTomorrow = date.getDate() === tomorrow.getDate() && 
                                    date.getMonth() === tomorrow.getMonth() && 
                                    date.getFullYear() === tomorrow.getFullYear();
                  
                  if (isToday) {
                    onTimeChange('today');
                  } else if (isTomorrow) {
                    onTimeChange('tomorrow');
                  } else {
                    // For custom dates that are not today or tomorrow
                    onTimeChange('today'); // Default to today's time slots
                  }
                }
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
