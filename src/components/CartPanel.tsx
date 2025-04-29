
import React, { useEffect, useState } from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import CartDrawerContent from './cart/CartDrawerContent';
import { useLocation } from 'react-router-dom';

const CartPanel: React.FC = () => {
  const { 
    isCartPanelOpen, 
    setCartPanelOpen, 
    getCartCount,
    getCartTotal 
  } = useCart();
  
  const location = useLocation();
  const isCheckoutPage = location.pathname === '/checkout';
  const [isClosing, setIsClosing] = useState(false);
  
  const count = getCartCount();
  const total = getCartTotal();

  // Close cart panel when navigating to checkout with improved reliability
  useEffect(() => {
    if (isCheckoutPage && isCartPanelOpen) {
      setIsClosing(true);
      
      // Use a very significant delay to ensure the panel closes properly
      setTimeout(() => {
        setCartPanelOpen(false);
        setIsClosing(false);
      }, 500);
    }
  }, [isCheckoutPage, isCartPanelOpen, setCartPanelOpen]);

  // Hide the cart panel if it's not open, cart is empty, or we're on the checkout page
  if (!isCartPanelOpen || count === 0 || isCheckoutPage) {
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
                disabled={isClosing}
              >
                {isClosing ? (
                  <>
                    <Loader2 size={12} className="animate-spin mr-1" />
                    Загрузка
                  </>
                ) : (
                  'Корзина'
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh]">
              <CartDrawerContent />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
