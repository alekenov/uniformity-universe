
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface DeliveryTimeSlotsProps {
  selectedDay: string; // 'today' | 'tomorrow' or a custom date
}

const DeliveryTimeSlots: React.FC<DeliveryTimeSlotsProps> = ({ selectedDay }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("asap");

  const timeSlots = [
    { id: "asap", label: "Как можно скорее" },
    { id: "12-15", label: "12-15 час" },
    { id: "15-18", label: "15-18 час" },
    { id: "18-21", label: "18-21 час" },
    { id: "21-23", label: "21-23 час" }
  ];

  return (
    <div className="relative">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-2 gap-3 scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {timeSlots.map(slot => (
          <div 
            key={slot.id}
            className={cn(
              "text-sm py-2 px-4 rounded-full font-medium flex-shrink-0 cursor-pointer transition-all duration-200",
              selectedTimeSlot === slot.id 
                ? "bg-primary text-white" 
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
