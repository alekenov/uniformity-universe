
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FlowerShopLink from '@/components/FlowerShopLink';

// Sample address data
const sampleAddresses = [
  {
    id: '1',
    street: 'улица Достоевского, 3с2',
    city: 'Москва',
    isDefault: true,
  },
  {
    id: '2',
    street: 'улица Тверская, 14',
    city: 'Москва',
    isDefault: false,
  },
  {
    id: '3',
    street: 'проспект Мира, 120',
    city: 'Москва',
    isDefault: false,
  },
];

const AddressSelection: React.FC = () => {
  const navigate = useNavigate();
  const [addresses] = useState(sampleAddresses);
  
  const handleSelectAddress = (id: string) => {
    // In a real app, we would update the selected address in a global state
    // For now, we'll just navigate back to the checkout page
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="p-2 -ml-2 mr-2">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-medium">Выбор адреса</h1>
          </div>
          <FlowerShopLink iconOnly />
        </div>
      </header>
      
      <main className="container max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm mb-4">
          {addresses.map((address) => (
            <div 
              key={address.id}
              className="flex items-center p-4 border-b border-[#F0F0F0] cursor-pointer"
              onClick={() => handleSelectAddress(address.id)}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-[#F8F8F8] rounded-full flex items-center justify-center mr-3">
                <MapPin size={16} className="text-gray-600" />
              </div>
              <div className="flex-grow">
                <div className="font-medium">{address.street}</div>
                <div className="text-sm text-gray-500">{address.city}</div>
              </div>
              {address.isDefault && (
                <span className="text-xs text-gray-500 bg-[#F8F8F8] px-2 py-1 rounded-md ml-2">
                  По умолчанию
                </span>
              )}
            </div>
          ))}
        </div>
        
        <button className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-center text-[#4BA3E3] font-medium">
          <Plus size={20} className="mr-2" />
          Добавить новый адрес
        </button>
      </main>
    </div>
  );
};

export default AddressSelection;
