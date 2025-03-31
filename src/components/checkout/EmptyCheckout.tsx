
import React from 'react';
import { Button } from '@/components/ui/button';

const EmptyCheckout: React.FC = () => {
  return (
    <div className="panel text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F0F0F0] flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 6H21" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="text-xl font-medium mb-2">Ваша корзина пуста</h2>
      <p className="text-gray-500 mb-6">Добавьте товары для оформления заказа</p>
      <Button className="bg-primary text-white font-medium py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors">
        Перейти в каталог
      </Button>
    </div>
  );
};

export default EmptyCheckout;
