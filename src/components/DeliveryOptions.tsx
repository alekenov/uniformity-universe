
import React from 'react';
import DeliveryTypeSelector from './delivery/DeliveryTypeSelector';
import DeliveryTimeSelector from './delivery/DeliveryTimeSelector';
import DeliveryTimeSlots from './delivery/DeliveryTimeSlots';

export type DeliveryType = 'other' | 'self' | 'pickup' | 'delivery';
export type DeliveryTime = 'today' | 'tomorrow';

interface DeliveryOptionsProps {
  selectedType: DeliveryType;
  selectedTime: DeliveryTime;
  onTypeChange: (type: DeliveryType) => void;
  onTimeChange: (time: DeliveryTime) => void;
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  selectedType,
  selectedTime,
  onTypeChange,
  onTimeChange,
}) => {
  return (
    <div className="panel">
      <h2 className="text-xl font-medium mb-4">Доставка</h2>
      
      <DeliveryTypeSelector 
        selectedType={selectedType} 
        onTypeChange={onTypeChange} 
      />
      
      <DeliveryTimeSelector 
        selectedTime={selectedTime} 
        onTimeChange={onTimeChange} 
      />
      
      <DeliveryTimeSlots selectedDay={selectedTime} />
    </div>
  );
};

export default DeliveryOptions;
