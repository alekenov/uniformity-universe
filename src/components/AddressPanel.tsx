
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
  distance: string;
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
    distance: '1.2 км от вас',
    readyTime: 'через 30 мин',
  },
  {
    id: 'store2',
    name: 'Магазин на Пушкинской',
    address: 'ул. Пушкинская, 10',
    distance: '2.5 км от вас',
    readyTime: 'через 45 мин',
  },
  {
    id: 'store3',
    name: 'Магазин на Ленина',
    address: 'пр. Ленина, 42',
    distance: '3.7 км от вас',
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
              <div className="flex items-center mt-2 text-xs text-gray-500 gap-4">
                <div className="flex items-center">
                  <MapPin size={12} className="mr-1" />
                  {store.distance}
                </div>
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

      <div className="mt-6 flex items-center">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="verifyAddress" 
            checked={verifyAddress}
            onCheckedChange={() => setVerifyAddress(!verifyAddress)}
          />
          <label
            htmlFor="verifyAddress"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Уточнить у получателя адрес
          </label>
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        <div className="flex gap-2 items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V6C19 6.55228 18.5523 7 18 7H6C5.44772 7 5 6.55228 5 6V5Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M5 10V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V10" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="font-medium">Оставить у двери</span>
        </div>
        <div className="ml-auto">
          <div className="w-12 h-6 bg-[#F0F0F0] rounded-full flex items-center p-1 cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
      
      <button className="mt-4 w-full flex items-center justify-between bg-[#F8F8F8] text-sm py-3 px-4 rounded-md">
        <span className="text-gray-600">Комментарий к заказу</span>
        <ChevronRight size={18} className="text-gray-400" />
      </button>
    </div>
  );
};

export default AddressPanel;
