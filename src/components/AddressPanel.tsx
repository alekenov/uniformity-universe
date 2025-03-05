
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DeliveryType } from '@/components/DeliveryOptions';
import { PickupLocationList, StoreLocation } from './pickup/PickupLocationList';
import { AddressInput, AddressInfo } from './address/AddressInput';
import { AddressDetails } from './address/AddressDetails';

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
  const navigate = useNavigate();
  
  const handleAddressClick = () => {
    navigate('/address-selection');
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
      
      <AddressInput
        address={address}
        onChange={onChange}
        verifyAddress={verifyAddress}
        onVerifyAddressChange={setVerifyAddress}
        onAddressClick={handleAddressClick}
        onCityChange={() => console.log('Change city')}
        onShowNearbyStores={() => console.log('Show nearby stores')}
      />
      
      {/* Address details (only visible when address is set and no verification needed) */}
      {address.street && !verifyAddress && (
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
