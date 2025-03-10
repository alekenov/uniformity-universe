
import React, { useState } from 'react';
import { MapPin, Navigation, ShoppingBag, Store, ChevronDown, ChevronRight } from 'lucide-react';
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
  const [askRecipient, setAskRecipient] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Города и текущий город
  const cities = ['Усть-Каменогорск', 'Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Тараз', 'Павлодар'];
  const [selectedCity, setSelectedCity] = useState('Алматы');
  const [showCitySelector, setShowCitySelector] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMethod === 'delivery' && !address.trim() && !askRecipient) {
      toast({
        title: "Введите адрес",
        description: "Пожалуйста, укажите адрес доставки или выберите опцию уточнить у получателя",
        variant: "destructive",
      });
      return;
    }

    // Store the address and delivery preferences
    localStorage.setItem('deliveryAddress', address);
    localStorage.setItem('deliveryMethod', selectedMethod);
    localStorage.setItem('askRecipient', askRecipient.toString());
    localStorage.setItem('selectedCity', selectedCity);
    
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

  const selectCity = (city: string) => {
    setSelectedCity(city);
    setShowCitySelector(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Выбор города - заметная кнопка сверху */}
      <div className="p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-base font-medium text-gray-700">
          {selectedMethod === 'delivery' ? 'Доставка цветов' : 'Самовывоз цветов'}
        </h2>
        
        <div 
          className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-full border border-pink-200 cursor-pointer shadow-sm"
          onClick={() => setShowCitySelector(!showCitySelector)}
        >
          <MapPin size={14} className="text-pink-500" />
          <span className="text-sm font-medium">{selectedCity}</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
      
      {/* Выпадающий список городов */}
      {showCitySelector && (
        <div className="absolute mt-1 left-4 right-4 max-w-xl mx-auto bg-white shadow-lg z-30 rounded-lg border border-gray-200">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-700">Выберите город</h3>
          </div>
          <div className="max-h-60 overflow-y-auto p-2">
            {cities.map((city) => (
              <div 
                key={city}
                className={`p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg flex items-center ${selectedCity === city ? 'bg-pink-50' : ''}`}
                onClick={() => selectCity(city)}
              >
                {selectedCity === city && <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>}
                <span className={`text-sm ${selectedCity === city ? 'font-medium text-pink-600' : ''}`}>{city}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Компактные табы */}
      <div className="flex border-b">
        <button
          className={`py-2.5 flex-1 text-center text-sm ${selectedMethod === 'delivery' ? 'font-semibold border-b-2 border-pink-500 text-pink-600' : 'text-gray-500'}`}
          onClick={() => setSelectedMethod('delivery')}
        >
          <div className="flex items-center justify-center gap-1.5">
            <ShoppingBag size={15} />
            <span>Доставка</span>
          </div>
        </button>
        <button
          className={`py-2.5 flex-1 text-center text-sm ${selectedMethod === 'pickup' ? 'font-semibold border-b-2 border-pink-500 text-pink-600' : 'text-gray-500'}`}
          onClick={() => setSelectedMethod('pickup')}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Store size={15} />
            <span>Самовывоз</span>
          </div>
        </button>
      </div>
      
      <div className="p-3">
        {/* Поле адреса с кнопкой поиска */}
        <div className="relative mb-2">
          <div className="flex">
            {/* Поле адреса */}
            <input
              type="text"
              className="flex-1 p-2.5 pl-3 border border-gray-300 rounded-l-lg outline-none text-sm"
              placeholder={selectedMethod === 'delivery' 
                ? `Введите адрес доставки в ${selectedCity}` 
                : `Где искать магазины в ${selectedCity}?`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={selectedMethod === 'delivery' && askRecipient}
            />
            
            {/* Кнопка поиска */}
            <button 
              className="bg-pink-500 text-white rounded-r-lg px-3 flex items-center justify-center hover:bg-pink-600"
              onClick={handleSubmit}
              disabled={!address.trim() && !(selectedMethod === 'delivery' && askRecipient)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Кнопка локации - заметная, но компактная */}
        <button 
          onClick={handleGetLocation}
          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 mb-2"
        >
          <Navigation size={15} className="text-blue-500" />
          <span className="text-sm font-medium">Использовать мою локацию</span>
        </button>
        
        {/* Опция "Уточнить у получателя" */}
        {selectedMethod === 'delivery' && (
          <div className="flex items-center mb-1">
            <input
              id="ask-recipient"
              type="checkbox"
              checked={askRecipient}
              onChange={() => setAskRecipient(!askRecipient)}
              className="h-4 w-4 text-pink-600 rounded"
            />
            <label htmlFor="ask-recipient" className="ml-2 text-sm text-gray-600">
              Уточнить адрес у получателя
            </label>
          </div>
        )}
      </div>

      {/* Submit Button - Only show if not using the search button approach */}
      {false && (
        <div className="p-3 pt-0">
          <Button onClick={handleSubmit} className="w-full">
            Перейти к выбору букета
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeliveryPickupSelector;
