
import React from 'react';
import { Store } from '@/types/cart';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from 'lucide-react';

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
        <TabsList className="w-full h-auto p-1 bg-gray-100 rounded-xl overflow-x-auto flex">
          {stores.map(store => (
            <TabsTrigger 
              key={store.id}
              value={store.id}
              className="flex-col items-start py-3 px-4 h-auto rounded-lg transition-all duration-200
                       data-[state=active]:bg-white data-[state=active]:shadow-sm
                       data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-sm">{store.name}</span>
                {store.status === "Открыто" && (
                  <CheckCircle size={14} className="text-green-500 ml-2" />
                )}
              </div>
              
              <div className="flex items-center text-xs mt-1">
                <span className="text-gray-600 font-medium">{store.total.toLocaleString()} ₸</span>
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
