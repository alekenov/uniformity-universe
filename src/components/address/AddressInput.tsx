
import React from 'react';
import { MapPin, Building, ChevronRight, Store, Navigation } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface AddressInfo {
  street: string;
  city: string;
  entrance?: string;
  apartment?: string;
  floor?: string;
  intercom?: string;
}

interface AddressInputProps {
  address: AddressInfo;
  onChange: (field: keyof AddressInfo, value: string) => void;
  verifyAddress: boolean;
  onVerifyAddressChange: (checked: boolean) => void;
  onAddressClick: () => void;
  onCityChange: () => void;
  onShowNearbyStores: () => void;
  deliveryMethod: 'delivery' | 'pickup';
  onDeliveryMethodChange: (method: 'delivery' | 'pickup') => void;
}

export const AddressInput: React.FC<AddressInputProps> = ({
  address,
  onChange,
  verifyAddress,
  onVerifyAddressChange,
  onAddressClick,
  onCityChange,
  onShowNearbyStores,
  deliveryMethod,
  onDeliveryMethodChange
}) => {
  return (
    <div>
      {/* Delivery Method Selection */}
      <div className="mb-4">
        <RadioGroup 
          value={deliveryMethod}
          onValueChange={(value: 'delivery' | 'pickup') => onDeliveryMethodChange(value)}
          className="flex space-x-2 bg-[#F8F8F8] p-1 rounded-lg"
        >
          <div className={`flex-1 rounded-md transition-colors ${deliveryMethod === 'delivery' ? 'bg-white shadow-sm' : ''}`}>
            <RadioGroupItem 
              value="delivery" 
              id="delivery" 
              className="sr-only" 
            />
            <Label 
              htmlFor="delivery" 
              className={`w-full p-2 text-center block cursor-pointer text-sm ${deliveryMethod === 'delivery' ? 'font-medium' : 'text-gray-600'}`}
            >
              Доставка
            </Label>
          </div>
          
          <div className={`flex-1 rounded-md transition-colors ${deliveryMethod === 'pickup' ? 'bg-white shadow-sm' : ''}`}>
            <RadioGroupItem 
              value="pickup" 
              id="pickup" 
              className="sr-only" 
            />
            <Label 
              htmlFor="pickup" 
              className={`w-full p-2 text-center block cursor-pointer text-sm ${deliveryMethod === 'pickup' ? 'font-medium' : 'text-gray-600'}`}
            >
              Самовывоз
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Address Input Block - Only show for delivery method */}
      {deliveryMethod === 'delivery' && (
        <>
          <div 
            className="flex items-start bg-white p-3 mb-4 rounded-lg cursor-pointer hover:bg-[#F0F0F0]" 
            onClick={onAddressClick}
          >
            <div className="flex-shrink-0 w-8 h-8 bg-[#F0F0F0] rounded-full flex items-center justify-center mr-3">
              <MapPin size={16} className="text-gray-600" />
            </div>
            <div className="flex-grow">
              {address.street ? (
                <>
                  <div className="font-medium">{address.street}</div>
                  <div className="text-sm text-gray-500">{address.apartment ? `кв./офис ${address.apartment}` : 'Указать детали'}</div>
                </>
              ) : (
                <div className="text-gray-600">Введите адрес доставки</div>
              )}
            </div>
            <ChevronRight size={20} className="text-gray-400 flex-shrink-0 ml-2" />
          </div>
          
          {/* Verify address checkbox */}
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verifyAddress" 
                checked={verifyAddress}
                onCheckedChange={(checked) => onVerifyAddressChange(checked === true)}
              />
              <label
                htmlFor="verifyAddress"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Уточнить адрес у получателя
              </label>
            </div>
            
            {verifyAddress && (
              <div className="mt-3 p-3 bg-white rounded-lg border border-[#F0F0F0]">
                <p className="text-sm text-gray-600">Адрес будет уточнен у получателя. Курьер свяжется с получателем для согласования деталей доставки.</p>
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Pickup store selection - Only show for pickup method */}
      {deliveryMethod === 'pickup' && (
        <div className="bg-white p-3 mb-4 rounded-lg border border-[#F0F0F0]">
          <div className="flex items-center mb-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#F0F0F0] rounded-full flex items-center justify-center mr-3">
              <Store size={16} className="text-gray-600" />
            </div>
            <div className="font-medium">Выберите пункт самовывоза</div>
          </div>
          <p className="text-sm text-gray-600 mb-3">Вы можете забрать заказ самостоятельно в одном из наших магазинов</p>
          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={onShowNearbyStores}
          >
            Выбрать магазин
          </Button>
        </div>
      )}
      
      {/* Nearby stores button - Show for both methods */}
      <Button 
        variant="outline" 
        className="w-full mb-4 flex items-center justify-between py-2 px-3 h-auto text-sm border border-[#E5E5E5] bg-white hover:bg-[#F8F8F8]"
        onClick={onShowNearbyStores}
      >
        <div className="flex items-center">
          <Store size={16} className="text-gray-600 mr-2" />
          <span>Магазины рядом с получателем</span>
        </div>
        <Navigation size={16} className="text-gray-400" />
      </Button>
    </div>
  );
};
