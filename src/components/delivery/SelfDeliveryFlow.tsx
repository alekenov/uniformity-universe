
import React, { useState, useEffect } from 'react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import { Separator } from '@/components/ui/separator';
import DateSelector from './DateSelector';
import TimeSlotSelector from './TimeSlotSelector';
import { Store, Navigation, Clock, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
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
  openTime: string;
  closingTime: string;
  isReady?: boolean;
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
  const [showCourierComment, setShowCourierComment] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>('loc1'); // Default to first location
  const [askRecipientForTime, setAskRecipientForTime] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string>("12:00");

  // Updated pickup locations with more detailed information
  const pickupLocations: PickupLocation[] = [
    {
      id: 'loc1',
      name: 'Cvety.kz',
      address: 'ул. Абая 10',
      openTime: '10:00',
      closingTime: '20:00',
      isReady: false,
    },
    {
      id: 'loc2',
      name: 'Cvety.kz',
      address: 'ул. Сатпаева 4',
      openTime: '09:00',
      closingTime: '12:00',
      isReady: true,
    },
  ];

  const toggleCourierComment = () => setShowCourierComment(!showCourierComment);

  // Check if store is open at the selected time
  const isStoreOpen = (location: PickupLocation, hour: string) => {
    // Convert times to comparable numbers (e.g., "13:00" -> 1300)
    const timeToNumber = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 100 + minutes;
    };

    const selectedTimeNum = timeToNumber(hour);
    const openTimeNum = timeToNumber(location.openTime);
    const closeTimeNum = timeToNumber(location.closingTime);

    return selectedTimeNum >= openTimeNum && selectedTimeNum <= closeTimeNum;
  };

  // Set default hour based on date selection
  useEffect(() => {
    if (selectedTime === 'today') {
      // Set to current hour + 1 rounded up to closest hour
      const now = new Date();
      const nextHour = Math.ceil(now.getHours() + 1);
      setSelectedHour(`${nextHour < 10 ? '0' + nextHour : nextHour}:00`);
    } else {
      // For tomorrow or future dates, set to early business hour
      setSelectedHour("10:00");
    }
  }, [selectedTime, selectedDate]);

  return (
    <div className="space-y-6">
      {/* Delivery Method Selection - Always shown first */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Label className="text-sm font-medium">Способ получения</Label>
        </div>
        <div className="flex gap-3 mb-2">
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
            <Store size={16} className="mr-2" />
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
            <Store size={16} className="mr-2" />
            Самовывоз
          </Button>
        </div>
      </div>
      
      <Separator className="bg-gray-100" />
      
      {/* Conditional content based on delivery method */}
      {deliveryMethod === 'delivery' ? (
        <>
          {/* Date and Time Selection for Delivery */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Label className="text-sm font-medium">Дата и время доставки</Label>
            </div>
            
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
              deliveryType="self"
            />
          </div>
          
          <Separator className="bg-gray-100" />
          
          {/* Delivery Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Label className="text-sm font-medium">Адрес доставки</Label>
            </div>
            
            <DeliveryAddress
              address={address}
              setAddress={setAddress}
              apartment={apartment}
              setApartment={setApartment}
              floor={floor}
              setFloor={setFloor}
              courierComment={comment}
              setCourierComment={setComment}
              askRecipientForAddress={false} // Never show this checkbox for self delivery
              setAskRecipientForAddress={() => {}} // No-op function since we don't show the checkbox
              showCourierComment={showCourierComment}
              toggleCourierComment={toggleCourierComment}
            />
          </div>
        </>
      ) : (
        <>
          {/* Date Selection for Pickup */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Label className="text-sm font-medium">Дата самовывоза</Label>
            </div>
            
            <DateSelector 
              selectedTime={selectedTime}
              onTimeChange={onTimeChange}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          
          <Separator className="bg-gray-100" />

          {/* Time Selection for Pickup */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Label className="text-sm font-medium">Когда забрать?</Label>
            </div>
            
            <TimeSlotSelector
              selectedTime={selectedTime}
              askRecipientForTime={false}
              setAskRecipientForTime={() => {}}
              deliveryType="pickup"
              selectedHour={selectedHour}
              onHourSelect={setSelectedHour}
            />
          </div>
          
          <Separator className="bg-gray-100" />
          
          {/* Pickup Location Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Label className="text-sm font-medium">Пункт самовывоза</Label>
            </div>
            
            <div className="space-y-2">
              {pickupLocations.map(location => {
                const isOpen = isStoreOpen(location, selectedHour);
                
                return (
                  <div 
                    key={location.id}
                    className={cn(
                      "border rounded-lg p-3 cursor-pointer transition-all",
                      selectedLocation === location.id 
                        ? "border-primary bg-primary/5" 
                        : "border-gray-200 hover:border-gray-300",
                      !isOpen && "opacity-80"
                    )}
                    onClick={() => {
                      if (isOpen) setSelectedLocation(location.id);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Store size={16} className="text-gray-600" />
                      <span className="font-medium text-sm">{location.name}</span>
                      {selectedLocation === location.id && (
                        <div className="ml-auto w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L4 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">{location.address}</div>
                    <div className="mt-2 text-xs flex items-center">
                      {isOpen ? (
                        <>
                          <div className="flex items-center text-green-600">
                            <Check size={14} className="mr-1" />
                            <span>Можно забрать в {selectedHour}</span>
                          </div>
                          <div className="ml-2 text-gray-500">
                            Открыто до {location.closingTime}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center text-red-500">
                            <X size={14} className="mr-1" />
                            <span>В {selectedHour} магазин закрыт</span>
                          </div>
                          <div className="ml-2 text-gray-500">
                            Открыто до {location.closingTime}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
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
        </>
      )}
    </div>
  );
};

export default SelfDeliveryFlow;
