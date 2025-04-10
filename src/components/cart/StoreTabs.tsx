
import React from 'react';
import { Store } from '@/types/cart';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tag } from 'lucide-react';

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
    <div className="px-2 overflow-x-auto pb-2">
      <Tabs 
        value={activeStoreId} 
        onValueChange={onStoreChange}
        className="w-full"
      >
        <TabsList className="w-full h-auto py-1.5 px-1 bg-gray-50 rounded-lg overflow-x-auto flex flex-nowrap gap-1.5">
          {stores.map(store => (
            <TabsTrigger 
              key={store.id}
              value={store.id}
              className="flex items-center py-1.5 px-3 h-auto text-xs text-gray-600 border border-gray-200 rounded-full transition-all duration-200 whitespace-nowrap
                       hover:bg-gray-100
                       data-[state=active]:bg-gray-100 data-[state=active]:text-gray-800 data-[state=active]:border-gray-300"
            >
              <span className="flex items-center gap-1">
                <Tag size={10} className="text-gray-500" />
                {store.name}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default StoreTabs;
