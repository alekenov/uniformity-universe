
import React from 'react';
import { Product } from '@/types/cart';

interface SuggestionProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const SuggestionProductItem: React.FC<SuggestionProductItemProps> = ({ 
  product, 
  onAddToCart 
}) => {
  return (
    <div 
      className="panel p-0 overflow-hidden hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"
      onClick={() => onAddToCart(product)}
    >
      <div className="aspect-square bg-[#f9f9f9] flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2">
        <div className="font-medium text-sm">{product.price} ₸</div>
        <div className="text-xs line-clamp-1">{product.name}</div>
        <div className="text-xs text-gray-500">{product.description}</div>
      </div>
    </div>
  );
};

export default SuggestionProductItem;
