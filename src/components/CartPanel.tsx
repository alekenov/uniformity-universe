
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CartPanel: React.FC = () => {
  const { 
    isCartPanelOpen, 
    setCartPanelOpen, 
    getCartCount,
    getCartTotal 
  } = useCart();
  
  const count = getCartCount();
  const total = getCartTotal();

  if (!isCartPanelOpen || count === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto border border-gray-200">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#8B5CF6]/10 p-2 rounded-full">
              <ShoppingBag size={18} className="text-[#8B5CF6]" />
            </div>
            <div>
              <span className="font-medium">{count} {count === 1 ? 'товар' : 'товара'}</span>
              <span className="mx-1">·</span>
              <span className="font-medium">{total} ₸</span>
            </div>
          </div>
          
          <Link to="/cart">
            <Button 
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] px-4 py-2 h-9"
              onClick={() => setCartPanelOpen(false)}
            >
              Корзина
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
