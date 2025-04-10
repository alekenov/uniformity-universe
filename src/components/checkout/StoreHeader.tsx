
import React from 'react';
import { Store as StoreIcon } from 'lucide-react';

interface StoreHeaderProps {
  storeName: string;
  status?: string;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ storeName, status = "Открыто" }) => {
  return (
    <div className="flex items-center py-3 px-2 bg-gray-50 rounded-t-md border-b border-gray-100">
      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mr-2">
        <StoreIcon size={16} className="text-purple-600" />
      </div>
      <div>
        <div className="font-medium text-sm">{storeName}</div>
        <div className="text-xs text-green-600">{status}</div>
      </div>
    </div>
  );
};

export default StoreHeader;
