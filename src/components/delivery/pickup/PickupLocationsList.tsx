
import React from 'react';
import { Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PickupLocationItem, { PickupLocation } from './PickupLocationItem';

interface PickupLocationsListProps {
  locations: PickupLocation[];
  selectedLocation: string | null;
  selectedHour: string;
  onLocationSelect: (locationId: string) => void;
  isStoreOpen: (location: PickupLocation, hour: string) => boolean;
}

const PickupLocationsList: React.FC<PickupLocationsListProps> = ({
  locations,
  selectedLocation,
  selectedHour,
  onLocationSelect,
  isStoreOpen,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {locations.map(location => (
          <PickupLocationItem 
            key={location.id}
            location={location}
            isSelected={selectedLocation === location.id}
            isOpen={isStoreOpen(location, selectedHour)}
            selectedHour={selectedHour}
            onSelect={onLocationSelect}
          />
        ))}
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full text-sm"
      >
        <Navigation size={16} className="mr-2" />
        Показать на карте
      </Button>
    </div>
  );
};

export default PickupLocationsList;
