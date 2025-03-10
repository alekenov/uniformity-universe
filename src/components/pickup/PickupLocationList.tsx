
import React from 'react';
import { MapPin, Clock } from 'lucide-react';

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  readyTime: string;
}

interface PickupLocationListProps {
  locations: StoreLocation[];
  selectedStore: string;
  onSelectStore: (storeId: string) => void;
}

export const PickupLocationList: React.FC<PickupLocationListProps> = ({ 
  locations, 
  selectedStore, 
  onSelectStore 
}) => {
  return (
    <div className="space-y-3">
      {locations.map((store) => (
        <div 
          key={store.id} 
          className={`flex items-start p-3 rounded-lg cursor-pointer transition-all ${
            selectedStore === store.id 
              ? 'bg-white shadow-md border border-primary/40' 
              : 'bg-[#F8F8F8] hover:bg-[#F0F0F0] border border-transparent'
          }`}
          onClick={() => onSelectStore(store.id)}
        >
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
            selectedStore === store.id ? 'bg-primary/10 text-primary' : 'bg-white text-gray-600'
          }`}>
            <MapPin size={20} />
          </div>
          <div className="flex-grow">
            <div className="font-medium">{store.name}</div>
            <div className="text-sm text-gray-600">{store.address}</div>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <div className="flex items-center">
                <Clock size={12} className="mr-1" />
                Готово {store.readyTime}
              </div>
            </div>
          </div>
          {selectedStore === store.id && (
            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5L4 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
