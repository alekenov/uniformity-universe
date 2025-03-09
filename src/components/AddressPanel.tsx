
import React, { useState } from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DeliveryType } from '@/components/DeliveryOptions';
import { PickupLocationList, StoreLocation } from './pickup/PickupLocationList';
import { AddressInput, AddressInfo } from './address/AddressInput';
import { AddressDetails } from './address/AddressDetails';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface AddressPanelProps {
  address: AddressInfo;
  onChange: (field: keyof AddressInfo, value: string) => void;
  onEdit: () => void;
  deliveryType: DeliveryType;
}

// Sample store locations data
const storeLocations: StoreLocation[] = [
  {
    id: 'store1',
    name: 'Магазин на Достоевского',
    address: 'ул. Достоевского, 3с2',
    readyTime: 'через 30 мин',
  },
  {
    id: 'store2',
    name: 'Магазин на Пушкинской',
    address: 'ул. Пушкинская, 10',
    readyTime: 'через 45 мин',
  },
  {
    id: 'store3',
    name: 'Магазин на Ленина',
    address: 'пр. Ленина, 42',
    readyTime: 'через 1 час',
  },
];

const AddressPanel: React.FC<AddressPanelProps> = ({ 
  address, 
  onChange, 
  onEdit,
  deliveryType 
}) => {
  const [verifyAddress, setVerifyAddress] = useState(false);
  const [selectedStore, setSelectedStore] = useState(storeLocations[0].id);
  const [cityOnly, setCityOnly] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const navigate = useNavigate();
  
  const handleAddressClick = () => {
    navigate('/address-selection');
  };

  const handleCityChange = () => {
    console.log('Change city');
  };

  const handleShowNearbyStores = () => {
    console.log('Show nearby stores');
  };

  if (deliveryType === 'pickup') {
    return (
      <div className="panel">
        <h2 className="text-xl font-medium mb-4">Где забрать</h2>
        
        <PickupLocationList
          locations={storeLocations}
          selectedStore={selectedStore}
          onSelectStore={setSelectedStore}
        />

        <button className="mt-4 w-full flex items-center justify-between bg-[#F8F8F8] text-sm py-3 px-4 rounded-md">
          <span className="text-gray-600">Комментарий к заказу</span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      </div>
    );
  }
  
  return (
    <div className="panel">
      <h2 className="text-xl font-medium mb-4">Куда доставить</h2>
      
      {/* City Selection */}
      <div className="mb-4 px-3 py-3 bg-[#F8F8F8] rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={18} className="text-gray-500" />
          <div className="text-sm font-medium">Город:</div>
          <div className="text-sm">{address.city || 'Москва'}</div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-primary ml-auto h-6 px-2"
            onClick={handleCityChange}
          >
            Изменить
          </Button>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <Checkbox 
            id="cityOnly" 
            checked={cityOnly}
            onCheckedChange={(checked) => setCityOnly(checked === true)}
          />
          <label
            htmlFor="cityOnly"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Знаю только город
          </label>
        </div>

        {cityOnly ? (
          <p className="text-sm text-gray-600 mt-2">
            Адрес будет уточнен у получателя. Курьер свяжется для согласования деталей доставки.
          </p>
        ) : (
          <AddressInput
            address={address}
            onChange={onChange}
            verifyAddress={verifyAddress}
            onVerifyAddressChange={setVerifyAddress}
            onAddressClick={handleAddressClick}
            onCityChange={handleCityChange}
            onShowNearbyStores={handleShowNearbyStores}
            deliveryMethod={deliveryMethod}
            onDeliveryMethodChange={setDeliveryMethod}
          />
        )}
      </div>
      
      {/* Address details (only visible when address is set, no verification needed, and not city-only mode) */}
      {address.street && !verifyAddress && !cityOnly && deliveryMethod === 'delivery' && (
        <AddressDetails 
          address={address}
          onChange={onChange}
        />
      )}
      
      <button className="w-full flex items-center justify-between bg-[#F8F8F8] text-sm py-3 px-4 rounded-md">
        <span className="text-gray-600">Комментарий к заказу</span>
        <ChevronRight size={18} className="text-gray-400" />
      </button>
    </div>
  );
};

export default AddressPanel;
