
import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Clock, Star, ArrowUpDown, Filter, Truck, ShoppingBag, UserRound, Mail, Phone, Instagram, Facebook, ChevronDown, ChevronUp, Flame, Heart, Gift, Tag, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import LocationFinder from '@/components/LocationFinder';
import PromotionalBanners from '@/components/PromotionalBanners';
import ProductCard from '@/components/ProductCard';
import CartIcon from '@/components/CartIcon';
import { cn } from '@/lib/utils';

// Sample products data
const featuredProducts = [
  {
    id: 'p1',
    name: 'Букет "Нежность" из белых роз и эустомы',
    price: 3990,
    oldPrice: 4990,
    image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
    shopId: '1',
    shopName: 'Цветочный Рай'
  },
  {
    id: 'p2',
    name: 'Букет "Яркое лето" из гербер и хризантем',
    price: 2990,
    image: 'https://avatars.mds.yandex.net/get-eda/371306/2f0969b0bd0c397c78ec42a34c36a16a/orig',
    shopId: '2',
    shopName: 'Букет Столицы'
  },
  {
    id: 'p3',
    name: 'Букет "Романтика" из розовых пионов',
    price: 4590,
    oldPrice: 5500,
    image: 'https://avatars.mds.yandex.net/get-eda/3093654/8aff52cdf0f4057ccaf44adb5c95e917/orig',
    shopId: '3',
    shopName: 'Флорист и Я'
  },
  {
    id: 'p4',
    name: 'Композиция "Элегантность" в шляпной коробке',
    price: 5990,
    image: 'https://avatars.mds.yandex.net/get-eda/3705709/cfcc71439a902ffd979d5c5fd0bc04e9/orig',
    shopId: '4',
    shopName: 'Твой Букет'
  }
];

// Trending products data
const trendingProducts = [
  {
    id: 't1',
    name: 'Букет "Весенняя симфония" из тюльпанов',
    price: 2790,
    image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
    shopId: '1',
    shopName: 'Цветочный Рай',
    trendingLabel: 'Бестселлер'
  },
  {
    id: 't2',
    name: 'Букет "Страстный" из красных роз',
    price: 4990,
    oldPrice: 5990,
    image: 'https://avatars.mds.yandex.net/get-eda/371306/2f0969b0bd0c397c78ec42a34c36a16a/orig',
    shopId: '2',
    shopName: 'Букет Столицы',
    trendingLabel: 'Хит продаж'
  },
  {
    id: 't3',
    name: 'Композиция "Оазис" в стеклянной вазе',
    price: 3890,
    image: 'https://avatars.mds.yandex.net/get-eda/3093654/8aff52cdf0f4057ccaf44adb5c95e917/orig',
    shopId: '3',
    shopName: 'Флорист и Я',
    trendingLabel: 'Новинка'
  },
  {
    id: 't4',
    name: 'Букет "Коралловый риф" из роз и альстромерий',
    price: 3490,
    oldPrice: 3990,
    image: 'https://avatars.mds.yandex.net/get-eda/3705709/cfcc71439a902ffd979d5c5fd0bc04e9/orig',
    shopId: '4',
    shopName: 'Твой Букет',
    trendingLabel: 'Топ рейтинга'
  }
];

// Improved Flower categories data with icons and descriptions
const flowerCategories = [
  {
    id: 'roses',
    name: 'Розы',
    image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
    icon: Heart,
    description: 'Классика и элегантность'
  },
  {
    id: 'bouquets',
    name: 'Букеты',
    image: 'https://avatars.mds.yandex.net/get-eda/3093654/8aff52cdf0f4057ccaf44adb5c95e917/orig',
    icon: Gift,
    description: 'Для любого случая'
  },
  {
    id: 'compositions',
    name: 'Композиции',
    image: 'https://avatars.mds.yandex.net/get-eda/3705709/cfcc71439a902ffd979d5c5fd0bc04e9/orig',
    icon: Sparkles,
    description: 'Уникальные решения'
  },
  {
    id: 'gifts',
    name: 'Подарки',
    image: 'https://avatars.mds.yandex.net/get-eda/371306/2f0969b0bd0c397c78ec42a34c36a16a/orig',
    icon: Tag,
    description: 'К любому празднику'
  },
  {
    id: 'plants',
    name: 'Растения',
    image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
    icon: Sparkles,
    description: 'Для дома и офиса'
  },
  {
    id: 'wedding',
    name: 'Свадебные',
    image: 'https://avatars.mds.yandex.net/get-eda/3093654/8aff52cdf0f4057ccaf44adb5c95e917/orig',
    icon: Heart,
    description: 'Для особого дня'
  }
];

