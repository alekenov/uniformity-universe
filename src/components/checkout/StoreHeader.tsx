
import React from 'react';
import { Store as StoreIcon, CheckCircle } from 'lucide-react';

interface StoreHeaderProps {
  storeName: string;
  status?: string;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ storeName, status = "Открыто" }) => {
  return (
    <div className="flex items-center py-2.5 px-2 bg-gray-50 rounded-t-md border-b border-gray-100">
      <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center mr-2">
        <StoreIcon size={14} className="text-purple-600" />
      </div>
      <div className="flex flex-col">
        <div className="font-medium text-sm">{storeName}</div>
        <div className="text-xs text-green-600 flex items-center">
          <CheckCircle size={10} className="text-green-500 mr-0.5" />
          {status}
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
