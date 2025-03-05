
import React, { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import LocationFinder from '@/components/LocationFinder';

interface AddressInputProps {
  onAddressSubmit: (address: string) => void;
  onLocationFound: (lat: number, lng: number) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ 
  onAddressSubmit, 
  onLocationFound 
}) => {
  const [address, setAddress] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!address.trim()) {
      toast({
        title: "Введите адрес",
        description: "Пожалуйста, укажите адрес доставки",
        variant: "destructive",
      });
      return;
    }
    onAddressSubmit(address);
  };

  return (
    <div className="panel p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-medium mb-4">Куда доставить цветы?</h2>
      <div className="relative mb-4">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <MapPin size={20} />
        </div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Введите адрес доставки"
          className="w-full bg-[#F8F8F8] border-0 rounded-md py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={handleSubmit}
          className="flex-1 py-6 text-base font-medium rounded-md flex items-center justify-center"
        >
          Продолжить
          <ArrowRight className="ml-2" size={18} />
        </Button>
        <LocationFinder onLocationFound={onLocationFound} />
      </div>
    </div>
  );
};

export default AddressInput;
