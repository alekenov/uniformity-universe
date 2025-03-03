
import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface AddressInfo {
  street: string;
  city: string;
  entrance?: string;
  apartment?: string;
  floor?: string;
  intercom?: string;
}

interface AddressPanelProps {
  address: AddressInfo;
  onChange: (field: keyof AddressInfo, value: string) => void;
  onEdit: () => void;
}

const AddressPanel: React.FC<AddressPanelProps> = ({ address, onChange, onEdit }) => {
  return (
    <div className="panel">
      <h2 className="text-xl font-medium mb-4">Куда</h2>
      
      <div className="flex items-start border-b border-[#F0F0F0] pb-4 mb-4 cursor-pointer" onClick={onEdit}>
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
