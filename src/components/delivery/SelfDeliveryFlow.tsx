
import React, { useState, useEffect } from 'react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import { Separator } from '@/components/ui/separator';
import DateSelector from './DateSelector';
import TimeSlotSelector from './TimeSlotSelector';
import { MapPin, Navigation, Store } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [floor, setFloor] = useState('');
  const [comment, setComment] = useState('');
  const [askAddressDetails, setAskAddressDetails] = useState(false);
  const [showCourierComment, setShowCourierComment] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [askRecipientForTime, setAskRecipientForTime] = useState(false);

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

  const toggleCourierComment = () => setShowCourierComment(!showCourierComment);

  return (
    <div className="space-y-6">
      {/* Date and Time Selection */}
      <div className="space-y-4">
        <DateSelector 
          selectedTime={selectedTime}
          onTimeChange={onTimeChange}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        
        <TimeSlotSelector
          selectedTime={selectedTime}
          askRecipientForTime={askRecipientForTime}
          setAskRecipientForTime={setAskRecipientForTime}
        />
      </div>
      
      <Separator className="bg-gray-100" />

      {/* Delivery Method Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Label className="text-sm font-medium">Способ получения</Label>
        </div>
        <div className="flex gap-3 mb-4">
          <Button
            type="button"
            variant={deliveryMethod === 'delivery' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDeliveryMethod('delivery')}
            className={cn(
              "flex-1 text-sm",
              deliveryMethod === 'delivery' && "bg-primary text-primary-foreground"
            )}
          >
            Доставка
          </Button>
          <Button
            type="button"
            variant={deliveryMethod === 'pickup' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDeliveryMethod('pickup')}
            className={cn(
              "flex-1 text-sm",
              deliveryMethod === 'pickup' && "bg-primary text-primary-foreground"
            )}
          >
            Самовывоз
          </Button>
        </div>
      </div>
      
      {/* Delivery Address or Pickup Location */}
      {deliveryMethod === 'delivery' ? (
        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <MapPin size={16} className="mr-2" />
            Адрес доставки
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox 
              id="askAddressDetails"
              checked={askAddressDetails}
              onCheckedChange={(checked) => {
                setAskAddressDetails(checked === true);
                if (checked === true) {
                  setAddress('');
                  setApartment('');
                  setFloor('');
                  setComment('');
                }
              }}
            />
            <label
              htmlFor="askAddressDetails"
              className="text-sm leading-none"
            >
              Уточнить адрес по телефону
            </label>
          </div>

          {!askAddressDetails && (
            <div className="space-y-4">
              <div>
                <Input 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Улица и номер дома" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Input 
                  value={apartment} 
                  onChange={(e) => setApartment(e.target.value)}
                  placeholder="Квартира/офис" 
                />
                <Input 
                  value={floor} 
                  onChange={(e) => setFloor(e.target.value)}
                  placeholder="Этаж" 
                />
              </div>
              
              {!showCourierComment ? (
                <Button 
                  variant="ghost" 
                  onClick={toggleCourierComment}
                  className="text-sm text-gray-500 p-0 h-auto hover:bg-transparent hover:text-gray-700"
                  type="button"
                >
                  + Добавить комментарий для курьера
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="courierComment" className="text-sm font-normal text-gray-500">
                      Комментарий курьеру
                    </Label>
                    <Button 
                      variant="ghost" 
                      onClick={toggleCourierComment}
                      className="text-xs text-gray-400 p-0 h-auto hover:bg-transparent hover:text-gray-700"
                      type="button"
                    >
                      Скрыть
                    </Button>
                  </div>
                  <Textarea 
                    id="courierComment" 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Код от двери, как найти подъезд, другие детали..." 
                    rows={2}
                    className="resize-none text-sm"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Store size={16} className="mr-2" />
            Пункт самовывоза
          </div>
          
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
            <Navigation size={16} className="mr-2" />
            Показать на карте
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelfDeliveryFlow;
