
import React, { useState } from 'react';
import { MapPin, Clock, Truck, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface DeliveryPickupSelectorProps {
  onLocationFound?: (lat: number, lng: number) => void;
}

const DeliveryPickupSelector: React.FC<DeliveryPickupSelectorProps> = ({
  onLocationFound
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMethod === 'delivery' && !address.trim()) {
      toast({
        title: "Введите адрес",
        description: "Пожалуйста, укажите адрес доставки",
        variant: "destructive",
      });
      return;
    }

    // Store the address and delivery preferences
    localStorage.setItem('deliveryAddress', address);
    localStorage.setItem('deliveryMethod', selectedMethod);
    
    // Navigate to flower shop
    navigate('/flower-shop');
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Ошибка",
        description: "Ваш браузер не поддерживает геолокацию",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Определение местоположения",
      description: "Пожалуйста, подождите...",
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setAddress("Ваше текущее местоположение");
        
        if (onLocationFound) {
          onLocationFound(latitude, longitude);
        }
        
        toast({
          title: "Местоположение определено",
          description: "Мы нашли ваше местоположение"
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Не удалось определить местоположение";
        
        if (error.code === 1) {
          errorMessage = "Доступ к геолокации запрещен пользователем";
        }
        
        toast({
          title: "Ошибка",
          description: errorMessage,
          variant: "destructive",
        });
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-medium mb-4">Доставка цветов</h2>
      
      {/* Delivery/Pickup Method Selector */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className={cn(
            "cursor-pointer rounded-lg border-2 p-4 transition-all flex flex-col items-center justify-center text-center",
            selectedMethod === "delivery" 
              ? "border-primary bg-[#E5DEFF40]" 
              : "border-gray-100 hover:border-gray-200"
          )}
          onClick={() => setSelectedMethod("delivery")}
        >
          <Truck size={28} className={selectedMethod === "delivery" ? "text-primary" : "text-gray-500"} />
          <div className="mt-2 font-medium">Доставка</div>
          <p className="text-xs text-gray-500 mt-1">Доставим за 1-2 часа</p>
        </div>
        
        <div
          className={cn(
            "cursor-pointer rounded-lg border-2 p-4 transition-all flex flex-col items-center justify-center text-center",
            selectedMethod === "pickup" 
              ? "border-primary bg-[#F2FCE240]" 
              : "border-gray-100 hover:border-gray-200"
          )}
          onClick={() => setSelectedMethod("pickup")}
        >
          <ShoppingBag size={28} className={selectedMethod === "pickup" ? "text-primary" : "text-gray-500"} />
          <div className="mt-2 font-medium">Самовывоз</div>
          <p className="text-xs text-gray-500 mt-1">Готово через 30 мин</p>
        </div>
      </div>

      {/* Address Input or Store Selection */}
      <div className="mb-6">
        {selectedMethod === "delivery" ? (
          <div>
            <div className="relative mb-2">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Введите адрес доставки"
                className="pl-10 bg-[#F8F8F8] border-0"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs w-full justify-center items-center"
              onClick={handleGetLocation}
            >
              <MapPin size={14} className="mr-1.5" />
              Определить местоположение
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="w-full justify-center items-center"
            onClick={() => navigate('/flower-shop')}
          >
            <MapPin size={16} className="mr-1.5" />
            Выбрать магазин на карте
          </Button>
        )}
      </div>

      {/* Submit Button */}
      <Button onClick={handleSubmit} className="w-full">
        Перейти к выбору букета
      </Button>
    </div>
  );
};

export default DeliveryPickupSelector;
