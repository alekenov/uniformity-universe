
import React, { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LocationFinderProps {
  onLocationFound: (lat: number, lng: number) => void;
}

const LocationFinder: React.FC<LocationFinderProps> = ({ onLocationFound }) => {
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();

  const handleGetLocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Ошибка",
        description: "Ваш браузер не поддерживает геолокацию",
        variant: "destructive",
      });
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationFound(latitude, longitude);
        toast({
          title: "Местоположение определено",
          description: "Мы нашли ближайшие магазины к вам"
        });
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Не удалось определить местоположение";
        
        if (error.code === 1) {
          errorMessage = "Доступ к геолокации запрещен пользователем";
        } else if (error.code === 2) {
          errorMessage = "Информация о местоположении недоступна";
        } else if (error.code === 3) {
          errorMessage = "Истекло время ожидания запроса";
        }
        
        toast({
          title: "Ошибка",
          description: errorMessage,
          variant: "destructive",
        });
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      className="gap-2"
      onClick={handleGetLocation}
      disabled={isLocating}
    >
      {isLocating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <MapPin className="h-4 w-4" />
      )}
      Найти ближайшие магазины
    </Button>
  );
};

export default LocationFinder;
