
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="flex py-3 px-3 group hover:bg-gray-50 transition-colors duration-200">
      {image && (
        <div className="flex-shrink-0 w-16 h-16 mr-3 bg-[#f8f8f8] rounded overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex-grow min-w-0">
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-black transition-colors">{name}</h3>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
          <div className="flex items-center mt-1">
            <span className="font-medium text-sm mr-1">
              {price} ₸
            </span>
            {weight && (
              <span className="text-gray-500 text-xs">· {weight}</span>
            )}
            {oldPrice && (
              <span className="text-gray-400 text-xs line-through ml-1">
                {oldPrice} ₸
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end ml-2">
        <div className={cn(
          "flex items-center bg-[#F8F8F8] rounded-full h-6 transition-all duration-200",
          "hover:shadow-sm"
        )}>
          <button
            onClick={() => onQuantityChange(id, Math.max(0, quantity - 1))}
            className={cn(
              "w-6 h-6 flex items-center justify-center text-gray-500 rounded-full",
              "hover:bg-gray-200 hover:text-gray-700 transition-colors active-scale"
            )}
            aria-label="Decrease quantity"
          >
            <Minus size={12} strokeWidth={2.5} className="icon-sm" />
          </button>
          <span className="w-6 text-center font-medium text-xs">
            {unit === "кг" ? `${quantity.toFixed(1)}кг` : quantity}
          </span>
          <button
            onClick={() => onQuantityChange(id, quantity + 1)}
            className={cn(
              "w-6 h-6 flex items-center justify-center text-gray-500 rounded-full",
              "hover:bg-gray-200 hover:text-gray-700 transition-colors active-scale"
            )}
            aria-label="Increase quantity"
          >
            <Plus size={12} strokeWidth={2.5} className="icon-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
