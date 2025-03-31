
import React, { useState } from 'react';
import { ChevronRight, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DeliveryType } from '@/components/DeliveryOptions';
import { PickupLocationList, StoreLocation } from './pickup/PickupLocationList';
import { AddressInput, AddressInfo } from './address/AddressInput';
import { AddressDetails } from './address/AddressDetails';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

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
  const [selectedRegion] = useState('Казахстан');
  const [selectedCity, setSelectedCity] = useState(address.city || 'Алматы');
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

  return (
    <div className="panel">
      <h2 className="text-xl font-medium mb-4">Куда доставить</h2>
      
      {/* Region and City Display - REMOVED */}
      
      {/* Delivery Method Tabs */}
      <Tabs defaultValue="delivery" className="w-full mb-4" onValueChange={(value) => setDeliveryMethod(value as 'delivery' | 'pickup')}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="delivery">Доставка</TabsTrigger>
          <TabsTrigger value="pickup">Самовывоз</TabsTrigger>
        </TabsList>
        
        <TabsContent value="delivery" className="mt-0">
          {/* City Only Checkbox */}
          <div className="flex items-center space-x-2 mb-3 px-3 py-2 bg-[#F8F8F8] rounded-lg">
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
            <p className="text-sm text-gray-600 mt-2 px-3">
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
          
          {/* Address details (only visible when address is set, no verification needed, and not city-only mode) */}
          {address.street && !verifyAddress && !cityOnly && (
            <AddressDetails 
              address={address}
              onChange={onChange}
            />
          )}
        </TabsContent>
        
        <TabsContent value="pickup" className="mt-0">
          <PickupLocationList
            locations={storeLocations}
            selectedStore={selectedStore}
            onSelectStore={setSelectedStore}
          />
          
          <div className="flex items-center mt-3 p-3 bg-white rounded-lg border border-gray-100">
            <Navigation size={18} className="text-gray-500 mr-2" />
            <Button
              variant="ghost"
              size="sm"
              className="text-sm w-full justify-start p-0 h-auto"
              onClick={handleShowNearbyStores}
            >
              Показать магазины на карте
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <button className="w-full flex items-center justify-between bg-[#F8F8F8] text-sm py-3 px-4 rounded-md">
        <span className="text-gray-600">Комментарий к заказу</span>
        <ChevronRight size={18} className="text-gray-400" />
      </button>
    </div>
  );
};

export default AddressPanel;
