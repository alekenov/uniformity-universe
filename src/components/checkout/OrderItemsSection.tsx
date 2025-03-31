
import React from 'react';
import CartItem from '@/components/CartItem';
import CardMessage from '@/components/cart/CardMessage';
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
  return (
    <div className="panel mb-6">
      <h2 className="text-xl font-medium mb-4">Ваш заказ</h2>
      <div className="divide-y divide-[#F0F0F0]">
        {products.map((product) => (
          <CartItem
            key={product.id}
            {...product}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>
      
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
