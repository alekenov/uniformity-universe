
import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartHeaderProps {
  hasItems: boolean;
  onClearCart: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({ hasItems, onClearCart }) => {
  const navigate = useNavigate();
  
  return (
    <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center">
      <button 
        className="p-2 -ml-2 mr-2"
        onClick={() => navigate('/flower-shop')}
      >
        <ArrowLeft size={20} className="icon" />
      </button>
      <h1 className="text-2xl font-medium">Корзина</h1>
      {hasItems && (
        <button 
          className="ml-auto flex items-center text-gray-500 hover:text-red-500"
          onClick={onClearCart}
        >
          <Trash2 size={18} className="icon-sm mr-1" />
          <span className="text-sm">Очистить</span>
        </button>
      )}
    </div>
  );
};

export default CartHeader;
