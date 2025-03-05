
import React, { useState } from 'react';
import { MapPin, ArrowRight, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Sample flower shops data
const flowerShops = [
  {
    id: 1,
    name: 'Цветочный Рай',
    address: 'ул. Ленина, 42',
    rating: 4.8,
    deliveryTime: '30-40 мин',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Букет Столицы',
    address: 'ул. Пушкина, 10',
    rating: 4.7,
    deliveryTime: '40-50 мин',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Флорист и Я',
    address: 'пр. Мира, 15',
    rating: 4.9,
    deliveryTime: '20-30 мин',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Твой Букет',
    address: 'ул. Гагарина, 23',
    rating: 4.6,
    deliveryTime: '35-45 мин',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Цветочная Лавка',
    address: 'ул. Достоевского, 8',
    rating: 4.7,
    deliveryTime: '25-35 мин',
    image: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'Розовый Сад',
    address: 'ул. Чехова, 33',
    rating: 4.5,
    deliveryTime: '45-55 мин',
    image: '/placeholder.svg'
  },
  {
    id: 7,
    name: 'Цветы от Ольги',
    address: 'пр. Победы, 12',
    rating: 4.8,
    deliveryTime: '30-45 мин',
    image: '/placeholder.svg'
  },
  {
    id: 8,
    name: 'ФлораМаркет',
    address: 'ул. Тургенева, 5',
    rating: 4.9,
    deliveryTime: '20-35 мин',
    image: '/placeholder.svg'
  },
];

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

  const handleShopClick = (shopId: number) => {
    navigate(`/flower-shop?id=${shopId}`);
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
        <div className="max-w-xl mx-auto mb-16">
          <div className="panel p-6 bg-white rounded-lg shadow-sm">
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

        {/* Flower Shops Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Популярные цветочные магазины</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {flowerShops.map((shop) => (
              <div 
                key={shop.id} 
                className="bg-white rounded-md shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleShopClick(shop.id)}
              >
                <div className="aspect-[3/2] relative">
                  <img 
                    src={shop.image} 
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h3 className="font-medium text-sm mb-0.5 truncate">{shop.name}</h3>
                  <p className="text-gray-500 text-xs mb-1.5 truncate">{shop.address}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star size={12} className="text-yellow-400 mr-0.5" />
                      <span className="text-xs font-medium">{shop.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock size={12} className="mr-0.5" />
                      <span className="text-[10px]">{shop.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
