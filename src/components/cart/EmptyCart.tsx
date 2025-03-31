
import React from 'react';
import { ShoppingBag } from 'lucide-react';

const EmptyCart: React.FC = () => {
  return (
    <div className="panel text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F0F0F0] flex items-center justify-center">
        <ShoppingBag size={24} className="text-gray-400" />
      </div>
      <h2 className="text-xl font-medium mb-2">Ваша корзина пуста</h2>
      <p className="text-gray-500 mb-6">Добавьте товары для оформления заказа</p>
      <button className="checkout-button bg-[#8B5CF6] hover:bg-[#7C3AED] active-scale">
        Перейти в каталог
      </button>
    </div>
  );
};

export default EmptyCart;
