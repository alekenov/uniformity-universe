
import React, { useState } from 'react';
import { Home, ChevronRight, MapPin, Clock } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from 'react-router-dom';
import { DeliveryType } from '@/components/DeliveryOptions';

interface AddressInfo {
  street: string;
  city: string;
  entrance?: string;
  apartment?: string;
  floor?: string;
  intercom?: string;
}

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  readyTime: string;
}

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
        
        {storeLocations.map((store) => (
          <div 
            key={store.id} 
            className={`flex items-start p-3 mb-2 rounded-lg cursor-pointer transition-all ${
              selectedStore === store.id 
                ? 'bg-primary/5 border border-primary/20' 
                : 'bg-[#F8F8F8] hover:bg-[#F0F0F0]'
            }`}
            onClick={() => setSelectedStore(store.id)}
          >
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              selectedStore === store.id ? 'bg-primary/10 text-primary' : 'bg-white text-gray-600'
            }`}>
              <MapPin size={20} />
            </div>
            <div className="flex-grow">
              <div className="font-medium">{store.name}</div>
              <div className="text-sm text-gray-600">{store.address}</div>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  Готово {store.readyTime}
                </div>
              </div>
            </div>
            {selectedStore === store.id && (
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5L4 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        ))}

        <button className="mt-4 w-full flex items-center justify-between bg-[#F8F8F8] text-sm py-3 px-4 rounded-md">
          <span className="text-gray-600">Комментарий к заказу</span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      </div>
    );
  }
  
  return (
    <div className="panel">
      <h2 className="text-xl font-medium mb-4">Куда</h2>
      
      {deliveryType === 'other' && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox 
              id="verifyAddress" 
              checked={verifyAddress}
              onCheckedChange={(checked) => setVerifyAddress(checked === true)}
            />
            <label
              htmlFor="verifyAddress"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Уточнить адрес у получателя
            </label>
          </div>
          
          {verifyAddress && (
            <div className="p-4 bg-[#F9F9F9] rounded-lg border border-[#F0F0F0] mb-4">
              <p className="text-sm text-gray-600">Адрес будет уточнен у получателя. Курьер свяжется с получателем для согласования деталей доставки.</p>
            </div>
          )}
        </div>
      )}
      
      {(!verifyAddress || deliveryType !== 'other') && (
        <>
          <div className="flex items-start border-b border-[#F0F0F0] pb-4 mb-4 cursor-pointer" onClick={handleAddressClick}>
            <div className="flex-shrink-0 w-8 h-8 bg-[#F8F8F8] rounded-full flex items-center justify-center mr-3">
              <Home size={16} className="text-gray-600" />
            </div>
            <div className="flex-grow">
              <div className="font-medium">{address.street}</div>
              <div className="text-sm text-gray-500">{address.city}</div>
            </div>
            <ChevronRight size={20} className="text-gray-400 flex-shrink-0 ml-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Подъезд</label>
              <input
                type="text"
                value={address.entrance || ''}
                onChange={(e) => onChange('entrance', e.target.value)}
                className="w-full bg-[#F8F8F8] border-0 rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Домофон</label>
              <input
                type="text"
                value={address.intercom || ''}
                onChange={(e) => onChange('intercom', e.target.value)}
                className="w-full bg-[#F8F8F8] border-0 rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Кв./офис</label>
              <input
                type="text"
                value={address.apartment || ''}
                onChange={(e) => onChange('apartment', e.target.value)}
                className="w-full bg-[#F8F8F8] border-0 rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Этаж</label>
              <input
                type="text"
                value={address.floor || ''}
                onChange={(e) => onChange('floor', e.target.value)}
                className="w-full bg-[#F8F8F8] border-0 rounded-md py-2 px-3"
              />
            </div>
          </div>
        </>
      )}
      
      <button className="mt-4 w-full flex items-center justify-between bg-[#F8F8F8] text-sm py-3 px-4 rounded-md">
        <span className="text-gray-600">Комментарий к заказу</span>
        <ChevronRight size={18} className="text-gray-400" />
      </button>
    </div>
  );
};

export default AddressPanel;
