
import React from 'react';
import { AddressInfo } from './AddressInput';

interface AddressDetailsProps {
  address: AddressInfo;
  onChange: (field: keyof AddressInfo, value: string) => void;
}

export const AddressDetails: React.FC<AddressDetailsProps> = ({
  address,
  onChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
      <div>
        <label className="block text-sm text-gray-500 mb-1">Подъезд</label>
        <input
          type="text"
          value={address.entrance || ''}
          onChange={(e) => onChange('entrance', e.target.value)}
          className="w-full bg-[#F8F8F8] border-0 rounded-md py-2 px-3"
          placeholder="№"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Домофон</label>
        <input
          type="text"
          value={address.intercom || ''}
          onChange={(e) => onChange('intercom', e.target.value)}
          className="w-full bg-[#F8F8F8] border-0 rounded-md py-2 px-3"
          placeholder="Код"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Кв./офис</label>
        <input
          type="text"
          value={address.apartment || ''}
          onChange={(e) => onChange('apartment', e.target.value)}
          className="w-full bg-[#F8F8F8] border-0 rounded-md py-2 px-3"
          placeholder="№"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Этаж</label>
        <input
          type="text"
          value={address.floor || ''}
          onChange={(e) => onChange('floor', e.target.value)}
          className="w-full bg-[#F8F8F8] border-0 rounded-md py-2 px-3"
          placeholder="№"
        />
      </div>
    </div>
  );
};
