
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/cart';

interface SuggestionProductsProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const SuggestionProducts: React.FC<SuggestionProductsProps> = ({ 
  products, 
  addToCart 
}) => {
  const { toast } = useToast();
  
  const handleAddProduct = (product: Product) => {
    addToCart(product);
    toast({
      title: "Добавлено",
      description: `${product.name} добавлен в корзину`,
    });
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-3">Что-то ещё?</h2>
      <div className="grid grid-cols-3 gap-3">
        {products.map(product => (
          <div 
            key={product.id} 
            className="panel p-0 overflow-hidden hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"
            onClick={() => handleAddProduct(product)}
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
        ))}
      </div>
    </div>
  );
};

export default SuggestionProducts;
