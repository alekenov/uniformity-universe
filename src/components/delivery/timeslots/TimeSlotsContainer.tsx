
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import TimeSlot, { TimeSlotData } from './TimeSlot';

interface TimeSlotsContainerProps {
  timeSlots: TimeSlotData[];
  selectedSlotId: string;
  forPickup: boolean;
  onTimeSlotSelection: (slotId: string) => void;
  compact?: boolean;
  className?: string;
}

const TimeSlotsContainer: React.FC<TimeSlotsContainerProps> = ({
  timeSlots,
  selectedSlotId,
  forPickup,
  onTimeSlotSelection,
  compact = false,
  className
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("relative", className)}>
      <div 
        ref={scrollContainerRef}
        className={cn(
          "flex gap-3 scroll-smooth overflow-x-auto pb-1",
          compact ? "px-0" : "px-1"
        )}
      >
        {timeSlots.map(slot => (
          <TimeSlot
            key={slot.id}
            slot={slot}
            isSelected={selectedSlotId === slot.id}
            forPickup={forPickup}
            onSelect={onTimeSlotSelection}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSlotsContainer;
