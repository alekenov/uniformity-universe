
import React from 'react';
import { Store } from '@/types/cart';
import DeliveryOptions, { DeliveryType, DeliveryTime } from '@/components/DeliveryOptions';
import RegionCitySelector from '@/components/address/RegionCitySelector';

interface StoreAddressState {
  street: string;
  city: string;
  entrance: string;
  apartment: string;
  floor: string;
  intercom: string;
  courierComment: string;
  askRecipientForAddress: boolean;
  showCourierComment: boolean;
}

interface StoreAddressManagerProps {
  activeStore: Store | undefined;
  activeStoreId: string;
  activeAddress: StoreAddressState;
  deliveryType: DeliveryType;
  deliveryTime: DeliveryTime;
  selectedRegion: string;
  selectedCity: string;
  onCityChange: (city: string) => void;
  onDeliveryTypeChange: (type: DeliveryType) => void;
  onDeliveryTimeChange: (time: DeliveryTime) => void;
  handleAddressChange: (storeId: string, field: keyof StoreAddressState, value: string | boolean) => void;
  toggleCourierComment: (storeId: string) => void;
}

const StoreAddressManager: React.FC<StoreAddressManagerProps> = ({
  activeStore,
  activeStoreId,
  activeAddress,
  deliveryType,
  deliveryTime,
  selectedRegion,
  selectedCity,
  onCityChange,
  onDeliveryTypeChange,
  onDeliveryTimeChange,
  handleAddressChange,
  toggleCourierComment,
}) => {
  if (!activeStore) return null;

  return (
    <div className="panel">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Доставка</h2>
        <RegionCitySelector
          selectedRegion={selectedRegion}
          selectedCity={selectedCity}
          onCityChange={onCityChange}
          compact={true}
        />
      </div>
      
      <DeliveryOptions
        selectedType={deliveryType}
        selectedTime={deliveryTime}
        onTypeChange={onDeliveryTypeChange}
        onTimeChange={onDeliveryTimeChange}
      />
    </div>
  );
};

export default StoreAddressManager;
