
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface DeliveryTimeSlotsProps {
  selectedDay: string; // 'today' | 'tomorrow' or a custom date
  className?: string;
  compact?: boolean;
}

const DeliveryTimeSlots: React.FC<DeliveryTimeSlotsProps> = ({ 
  selectedDay,
  className,
  compact = false 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("12-30");

  // Updated time slots with nearest delivery time instead of "asap"
  const timeSlots = [
    { id: "12-30", label: "12:30" },
    { id: "12-15", label: "12-15 час" },
    { id: "15-18", label: "15-18 час" },
    { id: "18-21", label: "18-21 час" },
    { id: "21-23", label: "21-23 час" }
  ];

  return (
    <div className={cn("relative", className)}>
      <div 
        ref={scrollContainerRef}
        className={cn(
          "flex overflow-x-auto pb-2 gap-3 scroll-smooth scrollbar-hide",
          compact ? "px-0" : "px-1"
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {timeSlots.map(slot => (
          <div 
            key={slot.id}
            className={cn(
              "text-sm py-2 px-5 rounded-full font-medium flex-shrink-0 cursor-pointer transition-all duration-200",
              selectedTimeSlot === slot.id 
                ? "bg-gray-200 text-gray-800" 
                : "bg-[#F8F8F8] hover:bg-[#F0F0F0] text-gray-700"
            )}
            onClick={() => setSelectedTimeSlot(slot.id)}
          >
            {slot.label}
          </div>
        ))}
      </div>
      <style>
        {`.scrollbar-hide::-webkit-scrollbar {
          display: none;
        }`}
      </style>
    </div>
  );
};

export default DeliveryTimeSlots;
