
import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import DeliveryTimeSlots from './DeliveryTimeSlots';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface TimeSlotSelectorProps {
  selectedTime: DeliveryTime;
  askRecipientForTime: boolean;
  setAskRecipientForTime: (value: boolean) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedTime,
  askRecipientForTime,
  setAskRecipientForTime,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 mb-3">Время доставки</div>
      <div className="flex items-center gap-2 mb-4">
        <Checkbox 
          id="ask-recipient"
          checked={askRecipientForTime}
          onCheckedChange={(checked) => setAskRecipientForTime(checked as boolean)}
        />
        <label 
          htmlFor="ask-recipient" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Мы сами свяжемся с получателем и уточним удобное время
        </label>
      </div>

      {!askRecipientForTime && (
        <div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              className={cn(
                "py-8 px-4 flex flex-col items-center justify-center rounded-2xl border-2 transition-all duration-200",
                selectedTime === 'today'
                  ? "bg-[#F9F9F9] border-black font-medium"
                  : "border-gray-100 hover:border-gray-200"
              )}
              onClick={() => {}}
            >
              <span className="text-base">Сегодня</span>
            </button>
            
            <button
              className={cn(
                "py-8 px-4 flex flex-col items-center justify-center rounded-2xl border-2 transition-all duration-200",
                selectedTime === 'tomorrow'
                  ? "bg-[#F9F9F9] border-black font-medium"
                  : "border-gray-100 hover:border-gray-200"
              )}
              onClick={() => {}}
            >
              <span className="text-base">Завтра</span>
            </button>
            
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "py-8 px-4 flex flex-col items-center justify-center rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-200"
                  )}
                >
                  <CalendarIcon size={24} className="mb-1" />
                  <span className="text-base">Выбрать</span>
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
          
          <div className="text-sm text-gray-500 mb-3">Время доставки</div>
          <DeliveryTimeSlots selectedDay={selectedTime} />
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
