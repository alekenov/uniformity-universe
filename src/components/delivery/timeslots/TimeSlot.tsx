
import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimeSlotData {
  id: string;
  label: string;
  isNearest?: boolean;
}

interface TimeSlotProps {
  slot: TimeSlotData;
  isSelected: boolean;
  forPickup: boolean;
  onSelect: (slotId: string) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  slot,
  isSelected,
  forPickup,
  onSelect,
}) => {
  return (
    <button
      key={slot.id}
      className={cn(
        "flex items-center gap-1 text-sm py-2 px-4 rounded-full whitespace-nowrap transition-all duration-200 active-scale",
        isSelected
          ? "bg-primary/10 text-primary font-medium" 
          : "bg-[#F8F8F8] hover:bg-[#F0F0F0] text-gray-700"
      )}
      onClick={() => onSelect(slot.id)}
    >
      {slot.isNearest && <MapPin size={14} className="icon-sm" />}
      {slot.label}
      {slot.isNearest && (
        <span className="text-xs text-gray-500 hidden sm:inline ml-1">(ближайшее)</span>
      )}
    </button>
  );
};

export default TimeSlot;
