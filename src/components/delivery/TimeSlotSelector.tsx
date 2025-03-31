
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import DeliveryTimeSlots from './DeliveryTimeSlots';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
      <div className="flex items-center gap-2 mb-3">
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
        <DeliveryTimeSlots selectedDay={selectedTime} />
      )}
    </div>
  );
};

export default TimeSlotSelector;
