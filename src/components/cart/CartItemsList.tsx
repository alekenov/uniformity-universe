
import React from 'react';
import CartItem from '@/components/CartItem';
import { CartProduct } from '@/contexts/CartContext';

interface CartItemsListProps {
  cartItems: CartProduct[];
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ cartItems, onQuantityChange }) => {
  return (
    <div className="mb-4 rounded-md border border-gray-100 overflow-hidden">
      <div className="divide-y divide-[#F0F0F0]">
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItemsList;
