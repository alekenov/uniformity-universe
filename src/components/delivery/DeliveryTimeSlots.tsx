
import React, { useRef, useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeliveryTimeSlotsProps {
  selectedDay: string; // 'today' | 'tomorrow' or a custom date
  className?: string;
  compact?: boolean;
  forPickup?: boolean; // New prop to indicate if this is for pickup locations
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("12-30");

  // Time slots for delivery
  const deliveryTimeSlots = [
    { id: "12-30", label: "12:30", isNearest: true },
    { id: "12-15", label: "12–15", isNearest: false },
    { id: "15-18", label: "15–18", isNearest: false }
  ];

  // Hourly time slots for pickup
  const pickupHourSlots = [
    { id: "12:00", label: "12:00" },
    { id: "13:00", label: "13:00" },
    { id: "14:00", label: "14:00" },
    { id: "15:00", label: "15:00" },
    { id: "16:00", label: "16:00" },
    { id: "17:00", label: "17:00" },
    { id: "18:00", label: "18:00" },
    { id: "19:00", label: "19:00" }
  ];

  // Choose which time slots to show based on the forPickup flag
  const timeSlots = forPickup ? pickupHourSlots : deliveryTimeSlots;

  const handleTimeSlotSelection = (slotId: string) => {
    if (forPickup && onHourSelect) {
      onHourSelect(slotId);
    } else {
      setSelectedTimeSlot(slotId);
    }
  };

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
              (forPickup ? selectedHour === slot.id : selectedTimeSlot === slot.id)
                ? "bg-primary/10 text-primary font-medium" 
                : "bg-[#F8F8F8] hover:bg-[#F0F0F0] text-gray-700"
            )}
            onClick={() => handleTimeSlotSelection(slot.id)}
          >
            {!forPickup && slot.isNearest && <MapPin size={14} className="text-gray-500" />}
            {slot.label}
            {!forPickup && slot.isNearest && (
              <span className="text-xs text-gray-500 hidden sm:inline ml-1">(ближайшее)</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeliveryTimeSlots;
