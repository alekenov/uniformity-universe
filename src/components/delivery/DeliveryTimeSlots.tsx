
import React, { useState } from 'react';
import TimeSlotsContainer from './timeslots/TimeSlotsContainer';
import { 
  generateDeliveryTimeSlots, 
  generatePickupTimeSlots, 
  generatePickupHourSlots 
} from './timeslots/TimeSlotUtils';

interface DeliveryTimeSlotsProps {
  selectedDay: string; // 'today' | 'tomorrow' or a custom date
  className?: string;
  compact?: boolean;
  forPickup?: boolean; // Prop to indicate if this is for pickup locations
  selectedHour?: string;
  onHourSelect?: (hour: string) => void;
  useHourlyFormat?: boolean; // New prop to determine whether to use hourly format
}

const DeliveryTimeSlots: React.FC<DeliveryTimeSlotsProps> = ({ 
  selectedDay,
  className,
  compact = false,
  forPickup = false,
  selectedHour,
  onHourSelect,
  useHourlyFormat = false
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("12-30");
  
  // Choose which time slots to show based on the forPickup flag and useHourlyFormat
  const timeSlots = forPickup 
    ? (useHourlyFormat ? generatePickupHourSlots() : generatePickupTimeSlots()) 
    : generateDeliveryTimeSlots();

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
