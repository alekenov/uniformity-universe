
import React from 'react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import DeliveryTimeSlots from './DeliveryTimeSlots';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface TimeSlotSelectorProps {
  selectedTime: DeliveryTime;
  askRecipientForTime: boolean;
  setAskRecipientForTime: (value: boolean) => void;
  deliveryType?: 'other' | 'self' | 'pickup';
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedTime,
  askRecipientForTime,
  setAskRecipientForTime,
  deliveryType = 'other'
}) => {
  // For "self" delivery type, show only time slots without checkbox
  if (deliveryType === 'self') {
    return (
      <div className="space-y-4">
        <DeliveryTimeSlots selectedDay={selectedTime} compact={true} />
      </div>
    );
  }

  // For pickup type, show time slots specific for pickup locations
  if (deliveryType === 'pickup') {
    return (
      <div className="space-y-4">
        <DeliveryTimeSlots selectedDay={selectedTime} compact={true} forPickup={true} />
      </div>
    );
  }

  // For "other" delivery type (gifting), show both time slots and the checkbox
  return (
    <div className="space-y-4">
      {!askRecipientForTime && (
        <div>
          <DeliveryTimeSlots selectedDay={selectedTime} compact={true} />
        </div>
      )}

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
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          <div>Уточнить время у получателя</div>
          <div className="text-xs text-gray-500 mt-1">Мы сами свяжемся и согласуем доставку</div>
        </label>
      </div>
    </div>
  );
};

export default TimeSlotSelector;
