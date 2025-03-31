
import React, { useState, useEffect } from 'react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import { Separator } from '@/components/ui/separator';
import DateSelector from './DateSelector';
import TimeSlotSelector from './TimeSlotSelector';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import SelfDeliveryAddressSection from './SelfDeliveryAddressSection';
import PickupLocationsList from './pickup/PickupLocationsList';
import { PickupLocation } from './pickup/PickupLocationItem';
import { isStoreOpen } from './pickup/PickupStoreUtils';

interface SelfDeliveryFlowProps {
  selectedTime: DeliveryTime;
  onTimeChange: (time: DeliveryTime) => void;
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
            className={deliveryMethod === 'delivery' ? "flex-1 text-sm bg-primary text-primary-foreground" : "flex-1 text-sm"}
          >
            Доставка
          </Button>
          <Button
            type="button"
            variant={deliveryMethod === 'pickup' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDeliveryMethod('pickup')}
            className={deliveryMethod === 'pickup' ? "flex-1 text-sm bg-primary text-primary-foreground" : "flex-1 text-sm"}
          >
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
          
          {/* Delivery Address Section */}
          <SelfDeliveryAddressSection 
            address={address}
            setAddress={setAddress}
            apartment={apartment}
            setApartment={setApartment}
            floor={floor}
            setFloor={setFloor}
            comment={comment}
            setComment={setComment}
            showCourierComment={showCourierComment}
            toggleCourierComment={toggleCourierComment}
          />
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
            
            <PickupLocationsList 
              locations={pickupLocations}
              selectedLocation={selectedLocation}
              selectedHour={selectedHour}
              onLocationSelect={setSelectedLocation}
              isStoreOpen={(location, hour) => isStoreOpen(location, hour)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SelfDeliveryFlow;
