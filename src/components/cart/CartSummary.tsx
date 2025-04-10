
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';

interface CartSummaryProps {
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ total }) => {
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
    // Drawer will be closed automatically by using DrawerClose
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
