
import React from 'react';
import CartItem from '@/components/CartItem';
import CardMessage from '@/components/cart/CardMessage';
import StoreHeader from '@/components/checkout/StoreHeader';
import { Product, Store } from '@/types/cart';
import { TabsContent } from "@/components/ui/tabs";
import StoreTabs from '@/components/cart/StoreTabs';

interface OrderItemsSectionProps {
  stores: Store[];
  activeStoreId: string;
  onStoreChange: (storeId: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  cardMessage: string;
  setCardMessage: (message: string) => void;
  showCardMessageInput: boolean;
  setShowCardMessageInput: (show: boolean) => void;
}

const OrderItemsSection: React.FC<OrderItemsSectionProps> = ({
  stores,
  activeStoreId,
  onStoreChange,
  onQuantityChange,
  cardMessage,
  setCardMessage,
  showCardMessageInput,
  setShowCardMessageInput
}) => {
  return (
    <div className="panel mb-6">
      <h2 className="text-xl font-medium mb-4">Ваш заказ</h2>
      
      {/* Store tabs navigation */}
      <StoreTabs 
        stores={stores} 
        activeStoreId={activeStoreId} 
        onStoreChange={onStoreChange}
      />
      
      {/* Tab content for each store */}
      {stores.map(store => (
        <TabsContent 
          key={store.id} 
          value={store.id}
          className="mt-4 border border-gray-100 rounded-md overflow-hidden"
        >
          <StoreHeader 
            storeName={store.name} 
            status="Открыто"
          />
          
          <div className="divide-y divide-[#F0F0F0]">
            {store.products.map((product) => (
              <CartItem
                key={product.id}
                {...product}
                onQuantityChange={onQuantityChange}
              />
            ))}
          </div>
        </TabsContent>
      ))}
      
      {/* Card message input (shared across all stores) */}
      <div className="mt-4">
        <CardMessage
          cardMessage={cardMessage}
          setCardMessage={setCardMessage}
          showCardMessageInput={showCardMessageInput}
          setShowCardMessageInput={setShowCardMessageInput}
        />
      </div>
    </div>
  );
};

export default OrderItemsSection;
