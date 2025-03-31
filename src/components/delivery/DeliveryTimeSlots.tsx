
import React, { useState } from 'react';
import TimeSlotsContainer from './timeslots/TimeSlotsContainer';
import { generateDeliveryTimeSlots, generatePickupHourSlots } from './timeslots/TimeSlotUtils';

interface DeliveryTimeSlotsProps {
  selectedDay: string; // 'today' | 'tomorrow' or a custom date
  className?: string;
  compact?: boolean;
  forPickup?: boolean; // Prop to indicate if this is for pickup locations
  selectedHour?: string;
  onHourSelect?: (hour: string) => void;
}

const DeliveryTimeSlots: React.FC<DeliveryTimeSlotsProps> = ({ 
  selectedDay,
  className,
  compact = false,
  forPickup = false,
  selectedHour,
  onHourSelect
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("12-30");
  
  // Choose which time slots to show based on the forPickup flag
  const timeSlots = forPickup ? generatePickupHourSlots() : generateDeliveryTimeSlots();

  const handleTimeSlotSelection = (slotId: string) => {
    if (forPickup && onHourSelect) {
      onHourSelect(slotId);
    } else {
      setSelectedTimeSlot(slotId);
    }
  };

  return (
    <TimeSlotsContainer
      timeSlots={timeSlots}
      selectedSlotId={forPickup ? selectedHour || "" : selectedTimeSlot}
      forPickup={forPickup}
      onTimeSlotSelection={handleTimeSlotSelection}
      compact={compact}
      className={className}
    />
  );
};

export default DeliveryTimeSlots;
