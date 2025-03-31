
import React from 'react';
import { Clock } from 'lucide-react';
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
          onCheckedChange={(checked) => {
            // Explicitly convert to boolean to ensure it toggles properly
            setAskRecipientForTime(checked === true);
          }}
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
          <div className="flex items-center mb-4">
            <Clock size={20} className="text-gray-400 mr-2" />
            <div className="flex bg-[#F8F8F8] rounded-full p-1">
              <button
                className={cn(
                  "px-4 py-1.5 text-sm rounded-full transition-all duration-200",
                  selectedTime === 'today'
                    ? "bg-white shadow-sm font-medium" 
                    : "text-gray-600 hover:bg-white/50"
                )}
                onClick={() => {}}
              >
                Сегодня
              </button>
              <button
                className={cn(
                  "px-4 py-1.5 text-sm rounded-full transition-all duration-200",
                  selectedTime === 'tomorrow'
                    ? "bg-white shadow-sm font-medium"
                    : "text-gray-600 hover:bg-white/50"
                )}
                onClick={() => {}}
              >
                Завтра
              </button>
              <button
                className="px-4 py-1.5 text-sm rounded-full transition-all duration-200 text-gray-600 hover:bg-white/50"
              >
                31 мар.
              </button>
            </div>
          </div>
          <DeliveryTimeSlots selectedDay={selectedTime} compact={true} />
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
