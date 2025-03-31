
import React, { useState } from 'react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import DeliveryTimeSelector from './DeliveryTimeSelector';
import DeliveryTimeSlots from './DeliveryTimeSlots';
import { MapPin, Truck, Store } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

type DeliveryMethod = 'delivery' | 'pickup';

interface SelfDeliveryFlowProps {
  selectedTime: DeliveryTime;
  onTimeChange: (time: DeliveryTime) => void;
}

interface PickupLocation {
  id: string;
  name: string;
  address: string;
  status: string;
}

const SelfDeliveryFlow: React.FC<SelfDeliveryFlowProps> = ({
  selectedTime,
  onTimeChange,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [comment, setComment] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Example pickup locations
  const pickupLocations: PickupLocation[] = [
    {
      id: 'loc1',
      name: 'Cvety.kz',
      address: 'ул. Абая 10',
      status: 'открыто до 20:00',
    },
    {
      id: 'loc2',
      name: 'Cvety.kz',
      address: 'ул. Сатпаева 4',
      status: 'осталось 3 букета',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Delivery Method Toggle */}
      <ToggleGroup 
        type="single" 
        value={deliveryMethod} 
        onValueChange={(value) => {
          if (value) setDeliveryMethod(value as DeliveryMethod);
        }}
        className="grid grid-cols-2 w-full p-1 bg-gray-100 rounded-lg"
      >
        <ToggleGroupItem 
          value="delivery" 
          className={cn(
            "rounded-md flex items-center justify-center gap-1.5 py-2",
            deliveryMethod === 'delivery' ? "bg-white shadow-sm" : "bg-transparent"
          )}
        >
          <Truck size={16} />
          <span className="text-sm">Доставка</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="pickup" 
          className={cn(
            "rounded-md flex items-center justify-center gap-1.5 py-2",
            deliveryMethod === 'pickup' ? "bg-white shadow-sm" : "bg-transparent"
          )}
        >
          <Store size={16} />
          <span className="text-sm">Самовывоз</span>
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Delivery Form */}
      {deliveryMethod === 'delivery' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="text-sm font-medium flex items-center gap-1.5">
                <MapPin size={16} className="text-gray-500" />
                Куда доставить?
              </div>
              
              <Input 
                placeholder="Улица и дом" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-sm"
              />
              
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  placeholder="Квартира / офис" 
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="text-sm"
                />
                <Button 
                  variant="outline"
                  size="sm" 
                  className="text-xs h-9"
                  onClick={() => navigator.geolocation.getCurrentPosition(
                    (position) => setAddress("Ваше местоположение"),
                    (error) => console.error(error)
                  )}
                >
                  <MapPin size={14} className="mr-1" />
                  Геолокация
                </Button>
              </div>
              
              <Textarea 
                placeholder="Комментарий (подъезд, этаж и т.д.)" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="text-sm h-20 resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="text-sm font-medium">Когда доставить?</div>
              <DeliveryTimeSlots selectedDay={selectedTime} compact={true} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pickup Form */}
      {deliveryMethod === 'pickup' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="text-sm font-medium">Откуда забрать?</div>
              
              <div className="space-y-2">
                {pickupLocations.map(location => (
                  <div 
                    key={location.id}
                    className={cn(
                      "border rounded-lg p-3 cursor-pointer transition-all",
                      selectedLocation === location.id 
                        ? "border-primary bg-primary/5" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Store size={16} className="text-gray-600" />
                      <span className="font-medium text-sm">{location.name}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">{location.address}</div>
                    <div className="mt-1 text-xs text-gray-500">{location.status}</div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-sm"
              >
                Показать на карте
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="text-sm font-medium">Когда забрать?</div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    "text-xs", 
                    selectedTime === 'today' && "bg-primary/10 text-primary border-primary/30"
                  )}
                  onClick={() => onTimeChange('today')}
                >
                  Как можно скорее
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                >
                  12–15
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                >
                  15–18
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SelfDeliveryFlow;
