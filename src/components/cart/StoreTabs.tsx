
import React from 'react';
import { Store } from '@/types/cart';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Store as StoreIcon } from 'lucide-react';

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
        <TabsList className="w-full h-auto py-1 px-0.5 bg-gray-100 rounded-lg overflow-x-auto flex flex-nowrap gap-1">
          {stores.map(store => (
            <TabsTrigger 
              key={store.id}
              value={store.id}
              className="flex items-center py-2 px-3 h-auto rounded-md transition-all duration-200 whitespace-nowrap
                       data-[state=active]:bg-white data-[state=active]:shadow-sm
                       data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
            >
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center mr-1.5">
                  <StoreIcon size={12} className="text-purple-600" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-xs">{store.name}</span>
                  <div className="flex items-center text-[10px]">
                    <span className="text-gray-600 font-medium">{store.total.toLocaleString()} ₸</span>
                    {store.status === "Открыто" && (
                      <>
                        <span className="mx-0.5 text-gray-400">•</span>
                        <span className="text-green-600 flex items-center">
                          <CheckCircle size={10} className="text-green-500 mr-0.5" />
                          {store.status}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default StoreTabs;
