
import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger 
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface RegionCitySelectorProps {
  selectedRegion: string;
  selectedCity: string;
  onCityChange: (city: string) => void;
  compact?: boolean;
  className?: string;
}

const cities = [
  'Алматы',
  'Нур-Султан',
  'Шымкент',
  'Караганда',
  'Актобе',
  'Тараз',
  'Павлодар',
  'Усть-Каменогорск',
];

const RegionCitySelector: React.FC<RegionCitySelectorProps> = ({
  selectedRegion,
  selectedCity,
  onCityChange,
  compact = false,
  className = ''
}) => {
  const [open, setOpen] = useState(false);
  const [tempCity, setTempCity] = useState(selectedCity);
  const { toast } = useToast();

  const handleCityChange = (city: string) => {
    setTempCity(city);
  };

  const handleSubmit = () => {
    if (tempCity !== selectedCity) {
      onCityChange(tempCity);
      toast({
        title: "Город изменен",
        description: "Обратите внимание, что ассортимент и цены могут отличаться в разных городах",
      });
    }
    setOpen(false);
  };

  if (compact) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`px-2 text-sm flex items-center gap-1 h-8 ${className}`}
          >
            <MapPin size={15} className="text-primary" />
            <span className="font-medium">{selectedCity}</span>
            <ChevronDown size={14} className="opacity-50" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Выберите город</DialogTitle>
            <DialogDescription>
              Обратите внимание, что ассортимент и цены могут отличаться в разных городах
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-2 py-4">
            {cities.map((city) => (
              <div 
                key={city}
                onClick={() => handleCityChange(city)}
                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-colors ${
                  tempCity === city 
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-4 h-4 rounded-full flex items-center justify-center border border-gray-300">
                  {tempCity === city && (
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  )}
                </div>
                <span>{city}</span>
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button onClick={handleSubmit}>Выбрать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className={`mb-4 flex items-center justify-between bg-[#F8F8F8] px-3 py-2 rounded-lg ${className}`}>
      <div className="flex items-center">
        <MapPin size={18} className="text-gray-500 mr-2" />
        <div className="text-sm">
          <span className="font-medium">{selectedRegion}</span>
          <span className="mx-2">•</span>
          <span>{selectedCity}</span>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-primary h-6 px-2"
          >
            Изменить
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Выберите город</DialogTitle>
            <DialogDescription>
              Обратите внимание, что ассортимент и цены могут отличаться в разных городах
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-2 py-4">
            {cities.map((city) => (
              <div 
                key={city}
                onClick={() => handleCityChange(city)}
                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-colors ${
                  tempCity === city 
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-4 h-4 rounded-full flex items-center justify-center border border-gray-300">
                  {tempCity === city && (
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  )}
                </div>
                <span>{city}</span>
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button onClick={handleSubmit}>Выбрать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegionCitySelector;
