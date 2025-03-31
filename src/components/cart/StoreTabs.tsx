
import React from 'react';
import { Store } from '@/types/cart';

interface StoreTabsProps {
  stores: Store[];
  activeStoreId: string;
  onStoreChange: (storeId: string) => void;
}

const StoreTabs: React.FC<StoreTabsProps> = ({ 
  stores, 
  activeStoreId, 
  onStoreChange 
}) => {
  return (
    <div className="px-4 overflow-x-auto pb-2 -mb-2">
      <div className="flex space-x-2">
        {stores.map(store => (
          <button
            key={store.id}
            onClick={() => onStoreChange(store.id)}
            className={`flex-shrink-0 py-2 px-4 rounded-full border text-sm whitespace-nowrap ${
              activeStoreId === store.id 
                ? 'border-[#8B5CF6] bg-[#F5F3FF]' 
                : 'border-[#E0E0E0] bg-white'
            } active-scale`}
          >
            <div className="font-medium">{store.name}</div>
            <div className="flex items-center text-gray-500 text-xs">
              {store.products.length > 0 ? `${store.total} ₸` : null}
              {store.products.length > 0 && store.status ? ' · ' : null}
              {store.status}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoreTabs;
