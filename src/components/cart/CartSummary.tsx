
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/contexts/CartContext';

interface CartSummaryProps {
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ total }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isNavigating, setIsNavigating] = useState(false);
  const { setDrawerOpen } = useCart();
  
  const handleCheckout = () => {
    // Prevent multiple clicks
    if (isNavigating) return;
    
    console.log('[CartSummary] Starting checkout process, isMobile:', isMobile);
    
    // Show loading state
    setIsNavigating(true);
    
    // First close the drawer programmatically
    console.log('[CartSummary] Closing drawer');
    setDrawerOpen(false);
    
    // Use different timing strategies for mobile vs desktop
    const delay = isMobile ? 1200 : 800;
    
    console.log('[CartSummary] Navigating to checkout in', delay, 'ms');
    setTimeout(() => {
      console.log('[CartSummary] Executing navigation to /checkout');
      navigate('/checkout');
      setIsNavigating(false);
    }, delay);
  };
  
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] mt-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">Итого</span>
        <span className="font-medium">{total} ₸</span>
      </div>
      <Button
        className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED]"
        onClick={handleCheckout}
        disabled={isNavigating}
        onTouchStart={(e) => {
          console.log('[CartSummary] Touch start event');
          e.preventDefault();
        }}
        onTouchEnd={(e) => {
          console.log('[CartSummary] Touch end event');
          e.preventDefault();
          if (!isNavigating) {
            handleCheckout();
          }
        }}
      >
        {isNavigating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Переход...
          </>
        ) : (
          'Оформить заказ'
        )}
      </Button>
    </div>
  );
};

export default CartSummary;
