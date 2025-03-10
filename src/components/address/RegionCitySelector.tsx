
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RegionCitySelectorProps {
  selectedRegion: string;
  selectedCity: string;
  onCityChange: () => void;
}

const RegionCitySelector: React.FC<RegionCitySelectorProps> = ({
  selectedRegion,
  selectedCity,
  onCityChange
}) => {
  return (
    <div className="mb-4 flex items-center justify-between bg-[#F8F8F8] px-3 py-2 rounded-lg">
      <div className="flex items-center">
        <MapPin size={18} className="text-gray-500 mr-2" />
        <div className="text-sm">
          <span className="font-medium">{selectedRegion}</span>
          <span className="mx-2">•</span>
          <span>{selectedCity}</span>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-xs text-primary h-6 px-2"
        onClick={onCityChange}
      >
        Изменить
      </Button>
    </div>
  );
};

export default RegionCitySelector;
