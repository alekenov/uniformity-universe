
import React from 'react';
import { Clock, MessageSquare } from 'lucide-react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import DeliveryTimeSlots from './DeliveryTimeSlots';

interface TimeSlotSelectorProps {
  selectedTime: DeliveryTime;
  manualTimeSlot: boolean;
  askRecipientForTime: boolean;
  handleTimeSelectionMode: (mode: 'manual' | 'ask') => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedTime,
  manualTimeSlot,
  askRecipientForTime,
  handleTimeSelectionMode,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-sm text-gray-500 mb-1">
        <Clock size={16} className="mr-2" />
        Время доставки
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div 
          className={`delivery-option ${manualTimeSlot ? 'delivery-option-selected' : ''}`}
          onClick={() => handleTimeSelectionMode('manual')}
        >
          <span className="text-sm font-medium">Выбрать интервал</span>
        </div>
        
        <div 
          className={`delivery-option ${askRecipientForTime ? 'delivery-option-selected' : ''}`}
          onClick={() => handleTimeSelectionMode('ask')}
        >
          <span className="text-sm font-medium">Уточнить у получателя</span>
        </div>
      </div>
      
      {manualTimeSlot ? (
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-2">Выберите удобное время</p>
          <DeliveryTimeSlots selectedDay={selectedTime} />
        </div>
      ) : askRecipientForTime && (
        <div className="bg-gray-50 p-3 rounded-md mt-2">
          <p className="text-sm text-gray-500 flex items-center">
            <MessageSquare size={14} className="mr-2" />
            Мы сами уточним удобное время с получателем
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
