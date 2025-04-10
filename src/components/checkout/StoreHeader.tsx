
import React from 'react';

interface StoreHeaderProps {
  storeName?: string;
  status?: string;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ storeName, status = "Открыто" }) => {
  return (
    <div className="flex items-center py-2.5 px-3 bg-gray-50 rounded-t-md border-b border-gray-100">
      {/* Store name has been removed */}
    </div>
  );
};

export default StoreHeader;
