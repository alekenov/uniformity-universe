
import React from 'react';
import CartItem from '@/components/CartItem';
import CardMessage from '@/components/cart/CardMessage';
import StoreHeader from '@/components/checkout/StoreHeader';
import { Product } from '@/types/cart';

interface OrderItemsSectionProps {
  products: Product[];
  onQuantityChange: (id: string, quantity: number) => void;
  cardMessage: string;
  setCardMessage: (message: string) => void;
  showCardMessageInput: boolean;
  setShowCardMessageInput: (show: boolean) => void;
}

const OrderItemsSection: React.FC<OrderItemsSectionProps> = ({
  products,
  onQuantityChange,
  cardMessage,
  setCardMessage,
  showCardMessageInput,
  setShowCardMessageInput
}) => {
  // Group products by store
  const productsByStore: Record<string, { storeName: string; products: Product[] }> = {};
  
  products.forEach(product => {
    const storeId = product.storeId || 'unknown';
    const storeName = product.storeName || 'Магазин';
    
    if (!productsByStore[storeId]) {
      productsByStore[storeId] = {
        storeName,
        products: []
      };
    }
    
    productsByStore[storeId].products.push(product);
  });

  return (
    <div className="panel mb-6">
      <h2 className="text-xl font-medium mb-4">Ваш заказ</h2>
      
      {Object.entries(productsByStore).map(([storeId, store]) => (
        <div key={storeId} className="mb-4 last:mb-0">
          <StoreHeader storeName={store.storeName} />
          
          <div className="divide-y divide-[#F0F0F0]">
            {store.products.map((product) => (
              <CartItem
                key={product.id}
                {...product}
                onQuantityChange={onQuantityChange}
              />
            ))}
          </div>
        </div>
      ))}
      
      <CardMessage
        cardMessage={cardMessage}
        setCardMessage={setCardMessage}
        showCardMessageInput={showCardMessageInput}
        setShowCardMessageInput={setShowCardMessageInput}
      />
    </div>
  );
};

export default OrderItemsSection;
