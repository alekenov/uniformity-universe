
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyCartDrawer: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F0F0F0] flex items-center justify-center">
        <ShoppingBag size={24} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">Ваша корзина пуста</h3>
      <p className="text-gray-500 mb-4">Добавьте товары для оформления заказа</p>
      <Button 
        onClick={() => navigate('/flower-shop')}
        className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
      >
        Перейти в каталог
      </Button>
    </div>
  );
};

export default EmptyCartDrawer;
