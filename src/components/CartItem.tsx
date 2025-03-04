
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
  weight?: string;
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
  weight,
  image,
  onQuantityChange,
}) => {
  return (
    <div className="flex py-4 px-4">
      {image && (
        <div className="flex-shrink-0 w-20 h-20 mr-4 bg-[#f8f8f8] rounded">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}
      <div className="flex-grow">
        <div className="flex flex-col">
          <h3 className="text-base font-medium text-gray-900">{name}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          <div className="flex items-center mt-1">
            <span className="font-medium mr-2">
              {price} ₸
            </span>
            {weight && (
              <span className="text-gray-500 text-sm">· {weight}</span>
            )}
            {oldPrice && (
              <span className="text-gray-400 text-sm line-through ml-2">
                {oldPrice} ₸
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end ml-4">
        <div className="flex items-center bg-[#F8F8F8] rounded-full h-7">
          <button
            onClick={() => onQuantityChange(id, Math.max(0, quantity - 1))}
            className="w-7 h-7 flex items-center justify-center text-gray-500"
            aria-label="Decrease quantity"
          >
            <Minus size={14} strokeWidth={2.5} />
          </button>
          <span className="w-7 text-center font-medium text-sm">
            {unit === "кг" ? `${quantity.toFixed(1)}кг` : quantity}
          </span>
          <button
            onClick={() => onQuantityChange(id, quantity + 1)}
            className="w-7 h-7 flex items-center justify-center text-gray-500"
            aria-label="Increase quantity"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
