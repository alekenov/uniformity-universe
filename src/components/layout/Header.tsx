
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-primary font-semibold text-xl">ЦветоМаркет</div>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-sm"
            onClick={() => navigate('/flower-shop')}
          >
            Каталог
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm"
            onClick={() => navigate('/cart')}
          >
            Корзина
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