// Quick filter options
const quickFilters = [
  { id: 'birthday', name: 'На день рождения', icon: Gift },
  { id: 'anniversary', name: 'На юбилей', icon: Sparkles },
  { id: 'love', name: 'Признание в любви', icon: Heart },
  { id: 'congratulations', name: 'Поздравления', icon: Tag },
  { id: 'under3000', name: 'До 3000₽', icon: Tag },
  { id: 'same-day', name: 'Доставка сегодня', icon: Truck }
];

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

// Calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
};

// Add coordinates to shops (mock data)
const shopsWithCoordinates = flowerShops.map(shop => ({
  ...shop,
  coordinates: {
    lat: 55.7 + (Math.random() * 0.1), // Mock coordinates around Moscow
    lng: 37.6 + (Math.random() * 0.1)
  },
  distance: null as number | null
}));

const HomePage: React.FC = () => {
  const [address, setAddress] = useState('');
  const [shops, setShops] = useState(shopsWithCoordinates);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleShopClick = (shopId: number) => {
    // No longer need to toggle reviews
    navigate(`/flower-shop?id=${shopId}`);
  };

  const handleShopDetails = (shopId: number) => {
    navigate(`/flower-shop?id=${shopId}`);
  };

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

  const handleLocationFound = (lat: number, lng: number) => {
    // Sort shops by distance from the user
    const shopsWithDistance = shops.map(shop => ({
      ...shop,
      distance: calculateDistance(lat, lng, shop.coordinates.lat, shop.coordinates.lng)
    }));
    
    // Sort shops by distance
    const sortedShops = [...shopsWithDistance].sort((a, b) => {
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;
      return a.distance - b.distance;
    });
    
    setShops(sortedShops);
    
    // Auto-scroll to shops section
    document.getElementById('shops-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    // Navigate to flower shop with category filter
    navigate(`/flower-shop?category=${categoryId}`);
  };

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
  };

  // FAQ state
  const [openFaqItem, setOpenFaqItem] = useState<number | null>(null);
  
  const toggleFaqItem = (index: number) => {
    setOpenFaqItem(openFaqItem === index ? null : index);
  };

  // FAQ data
  const faqItems = [
    {
      question: "Как работает доставка цветов?",
      answer: "Мы доставляем цветы из ближайшего к вам флориста. После оформления заказа наш курьер доставит букет по указанному адресу в течение 1-2 часов."
    },
    {
      question: "Можно ли заказать цветы на определенное время?",
      answer: "Да, при оформлении заказа вы можете выбрать желаемое время доставки. Мы доставим букет в указанный временной интервал."
    },
    {
      question: "Что делать, если получателя нет дома?",
      answer: "Если получателя нет дома, наш курьер свяжется с вами для уточнения дальнейших действий. Мы можем оставить букет у соседей, консьержа или договориться о другом времени доставки."
    },
    {
      question: "Как долго простоят цветы?",
      answer: "Срок свежести зависит от типа цветов. В среднем букеты сохраняют свежесть 5-7 дней. К каждому букету прилагается инструкция по уходу для максимального продления свежести."
    },
    {
      question: "Можно ли оформить возврат?",
      answer: "Если качество букета вас не устроило, сделайте фото в течение 24 часов после получения и свяжитесь с нашей службой поддержки. Мы вернем деньги или заменим букет."
    }
  ];

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
              size="icon"
              onClick={() => navigate('/profile')}
              className="text-gray-600 hover:text-primary"
            >
              <UserRound size={20} />
            </Button>
            <CartIcon />
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
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleAddressSubmit} 
                className="flex-1 py-6 text-base font-medium rounded-md flex items-center justify-center"
              >
                Перейти к каталогу
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <LocationFinder onLocationFound={handleLocationFound} />
            </div>
          </div>
        </div>

        {/* Promotional Banners Section */}
        <PromotionalBanners />

        {/* Enhanced Categories Section */}
        <div className="mb-10 mt-6">
          <h2 className="text-2xl font-bold mb-6">Категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {flowerCategories.map((category) => (
              <div 
                key={category.id} 
                className={cn(
                  "flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer",
                  selectedCategory === category.id && "ring-2 ring-primary"
                )}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="aspect-video relative">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                    <div>
                      <h3 className="text-white font-medium text-lg">{category.name}</h3>
                      <p className="text-white/80 text-xs">{category.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Filters Section - New Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Быстрые фильтры</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => {
              const IconComponent = filter.icon;
              const isActive = activeFilters.includes(filter.id);
              
              return (
                <Button
                  key={filter.id}
                  variant={isActive ? "default" : "outline"}
                  className={cn(
                    "rounded-full text-sm transition-colors py-2 h-auto",
                    isActive ? "bg-primary text-white" : "text-gray-700"
                  )}
                  onClick={() => toggleFilter(filter.id)}
                >
                  <IconComponent size={16} className="mr-1.5" />
                  {filter.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Trending Now Section - New Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Trending Now</h2>
              <Flame className="text-red-500" size={24} />
            </div>
            <Button 
              variant="ghost" 
              className="text-sm"
              onClick={() => navigate('/flower-shop')}
            >
              Смотреть все
              <ArrowRight className="ml-1" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    <Flame size={12} className="animate-pulse" />
                    {product.trendingLabel}
                  </div>
                </div>
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  image={product.image}
                  shopId={product.shopId}
                  shopName={product.shopName}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Популярные букеты</h2>
            <Button 
              variant="ghost" 
              className="text-sm"
              onClick={() => navigate('/flower-shop')}
            >
              Смотреть все
              <ArrowRight className="ml-1" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                image={product.image}
                shopId={product.shopId}
                shopName={product.shopName}
              />
            ))}
          </div>
        </div>

        {/* Flower Shops Section */}
        <div className="mb-16" id="shops-section">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Популярные цветочные магазины</h2>
            <div className="text-sm text-gray-500">
              {shops[0].distance !== null && "Отсортировано по расстоянию"}
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {shops.map((shop) => (
              <div key={shop.id}>
                <div 
                  className="bg-white rounded-md shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleShopClick(shop.id)}
                >
                  <div className="aspect-[3/2] relative">
                    <img 
                      src={shop.image} 
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                    {shop.distance !== null && (
                      <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full">
                        {shop.distance.toFixed(1)} км
                      </div>
                    )}
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
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaqItem(index)}
                >
                  <span>{item.question}</span>
                  {openFaqItem === index ? (
                    <ChevronUp size={18} className="text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaqItem === index && (
                  <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F8F8F8] pt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">О компании</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">О нас</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Контакты</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Вакансии</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Для бизнеса</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Помощь</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Доставка и оплата</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Возврат</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Вопросы и ответы</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Обратная связь</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Партнерам</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Стать партнером</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Для магазинов</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Для курьеров</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Правила платформы</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Контакты</h3>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+78001234567" className="flex items-center text-gray-600 hover:text-primary">
                    <Phone size={16} className="mr-2" />
                    8 (800) 123-45-67
                  </a>
                </li>
                <li>
                  <a href="mailto:info@tsvetomarket.ru" className="flex items-center text-gray-600 hover:text-primary">
                    <Mail size={16} className="mr-2" />
                    info@tsvetomarket.ru
                  </a>
                </li>
                <li className="pt-2">
                  <div className="flex items-center gap-3">
                    <a href="#" className="text-gray-600 hover:text-primary">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary">
                      <Facebook size={20} />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
            © 2023 ЦветоМаркет. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
