import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShoppingBag, ArrowLeft, Sparkles, Percent, ShieldCheck, MessageSquare } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-xl font-medium">Главная</h1>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-6 pb-20">
        {/* Delivery options */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Куда доставить?</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/address-selection">
              <div className="panel flex flex-col items-center justify-center border rounded-[16px] p-3 gap-2 cursor-pointer transition-all hover:bg-gray-50">
                <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center">
                  <MapPin size={24} className="text-blue-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium">Укажите адрес</h3>
                  <p className="text-sm text-gray-500">Начните оформление</p>
                </div>
              </div>
            </Link>
            <Link to="/flower-shop">
              <div className="panel flex flex-col items-center justify-center border rounded-[16px] p-3 gap-2 cursor-pointer transition-all hover:bg-gray-50">
                <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center">
                  <ShoppingBag size={24} className="text-blue-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium">Заказать сейчас</h3>
                  <p className="text-sm text-gray-500">Любые товары</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Services */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Наши услуги</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="panel flex items-center hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center mr-3">
                <Sparkles size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Акции и скидки</h3>
                <p className="text-sm text-gray-500">Выгодные предложения</p>
              </div>
              <ArrowLeft size={16} className="ml-auto transform rotate-180 text-gray-400" />
            </div>
            <div className="panel flex items-center hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center mr-3">
                <Percent size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Бонусная программа</h3>
                <p className="text-sm text-gray-500">Копите бонусы</p>
              </div>
              <ArrowLeft size={16} className="ml-auto transform rotate-180 text-gray-400" />
            </div>
            <div className="panel flex items-center hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center mr-3">
                <ShieldCheck size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Гарантия качества</h3>
                <p className="text-sm text-gray-500">Только свежие продукты</p>
              </div>
              <ArrowLeft size={16} className="ml-auto transform rotate-180 text-gray-400" />
            </div>
            <div className="panel flex items-center hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center mr-3">
                <MessageSquare size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Отзывы</h3>
                <p className="text-sm text-gray-500">Что о нас говорят</p>
              </div>
              <ArrowLeft size={16} className="ml-auto transform rotate-180 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Flower shop link */}
        <Link to="/flower-shop" className="w-full">
          <div className="panel flex items-center hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center mr-3">
              <ShoppingBag size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Заказать цветы</h3>
              <p className="text-sm text-gray-500">Свежие букеты с доставкой</p>
            </div>
            <ArrowLeft size={16} className="ml-auto transform rotate-180 text-gray-400" />
          </div>
        </Link>
        <Link to="/products" className="w-full">
          <div className="panel flex items-center hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center mr-3">
              <ShoppingBag size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Каталог товаров</h3>
              <p className="text-sm text-gray-500">Просмотр в разных видах</p>
            </div>
            <ArrowLeft size={16} className="ml-auto transform rotate-180 text-gray-400" />
          </div>
        </Link>
      </main>
    </div>
  );
};

export default HomePage;
