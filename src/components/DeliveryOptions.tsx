
import React, { useState, useEffect } from 'react';
import DeliveryTypeSelector from './delivery/DeliveryTypeSelector';
import DeliveryTimeSelector from './delivery/DeliveryTimeSelector';
import DeliveryTimeSlots from './delivery/DeliveryTimeSlots';
import GiftingFlow from './delivery/GiftingFlow';

export type DeliveryType = 'other' | 'self' | 'pickup';
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
  const [manualTimeSlot, setManualTimeSlot] = useState(false);
  const [askRecipientForTime, setAskRecipientForTime] = useState(true); // Default to true

  // Ensure our defaults are set when component mounts
  useEffect(() => {
    setManualTimeSlot(false);
    setAskRecipientForTime(true); // Default to true
  }, []);

  return (
    <div className="panel">
      <h2 className="text-xl font-medium mb-4">Доставка</h2>
      
      <DeliveryTypeSelector 
        selectedType={selectedType} 
        onTypeChange={onTypeChange} 
      />
      
      {selectedType === 'other' ? (
        <GiftingFlow 
          selectedTime={selectedTime}
          onTimeChange={onTimeChange}
          manualTimeSlot={manualTimeSlot}
          setManualTimeSlot={setManualTimeSlot}
          askRecipientForTime={askRecipientForTime}
          setAskRecipientForTime={setAskRecipientForTime}
        />
      ) : (
        <>
          <DeliveryTimeSelector 
            selectedTime={selectedTime} 
            onTimeChange={onTimeChange} 
          />
          
          <DeliveryTimeSlots selectedDay={selectedTime} />
        </>
      )}
    </div>
  );
};

export default DeliveryOptions;
