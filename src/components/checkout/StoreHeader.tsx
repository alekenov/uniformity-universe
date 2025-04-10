
import React from 'react';

interface StoreHeaderProps {
  storeName: string;
  status?: string;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ storeName, status = "Открыто" }) => {
  return (
    <div className="flex items-center py-2.5 px-3 bg-gray-50 rounded-t-md border-b border-gray-100">
      <div className="font-medium text-sm text-gray-800">{storeName}</div>
    </div>
  );
};

export default StoreHeader;
