
import React, { useState, useEffect } from 'react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import { Separator } from '@/components/ui/separator';
import DateSelector from './DateSelector';
import TimeSlotSelector from './TimeSlotSelector';
import { MapPin, Navigation, Store, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import DeliveryAddress from './DeliveryAddress';

interface SelfDeliveryFlowProps {
  selectedTime: DeliveryTime;
  onTimeChange: (time: DeliveryTime) => void;
}

interface PickupLocation {
  id: string;
  name: string;
  address: string;
  readyTime: string;
  isReady?: boolean;
  closingTime?: string;
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

  // Updated pickup locations with more detailed information
  const pickupLocations: PickupLocation[] = [
    {
      id: 'loc1',
      name: 'Cvety.kz',
      address: 'ул. Абая 10',
      readyTime: '12:10',
      closingTime: '20:00',
    },
    {
      id: 'loc2',
      name: 'Cvety.kz',
      address: 'ул. Сатпаева 4',
      readyTime: 'сразу',
      isReady: true,
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
        
        {deliveryMethod === 'delivery' && (
          <TimeSlotSelector
            selectedTime={selectedTime}
            askRecipientForTime={askRecipientForTime}
            setAskRecipientForTime={setAskRecipientForTime}
            deliveryType="self"
          />
        )}
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
        <DeliveryAddress
          address={address}
          setAddress={setAddress}
          apartment={apartment}
          setApartment={setApartment}
          floor={floor}
          setFloor={setFloor}
          courierComment={comment}
          setCourierComment={setComment}
          askRecipientForAddress={askAddressDetails}
          setAskRecipientForAddress={setAskAddressDetails}
          showCourierComment={showCourierComment}
          toggleCourierComment={toggleCourierComment}
        />
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
                <div className="mt-1 text-xs text-gray-500 flex items-center">
                  <Clock size={12} className="mr-1" />
                  {location.isReady ? (
                    <span>Можно забрать сразу</span>
                  ) : (
                    <span>Забрать можно с {location.readyTime}</span>
                  )}
                  {location.closingTime && (
                    <span className="ml-2">открыто до {location.closingTime}</span>
                  )}
                </div>
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
