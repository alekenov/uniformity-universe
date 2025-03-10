
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface DeliveryTimeSlotsProps {
  selectedDay: string; // 'today' | 'tomorrow' or a custom date
}

const DeliveryTimeSlots: React.FC<DeliveryTimeSlotsProps> = ({ selectedDay }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("asap");

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -120 : 120;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-2 gap-3 scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          className={cn(
            "text-sm py-2 px-4 rounded-full font-medium flex-shrink-0 cursor-pointer transition-all duration-200",
            selectedTimeSlot === "asap" 
              ? "bg-primary text-white" 
              : "bg-[#F8F8F8] hover:bg-[#F0F0F0] text-gray-700"
          )}
          onClick={() => setSelectedTimeSlot("asap")}
        >
          Как можно скорее
        </div>
        <div 
          className={cn(
            "text-sm py-2 px-4 rounded-full flex-shrink-0 cursor-pointer transition-all duration-200",
            selectedTimeSlot === "12-15" 
              ? "bg-primary text-white font-medium" 
              : "bg-[#F8F8F8] hover:bg-[#F0F0F0] text-gray-700"
          )}
          onClick={() => setSelectedTimeSlot("12-15")}
        >
          12-15 час
        </div>
        <div 
          className={cn(
            "text-sm py-2 px-4 rounded-full flex-shrink-0 cursor-pointer transition-all duration-200",
            selectedTimeSlot === "15-18" 
              ? "bg-primary text-white font-medium" 
              : "bg-[#F8F8F8] hover:bg-[#F0F0F0] text-gray-700"
          )}
          onClick={() => setSelectedTimeSlot("15-18")}
        >
          15-18 час
        </div>
        <div 
          className={cn(
            "text-sm py-2 px-4 rounded-full flex-shrink-0 cursor-pointer transition-all duration-200",
            selectedTimeSlot === "18-21" 
              ? "bg-primary text-white font-medium" 
              : "bg-[#F8F8F8] hover:bg-[#F0F0F0] text-gray-700"
          )}
          onClick={() => setSelectedTimeSlot("18-21")}
        >
          18-21 час
        </div>
        <div 
          className={cn(
            "text-sm py-2 px-4 rounded-full flex-shrink-0 cursor-pointer transition-all duration-200",
            selectedTimeSlot === "21-23" 
              ? "bg-primary text-white font-medium" 
              : "bg-[#F8F8F8] hover:bg-[#F0F0F0] text-gray-700"
          )}
          onClick={() => setSelectedTimeSlot("21-23")}
        >
          21-23 час
        </div>
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
