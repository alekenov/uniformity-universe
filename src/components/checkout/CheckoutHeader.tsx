
import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface CheckoutHeaderProps {
  hasProducts: boolean;
  clearCart: () => void;
}

const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ hasProducts, clearCart }) => {
  const { toast } = useToast();

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Корзина очищена",
      description: "Все товары были удалены из корзины",
    });
  };

  return (
    <header className="bg-white sticky top-0 z-10 shadow-sm">
      <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center">
        <Link to="/cart" className="p-2 -ml-2 mr-2">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-medium">Оформление заказа</h1>
        {hasProducts && (
          <button 
            className="ml-auto flex items-center text-gray-500 hover:text-red-500"
            onClick={handleClearCart}
          >
            <Trash2 size={18} className="mr-1" />
            <span className="text-sm">Очистить</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default CheckoutHeader;
