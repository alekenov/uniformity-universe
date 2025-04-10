
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/cart';
import SuggestionProductItem from './SuggestionProductItem';

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
          <SuggestionProductItem
            key={product.id}
            product={product}
            onAddToCart={handleAddProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestionProducts;
