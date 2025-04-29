
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

interface CartSummaryProps {
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ total }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleCheckout = () => {
    // On mobile, we need to ensure the drawer closes properly before navigation
    if (isMobile) {
      // Increase timeout to ensure drawer has time to close first
      setTimeout(() => {
        navigate('/checkout');
      }, 300); // Increased from 100ms to 300ms for better reliability on slower devices
    } else {
      // On desktop, we can navigate immediately
      navigate('/checkout');
    }
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
        >
          Оформить заказ
        </Button>
      </DrawerClose>
    </div>
  );
};

export default CartSummary;
