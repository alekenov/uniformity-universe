
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
    <div className="px-4 overflow-x-auto pb-2">
      <Tabs 
        value={activeStoreId} 
        onValueChange={onStoreChange}
        className="w-full"
      >
        <TabsList className="w-full h-auto p-1 bg-gray-100 overflow-x-auto flex">
          {stores.map(store => (
            <TabsTrigger 
              key={store.id}
              value={store.id}
              className="flex-col items-start py-2 px-4 h-auto data-[state=active]:bg-white"
            >
              <span className="font-medium text-sm">{store.name}</span>
              <div className="flex items-center text-xs">
                <span className="text-gray-600">{store.total} ₸</span>
                {store.status && (
                  <>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-green-600">{store.status}</span>
                  </>
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default StoreTabs;
