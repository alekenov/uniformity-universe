
import React, { useState } from 'react';
import { ArrowLeft, Flower, MapPin, Clock, Truck, Heart, ShoppingBag, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FlowerProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface FlowerShopInfo {
  name: string;
  rating: number;
  reviewCount: number;
  description: string;
  address: string;
  deliveryInfo: {
    price: number;
    freeDeliveryThreshold?: number;
    estimatedTime: string;
  };
}

const shopInfo: FlowerShopInfo = {
  name: "Цветочный Рай",
  rating: 4.8,
  reviewCount: 124,
  description: "Свежие цветы, букеты и композиции для любого события. Доставка в день заказа.",
  address: "ул. Пушкинская, 10",
  deliveryInfo: {
    price: 350,
    freeDeliveryThreshold: 2000,
    estimatedTime: "30-60 мин"
  }
};

const featuredProducts: FlowerProduct[] = [
  {
    id: "featured-1",
    name: "Премиум букет 'Элегантность'",
    price: 4500,
    image: "https://images.unsplash.com/photo-1596438459194-f275f413d6ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    description: "Изысканная композиция из премиальных цветов для особых случаев"
  },
  {
    id: "featured-2",
    name: "Свадебный букет 'Гармония'",
    price: 6800,
    image: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    description: "Безупречный букет для самого особенного дня"
  },
  {
    id: "featured-3",
    name: "Сезонная композиция 'Вдохновение'",
    price: 3900,
    image: "https://images.unsplash.com/photo-1599733594230-6b9bef2f9346?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    description: "Яркая композиция из свежих сезонных цветов"
  }
];

const flowerProducts: FlowerProduct[] = [
  {
    id: "1",
    name: "Букет 'Весеннее настроение'",
    price: 1500,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Яркий букет из сезонных цветов"
  },
  {
    id: "2",
    name: "Букет роз 'Классика'",
    price: 2300,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Классический букет из 11 красных роз"
  },
  {
    id: "3",
    name: "Композиция 'Нежность'",
    price: 3200,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Изысканная композиция из белых цветов"
  },
  {
    id: "4",
    name: "Букет 'Летний день'",
    price: 1800,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Яркий букет из полевых цветов"
  },
];

const FlowerShop: React.FC = () => {
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedAddress, setSelectedAddress] = useState("Выберите адрес доставки");
  
  const handleAddressSelect = () => {
    navigate('/address-selection');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="p-2 -ml-2 mr-2">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-medium">Цветочный магазин</h1>
        </div>
      </header>
      
      <main className="container max-w-3xl mx-auto px-4 py-4">
        {/* Compact Shop Cover and Info */}
        <div className="panel mb-4 p-0 overflow-hidden">
          <div className="p-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#E5DEFF] flex items-center justify-center flex-shrink-0">
              <Flower size={20} className="text-[#8B5CF6]" />
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">{shopInfo.name}</h2>
                <div className="flex items-center text-sm">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{shopInfo.rating}</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-gray-500">{shopInfo.reviewCount} отзывов</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Products - Large Airbnb-style Cards */}
        <div className="mb-6">
          <div className="space-y-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="relative rounded-2xl overflow-hidden shadow-md bg-white border border-[#F0F0F0]">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <Heart size={20} className="text-gray-600 hover:text-pink-500 transition-colors" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <span className="bg-[#F8F8F8] py-1 px-3 rounded-full text-sm font-medium">{product.price} ₸</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="text-yellow-400 mr-1">★</div>
                      <div className="text-sm">{shopInfo.rating} <span className="text-gray-500">• {shopInfo.reviewCount} отзывов</span></div>
                    </div>
                    
                    <button className="flex items-center justify-center gap-1 bg-[#8B5CF6] text-white py-2 px-4 rounded-lg hover:bg-[#7C3AED] transition-colors">
                      <ShoppingBag size={16} />
                      <span>В корзину</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Delivery info */}
        <div className="panel mb-4">
          <h3 className="font-medium text-lg mb-3">Доставка</h3>
          
          <div className="flex mb-4 bg-[#F8F8F8] rounded-lg p-1">
            <button
              className={cn(
                "flex-1 py-2 text-sm rounded-md transition-all",
                delivery === 'delivery' 
                  ? "bg-white shadow-sm font-medium" 
                  : "text-gray-600 hover:bg-white/50"
              )}
              onClick={() => setDelivery('delivery')}
            >
              Доставка
            </button>
            <button
              className={cn(
                "flex-1 py-2 text-sm rounded-md transition-all",
                delivery === 'pickup' 
                  ? "bg-white shadow-sm font-medium" 
                  : "text-gray-600 hover:bg-white/50"
              )}
              onClick={() => setDelivery('pickup')}
            >
              Самовывоз
            </button>
          </div>
          
          {delivery === 'delivery' ? (
            <>
              <div className="flex justify-between items-center py-2 border-b border-[#F0F0F0]">
                <div className="text-sm">Стоимость доставки</div>
                <div className="font-medium">{shopInfo.deliveryInfo.price} ₸</div>
              </div>
              
              {shopInfo.deliveryInfo.freeDeliveryThreshold && (
                <div className="flex justify-between items-center py-2 border-b border-[#F0F0F0]">
                  <div className="text-sm">Бесплатно от</div>
                  <div className="font-medium">{shopInfo.deliveryInfo.freeDeliveryThreshold} ₸</div>
                </div>
              )}
              
              <div className="flex justify-between items-center py-2 border-b border-[#F0F0F0]">
                <div className="text-sm">Время доставки</div>
                <div className="font-medium">{shopInfo.deliveryInfo.estimatedTime}</div>
              </div>
              
              <div 
                className="flex items-center justify-between mt-4 p-3 bg-[#F8F8F8] rounded-lg cursor-pointer"
                onClick={handleAddressSelect}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                    <MapPin size={16} className="text-gray-600" />
                  </div>
                  <div className="text-sm font-medium">{selectedAddress}</div>
                </div>
                <ArrowLeft size={16} className="text-gray-400 transform rotate-180" />
              </div>
            </>
          ) : (
            <div className="flex items-start p-3 bg-[#F8F8F8] rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white mr-3">
                <MapPin size={16} />
              </div>
              <div className="flex-grow">
                <div className="font-medium">Магазин на {shopInfo.address}</div>
                <div className="text-sm text-gray-600 mt-1">Время работы: 8:00 - 22:00</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Products */}
        <div className="panel">
          <h3 className="font-medium text-lg mb-4">Популярные товары</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {flowerProducts.map((product) => (
              <div key={product.id} className="bg-white border border-[#F0F0F0] rounded-lg overflow-hidden">
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                </div>
                
                <div className="p-3">
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h4>
                  {product.description && (
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{product.price} ₸</div>
                    <button className="w-8 h-8 bg-[#F8F8F8] rounded-full flex items-center justify-center hover:bg-[#F0F0F0] transition-colors">
                      <ShoppingBag size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="w-full mt-4">
            Смотреть все товары
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FlowerShop;
