
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("asap");

  const timeSlots = [
    { id: "asap", label: "Как можно скорее" },
    { id: "12-15", label: "12-15 час" },
    { id: "15-18", label: "15-18 час" },
    { id: "18-21", label: "18-21 час" },
    { id: "21-23", label: "21-23 час" }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Show navigation arrows for non-compact mode */}
      {!compact && (
        <>
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
      
      <div 
        ref={scrollContainerRef}
        className={cn(
          "flex overflow-x-auto pb-2 gap-3 scroll-smooth scrollbar-hide",
          compact ? "px-0" : "px-5"
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {timeSlots.map(slot => (
          <div 
            key={slot.id}
            className={cn(
              "text-sm py-2 px-4 rounded-full font-medium flex-shrink-0 cursor-pointer transition-all duration-200",
              selectedTimeSlot === slot.id 
                ? "bg-primary text-white" 
                : "bg-[#F8F8F8] hover:bg-[#F0F0F0] text-gray-700",
              compact && "text-xs py-1.5 px-3"
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
