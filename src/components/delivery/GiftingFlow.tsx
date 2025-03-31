
import React, { useState, useEffect } from 'react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import { Separator } from '@/components/ui/separator';
import DateSelector from './DateSelector';
import TimeSlotSelector from './TimeSlotSelector';
import RecipientInfo from './RecipientInfo';
import DeliveryAddress from './DeliveryAddress';

interface GiftingFlowProps {
  selectedTime: DeliveryTime;
  onTimeChange: (time: DeliveryTime) => void;
  manualTimeSlot: boolean;
  setManualTimeSlot: (value: boolean) => void;
  askRecipientForTime: boolean;
  setAskRecipientForTime: (value: boolean) => void;
}

const GiftingFlow: React.FC<GiftingFlowProps> = ({
  selectedTime,
  onTimeChange,
  manualTimeSlot,
  setManualTimeSlot,
  askRecipientForTime,
  setAskRecipientForTime,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [floor, setFloor] = useState('');
  const [courierComment, setCourierComment] = useState('');
  const [askRecipientForAddress, setAskRecipientForAddress] = useState(false);
  const [showCourierComment, setShowCourierComment] = useState(false);
  
  // Set askRecipientForTime to false by default
  useEffect(() => {
    if (askRecipientForTime) {
      setAskRecipientForTime(false);
    }
  }, []);
  
  const toggleCourierComment = () => setShowCourierComment(!showCourierComment);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <DateSelector 
          selectedTime={selectedTime}
          onTimeChange={onTimeChange}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        
        <TimeSlotSelector
          selectedTime={selectedTime}
          askRecipientForTime={askRecipientForTime}
          setAskRecipientForTime={setAskRecipientForTime}
        />
      </div>
      
      <Separator className="bg-gray-100" />

      <RecipientInfo
        recipientName={recipientName}
        setRecipientName={setRecipientName}
        recipientPhone={recipientPhone}
        setRecipientPhone={setRecipientPhone}
      />

      <Separator className="bg-gray-100" />
      
      <DeliveryAddress
        address={address}
        setAddress={setAddress}
        apartment={apartment}
        setApartment={setApartment}
        floor={floor}
        setFloor={setFloor}
        courierComment={courierComment}
        setCourierComment={setCourierComment}
        askRecipientForAddress={askRecipientForAddress}
        setAskRecipientForAddress={setAskRecipientForAddress}
        showCourierComment={showCourierComment}
        toggleCourierComment={toggleCourierComment}
      />
    </div>
  );
};

export default GiftingFlow;
