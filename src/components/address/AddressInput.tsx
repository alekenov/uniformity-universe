
import React from 'react';
import { MapPin, Building, ChevronRight, Store, Navigation } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

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
}

export const AddressInput: React.FC<AddressInputProps> = ({
  address,
  onChange,
  verifyAddress,
  onVerifyAddressChange,
  onAddressClick,
  onCityChange,
  onShowNearbyStores
}) => {
  return (
    <div>
      {/* Address Input Block */}
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
      
      {/* Nearby stores button */}
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
