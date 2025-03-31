
import React from 'react';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import DeliveryTimeSlots from './DeliveryTimeSlots';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

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
                  : "border-gray-100"
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
                  : "border-gray-100"
              )}
              onClick={() => {}}
            >
              <span className="text-base">Завтра</span>
            </button>
            
            <button
              className={cn(
                "py-8 px-4 flex flex-col items-center justify-center rounded-2xl border-2 border-gray-100 transition-all duration-200"
              )}
            >
              <CalendarIcon size={24} className="mb-1" />
              <span className="text-base">Выбрать</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-500 mb-3">Время доставки</div>
          <DeliveryTimeSlots selectedDay={selectedTime} compact={true} />
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
