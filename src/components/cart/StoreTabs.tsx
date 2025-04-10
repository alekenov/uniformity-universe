
import React from 'react';
import { Store } from '@/types/cart';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <TabsList className="w-full h-auto py-1.5 px-1 bg-transparent rounded-lg overflow-x-auto flex flex-nowrap gap-1.5">
          {stores.map(store => (
            <TabsTrigger 
              key={store.id}
              value={store.id}
              className="py-2 px-4 h-auto text-sm text-gray-600 border border-gray-200 rounded-full transition-all duration-200 whitespace-nowrap
                       hover:border-gray-300
                       data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary"
            >
              {store.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default StoreTabs;
