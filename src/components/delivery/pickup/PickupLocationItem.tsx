
import React from 'react';
import { Store, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PickupLocation {
  id: string;
  name: string;
  address: string;
  openTime: string;
  closingTime: string;
  isReady?: boolean;
}

interface PickupLocationItemProps {
  location: PickupLocation;
  isSelected: boolean;
  isOpen: boolean;
  selectedHour: string;
  onSelect: (id: string) => void;
}

const PickupLocationItem: React.FC<PickupLocationItemProps> = ({
  location,
  isSelected,
  isOpen,
  selectedHour,
  onSelect,
}) => {
  return (
    <div 
      key={location.id}
      className={cn(
        "border rounded-lg p-3 cursor-pointer transition-all",
        isSelected 
          ? "border-primary bg-primary/5" 
          : "border-gray-200 hover:border-gray-300",
        !isOpen && "opacity-80"
      )}
      onClick={() => {
        if (isOpen) onSelect(location.id);
      }}
    >
      <div className="flex items-center gap-2">
        <Store size={16} className="text-gray-600" />
        <span className="font-medium text-sm">{location.name}</span>
        {isSelected && (
          <div className="ml-auto w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5L4 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      <div className="mt-1 text-sm text-gray-600">{location.address}</div>
      <div className="mt-2 text-xs flex items-center">
        {isOpen ? (
          <>
            <div className="flex items-center text-green-600">
              <Check size={14} className="mr-1" />
              <span>Можно забрать в {selectedHour}</span>
            </div>
            <div className="ml-2 text-gray-500">
              Открыто до {location.closingTime}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center text-red-500">
              <X size={14} className="mr-1" />
              <span>В {selectedHour} магазин закрыт</span>
            </div>
            <div className="ml-2 text-gray-500">
              Открыто до {location.closingTime}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PickupLocationItem;
