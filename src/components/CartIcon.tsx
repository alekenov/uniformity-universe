
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const CartIcon: React.FC = () => {
  const { getCartCount, setCartPanelOpen } = useCart();
  const count = getCartCount();

  const handleClick = (e: React.MouseEvent) => {
    if (count > 0) {
      e.preventDefault();
      setCartPanelOpen(true);
    }
  };

  return (
    <Link to="/cart" className="relative" onClick={handleClick}>
      <ShoppingCart className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#8B5CF6] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
