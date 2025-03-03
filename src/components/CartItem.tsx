
import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  unit?: string;
  image?: string;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  description,
  price,
  oldPrice,
  quantity,
  unit = "шт",
  image,
  onQuantityChange,
}) => {
  return (
    <div className="flex py-4 border-b border-[#F0F0F0] last:border-0">
      {image && (
        <div className="flex-shrink-0 w-20 h-20 mr-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex-grow">
        <div className="flex flex-col">
          <h3 className="text-base font-medium text-gray-900">{name}</h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
          <div className="flex items-center mt-1">
            <span className="text-[#FF6633] font-medium mr-2">
              {price} ₽
            </span>
            {oldPrice && (
              <span className="text-gray-400 text-sm line-through">
                {oldPrice} ₽
              </span>
            )}
            {unit && unit !== "шт" && (
              <span className="text-gray-500 text-sm ml-1">· {unit}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end ml-4">
        <div className="flex items-center bg-[#F8F8F8] rounded-full px-2">
          <button
            onClick={() => onQuantityChange(id, Math.max(0, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-9 text-center font-medium">{quantity}</span>
          <button
            onClick={() => onQuantityChange(id, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
