
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
    // Простая и надежная логика - вместо использования DrawerClose в качестве родителя для кнопки,
    // мы будем программно переходить на страницу checkout безусловно
    setTimeout(() => {
      navigate('/checkout');
    }, 700); // Установим достаточно долгую задержку, чтобы drawer успел закрыться
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
      >
        Оформить заказ
      </Button>
    </div>
  );
};

export default CartSummary;
