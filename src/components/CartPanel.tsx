
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import CartDrawerContent from './cart/CartDrawerContent';

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
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-[280px] mx-auto border border-gray-200">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#8B5CF6]/10 p-2 rounded-full">
              <ShoppingBag size={16} className="text-[#8B5CF6]" />
            </div>
            <div>
              <span className="font-medium text-sm">{count} {count === 1 ? 'товар' : 'товара'}</span>
              <span className="mx-1 text-sm">·</span>
              <span className="font-medium text-sm">{total} ₸</span>
            </div>
          </div>
          
          <Drawer>
            <DrawerTrigger asChild>
              <Button 
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] px-3 py-1.5 h-8 text-xs"
              >
                Корзина
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
              <CartDrawerContent />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
