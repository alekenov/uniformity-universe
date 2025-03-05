
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  shopId: string;
  shopName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  oldPrice,
  image,
  shopId,
  shopName
}) => {
  const { addToCart, setCartPanelOpen } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1,
      shopId,
      shopName
    });
    
    // Set the cart panel to be visible
    setCartPanelOpen(true);
    
    // Show toast notification
    toast({
      title: "Товар добавлен в корзину",
      description: name,
    });
  };

  // Format price in rubles
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col h-full">
      <div className="aspect-[3/2] relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        {oldPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {Math.round((1 - price / oldPrice) * 100)}% скидка
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-medium text-sm mb-1 line-clamp-2 h-10">{name}</h3>
        <p className="text-gray-500 text-xs mb-2">{shopName}</p>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="font-bold text-lg">{formatPrice(price)}</div>
            {oldPrice && (
              <div className="text-gray-400 text-xs line-through">{formatPrice(oldPrice)}</div>
            )}
          </div>
          <Button 
            onClick={handleAddToCart} 
            size="sm"
            className="rounded-full h-9 w-9 p-0 flex items-center justify-center"
          >
            <ShoppingBag size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
