
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
    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4 p-3 bg-[#F9F9F9] rounded-lg border border-[#EEEEEE]">
      <div>
        <label className="block text-sm text-gray-500 mb-1 font-medium">Подъезд</label>
        <input
          type="text"
          value={address.entrance || ''}
          onChange={(e) => onChange('entrance', e.target.value)}
          className="w-full bg-white border border-[#E0E0E0] rounded-md py-2 px-3"
          placeholder="№"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1 font-medium">Домофон</label>
        <input
          type="text"
          value={address.intercom || ''}
          onChange={(e) => onChange('intercom', e.target.value)}
          className="w-full bg-white border border-[#E0E0E0] rounded-md py-2 px-3"
          placeholder="Код"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1 font-medium">Кв./офис</label>
        <input
          type="text"
          value={address.apartment || ''}
          onChange={(e) => onChange('apartment', e.target.value)}
          className="w-full bg-white border border-[#E0E0E0] rounded-md py-2 px-3"
          placeholder="№"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1 font-medium">Этаж</label>
        <input
          type="text"
          value={address.floor || ''}
          onChange={(e) => onChange('floor', e.target.value)}
          className="w-full bg-white border border-[#E0E0E0] rounded-md py-2 px-3"
          placeholder="№"
        />
      </div>
    </div>
  );
};
