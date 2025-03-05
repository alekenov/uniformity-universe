
import React, { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const HomePage: React.FC = () => {
  const [address, setAddress] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      toast({
        title: "Введите адрес",
        description: "Пожалуйста, укажите адрес доставки",
        variant: "destructive",
      });
      return;
    }

    // Store the address and navigate to flower shop
    localStorage.setItem('deliveryAddress', address);
    navigate('/flower-shop');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Свежие цветы с доставкой
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Доставляем букеты из ближайшего к вам цветочного магазина за 1-2 часа
          </p>
        </div>

        {/* Address Input Section */}
        <div className="max-w-xl mx-auto">
          <div className="panel p-6">
            <h2 className="text-xl font-medium mb-4">Куда доставить цветы?</h2>
            <form onSubmit={handleAddressSubmit}>
              <div className="relative mb-4">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MapPin size={20} />
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Введите адрес доставки"
                  className="w-full bg-[#F8F8F8] border-0 rounded-md py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
              <Button type="submit" className="w-full py-6 text-base font-medium rounded-md flex items-center justify-center">
                Найти ближайшие магазины
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F8F8F8] py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © 2023 ЦветоМаркет. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
