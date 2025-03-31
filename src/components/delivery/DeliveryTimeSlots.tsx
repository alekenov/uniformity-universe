
import React, { useState } from 'react';
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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("12-30");

  // Time slots to match the image
  const timeSlots = [
    { id: "12-30", label: "12:30" },
    { id: "12-15", label: "12-15 час" },
    { id: "15-18", label: "15-18 час" }
  ];

  return (
    <div className={cn("relative", className)}>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {timeSlots.map(slot => (
          <div 
            key={slot.id}
            className={cn(
              "text-sm py-2.5 px-5 rounded-full font-medium cursor-pointer transition-all duration-200 whitespace-nowrap",
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
    </div>
  );
};

export default DeliveryTimeSlots;
