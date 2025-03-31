
import React, { useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
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

  // Time slots to match the requirements
  const timeSlots = [
    { id: "12-30", label: "12:30", isNearest: true },
    { id: "12-15", label: "12–15", isNearest: false },
    { id: "15-18", label: "15–18", isNearest: false }
  ];

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
          <button
            key={slot.id}
            className={cn(
              "flex items-center gap-1 text-sm py-2 px-4 rounded-full whitespace-nowrap transition-all duration-200",
              selectedTimeSlot === slot.id 
                ? "bg-primary/10 text-primary font-medium" 
                : "bg-[#F8F8F8] hover:bg-[#F0F0F0] text-gray-700"
            )}
            onClick={() => setSelectedTimeSlot(slot.id)}
          >
            {slot.isNearest && <MapPin size={14} className="text-gray-500" />}
            {slot.label}
            {slot.isNearest && (
              <span className="text-xs text-gray-500 hidden sm:inline ml-1">(ближайшее)</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeliveryTimeSlots;
