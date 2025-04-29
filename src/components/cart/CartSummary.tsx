
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { DrawerClose } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

interface CartSummaryProps {
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ total }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isNavigating, setIsNavigating] = useState(false);
  
  const handleCheckout = () => {
    // Prevent multiple clicks
    if (isNavigating) return;
    
    // Show loading state
    setIsNavigating(true);
    
    // For mobile: use a very reliable approach with DrawerClose component
    // and navigation with significant delay to ensure UI transitions complete
    setTimeout(() => {
      // Navigate programmatically after drawer has had time to close
      navigate('/checkout');
    }, 1000);
  };
  
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] mt-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">Итого</span>
        <span className="font-medium">{total} ₸</span>
      </div>
      <DrawerClose asChild>
        <Button
          className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED]"
          onClick={handleCheckout}
          disabled={isNavigating}
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
      </DrawerClose>
    </div>
  );
};

export default CartSummary;
