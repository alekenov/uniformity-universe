
import React from 'react';
import { MapPin } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DeliveryAddressProps {
  address: string;
  setAddress: (value: string) => void;
  apartment: string;
  setApartment: (value: string) => void;
  floor: string;
  setFloor: (value: string) => void;
  courierComment: string;
  setCourierComment: (value: string) => void;
  askRecipientForAddress: boolean;
  setAskRecipientForAddress: (value: boolean) => void;
  showCourierComment: boolean;
  toggleCourierComment: () => void;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({
  address,
  setAddress,
  apartment,
  setApartment,
  floor,
  setFloor,
  courierComment,
  setCourierComment,
  askRecipientForAddress,
  setAskRecipientForAddress,
  showCourierComment,
  toggleCourierComment,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-sm text-gray-500 mb-1">
        <MapPin size={16} className="mr-2" />
        Адрес доставки
      </div>
      
      {/* Only show the checkbox if needed (not in "self" delivery flow) */}
      {setAskRecipientForAddress !== (() => {}) && (
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox 
            id="askRecipientAddress"
            checked={askRecipientForAddress}
            onCheckedChange={(checked) => {
              setAskRecipientForAddress(checked === true);
              if (checked === true) {
                setAddress('');
                setApartment('');
                setFloor('');
                setCourierComment('');
              }
            }}
          />
          <label
            htmlFor="askRecipientAddress"
            className="text-sm leading-none"
          >
            Уточнить адрес у получателя по телефону
          </label>
        </div>
      )}

      {!askRecipientForAddress && (
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
                value={courierComment}
                onChange={(e) => setCourierComment(e.target.value)}
                placeholder="Код от двери, как найти подъезд, другие детали..." 
                rows={2}
                className="resize-none text-sm"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
