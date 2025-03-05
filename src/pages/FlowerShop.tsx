
import React, { useState } from 'react';
import { ArrowLeft, Flower, MapPin, Clock, Truck, ShoppingBag, Star, Filter, ArrowUpDown, Search, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import CartIcon from '@/components/CartIcon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface FlowerProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
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
    images: [
      "https://images.unsplash.com/photo-1596438459194-f275f413d6ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561181286-d5c73134c97b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Премиум", "Розы", "Пионы"],
    rating: 4.9,
    reviewCount: 48
  },
  {
    id: "featured-2",
    name: "Свадебный букет 'Гармония'",
    price: 6800,
    images: [
      "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561181286-b5eb8d0cbd51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Свадебные", "Белые", "Лилии"],
    rating: 5.0,
    reviewCount: 36
  },
  {
    id: "featured-3",
    name: "Сезонная композиция 'Вдохновение'",
    price: 3900,
    images: [
      "https://images.unsplash.com/photo-1599733594230-6b9bef2f9346?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    ],
    tags: ["Сезонные", "Полевые", "Композиция"],
    rating: 4.7,
    reviewCount: 29
  }
];

const flowerProducts: FlowerProduct[] = [
  {
    id: "1",
    name: "Букет 'Весеннее настроение'",
    price: 1500,
    images: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    tags: ["Весенние", "Тюльпаны", "Нарциссы"],
    rating: 4.5,
    reviewCount: 18
  },
  {
    id: "2",
    name: "Букет роз 'Классика'",
    price: 2300,
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    tags: ["Классика", "Розы", "Красные"],
    rating: 4.8,
    reviewCount: 32
  },
  {
    id: "3",
    name: "Композиция 'Нежность'",
    price: 3200,
    images: ["https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    tags: ["Нежные", "Пастельные", "Композиция"],
    rating: 4.6,
    reviewCount: 24
  },
  {
    id: "4",
    name: "Букет 'Летний день'",
    price: 1800,
    images: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
    tags: ["Летние", "Яркие", "Подсолнухи"],
    rating: 4.4,
    reviewCount: 16
  },
];

const birthdayProducts: FlowerProduct[] = [
  {
    id: "birthday-1",
    name: "Праздничный букет 'День рождения'",
    price: 2800,
    images: ["https://images.unsplash.com/photo-1591886960571-74d43a9d4166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"],
    tags: ["День рождения", "Яркие", "Герберы"],
    rating: 4.7,
    reviewCount: 22
  },
  {
    id: "birthday-2",
    name: "Сюрприз 'Поздравляю'",
    price: 3300,
    images: ["https://images.unsplash.com/photo-1574180045827-681f8a1a9622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"],
    tags: ["Подарок", "Микс", "Праздничные"],
    rating: 4.8,
    reviewCount: 19
  },
  {
    id: "birthday-3",
    name: "Букет 'Радость'",
    price: 2100,
    images: ["https://images.unsplash.com/photo-1599733594230-6b9bef2f9346?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"],
    tags: ["Праздничные", "Воздушные", "Яркие"],
    rating: 4.5,
    reviewCount: 14
  },
  {
    id: "birthday-4",
    name: "Букет 'Счастье'",
    price: 1900,
    images: ["https://images.unsplash.com/photo-1561181286-d5c73134c97b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"],
    tags: ["Яркие", "Гвоздики", "Ромашки"],
    rating: 4.3,
    reviewCount: 11
  },
];

const specialOfferProducts: FlowerProduct[] = [
  {
    id: "special-1",
    name: "Букет дня со скидкой 15%",
    price: 1750,
    images: ["https://images.unsplash.com/photo-1578022761797-b8636ac1773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"],
    tags: ["Скидка", "Акция", "Лилии"],
    rating: 4.6,
    reviewCount: 8
  },
  {
    id: "special-2",
    name: "Комплект 'Букет + ваза'",
    price: 3600,
    images: ["https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"],
    tags: ["Комплект", "Подарок", "Ваза"],
    rating: 4.9,
    reviewCount: 15
  },
  {
    id: "special-3",
    name: "Выгодный набор 'Для любимой'",
    price: 4200,
    images: ["https://images.unsplash.com/photo-1596438459194-f275f413d6ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"],
    tags: ["Набор", "Розы", "Скидка"],
    rating: 4.8,
    reviewCount: 20
  },
  {
    id: "special-4",
    name: "Весенняя акция -20%",
    price: 1600,
    images: ["https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"],
    tags: ["Акция", "Весенние", "Тюльпаны"],
    rating: 4.5,
    reviewCount: 12
  },
];

const reviews = [
  {
    id: 1,
    author: "Елена К.",
    date: "15 мая 2023",
    rating: 5,
    text: "Заказывала букет 'Элегантность' на юбилей мамы. Доставили вовремя, цветы свежие, очень красивая композиция. Мама была в восторге! Большое спасибо за качественный сервис.",
    helpful: 24
  },
  {
    id: 2,
    author: "Алексей П.",
    date: "3 апреля 2023",
    rating: 4,
    text: "Хороший выбор цветов, быстрая доставка. Единственное, хотелось бы больше вариантов для мужских букетов.",
    helpful: 15
  },
  {
    id: 3,
    author: "Марина С.",
    date: "28 марта 2023",
    rating: 5,
    text: "Регулярно заказываю цветы в этом магазине. Всегда свежие, красивые букеты и композиции. Отдельное спасибо флористам за творческий подход!",
    helpful: 32
  }
];

const ProductCard = ({ product, shopId, shopName }: { product: FlowerProduct, shopId: string, shopName: string }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      shopId,
      shopName
    });
  };
  
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };
  
  return (
    <div 
      className="bg-white border border-[#F0F0F0] rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.images[currentImageIndex] || product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
              {product.tags[0]}
            </span>
          </div>
        )}
        
        {/* Image navigation dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {product.images.map((_, idx) => (
              <button 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h4 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h4>
        
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs">{product.rating} <span className="text-gray-500">({product.reviewCount})</span></span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="font-medium">{product.price} ₸</div>
          <button 
            className="w-8 h-8 bg-[#F8F8F8] rounded-full flex items-center justify-center hover:bg-[#F0F0F0] transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TagFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const allTags = [
    "Розы", "Тюльпаны", "Пионы", "Лилии", "Герберы", "Орхидеи",
    "Премиум", "Скидка", "Акция", "День рождения", "Свадебные",
    "Классика", "Нежные", "Яркие", "Композиция", "Комплект"
  ];
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-1 ${selectedTags.length > 0 ? 'border-primary text-primary' : ''}`}
        >
          <Filter size={16} />
          Фильтр
          {selectedTags.length > 0 && <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{selectedTags.length}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="start">
        <h3 className="font-medium mb-3">Выберите категории</h3>
        <div className="max-h-60 overflow-y-auto">
          {allTags.map(tag => (
            <div key={tag} className="flex items-center space-x-2 mb-2">
              <Checkbox 
                id={`tag-${tag}`} 
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => toggleTag(tag)}
              />
              <label
                htmlFor={`tag-${tag}`}
                className="text-sm cursor-pointer"
              >
                {tag}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 pt-2 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSelectedTags([])}
          >
            Сбросить
          </Button>
          <Button 
            size="sm" 
            onClick={() => setIsOpen(false)}
          >
            Применить
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const SortOptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("popular");
  
  const options = [
    { id: "popular", name: "По популярности" },
    { id: "price-asc", name: "Сначала дешевле" },
    { id: "price-desc", name: "Сначала дороже" },
    { id: "rating", name: "По рейтингу" },
    { id: "new", name: "Сначала новинки" },
  ];
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <ArrowUpDown size={16} />
          {options.find(o => o.id === sortOption)?.name}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="flex flex-col">
          {options.map(option => (
            <button
              key={option.id}
              className={`text-sm text-left px-3 py-2 rounded-md hover:bg-secondary transition-colors ${sortOption === option.id ? 'bg-secondary font-medium' : ''}`}
              onClick={() => {
                setSortOption(option.id);
                setIsOpen(false);
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const FlowerShop: React.FC = () => {
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedAddress, setSelectedAddress] = useState("Выберите адрес доставки");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  
  // All filter tags
  const allTags = [
    "Розы", "Тюльпаны", "Пионы", "Лилии", "Герберы", "Орхидеи",
    "Премиум", "Скидка", "Акция", "День рождения", "Свадебные",
    "Классика", "Нежные", "Яркие", "Композиция", "Комплект"
  ];
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  
  const handleAddressSelect = () => {
    navigate('/address-selection');
  };

  const handleAddToCart = (product: FlowerProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      shopId: "flower-shop-1",
      shopName: shopInfo.name
    });
  };
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors">
            <ArrowLeft size={20} />
          </Link>
        </div>
      </header>
      
      <main className="container max-w-3xl mx-auto px-4 py-4 pb-20">
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
        
        <div className="panel mb-4">
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
              </div>
            </div>
          )}
        </div>
        
        <div className="panel mb-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Поиск букетов и композиций..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F8F8] rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <TagFilter />
            <SortOptions />
            <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
              <Clock size={16} />
              Сегодня
            </Button>
            <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
              <Truck size={16} />
              Бесплатная доставка
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="space-y-4">
            {/* Featured products */}
            <h3 className="font-medium mb-3">Популярные букеты</h3>
            <div className="grid grid-cols-2 gap-3">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  shopId="flower-shop-1" 
                  shopName={shopInfo.name} 
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-3">Все букеты</h3>
          <div className="grid grid-cols-2 gap-3">
            {flowerProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                shopId="flower-shop-1" 
                shopName={shopInfo.name} 
              />
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-3">Для дня рождения</h3>
          <div className="grid grid-cols-2 gap-3">
            {birthdayProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                shopId="flower-shop-1" 
                shopName={shopInfo.name} 
              />
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-3">Специальные предложения</h3>
          <div className="grid grid-cols-2 gap-3">
            {specialOfferProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                shopId="flower-shop-1" 
                shopName={shopInfo.name} 
              />
            ))}
          </div>
        </div>
        
        {/* Filter button (floating) */}
        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
          <SheetTrigger asChild>
            <button 
              className="fixed bottom-20 right-4 z-30 bg-[#8B5CF6] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-[#7C3AED] transition-colors"
            >
              <SlidersHorizontal size={20} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] sm:max-w-md">
            <div className="h-full flex flex-col">
              <div className="py-2 border-b">
                <h3 className="text-lg font-medium">Фильтры</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4">
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Категории</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {allTags.map(tag => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`filter-tag-${tag}`} 
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => toggleTag(tag)}
                        />
                        <label
                          htmlFor={`filter-tag-${tag}`}
                          className="text-sm cursor-pointer"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Цена</h4>
                  <div className="px-2">
                    <div className="flex justify-between mb-4">
                      <div>
                        <span className="text-sm text-gray-500">От</span>
                        <div className="font-medium">{priceRange[0]} ₸</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">До</span>
                        <div className="font-medium">{priceRange[1]} ₸</div>
                      </div>
                    </div>
                    
                    {/* Price range slider would go here */}
                    <div className="h-1 bg-gray-200 rounded-full relative my-4">
                      <div 
                        className="absolute h-full bg-[#8B5CF6] rounded-full" 
                        style={{ 
                          left: `${(priceRange[0] / 10000) * 100}%`, 
                          right: `${100 - (priceRange[1] / 10000) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Доставка</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free-delivery" />
                      <label htmlFor="free-delivery" className="text-sm cursor-pointer">
                        Бесплатная доставка
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="same-day" />
                      <label htmlFor="same-day" className="text-sm cursor-pointer">
                        Доставка сегодня
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Рейтинг</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`rating-${rating}`} 
                          checked={selectedRating === rating}
                          onCheckedChange={() => {
                            setSelectedRating(selectedRating === rating ? null : rating);
                          }}
                        />
                        <label htmlFor={`rating-${rating}`} className="flex items-center text-sm cursor-pointer">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                          ))}
                          {Array.from({ length: 5 - rating }).map((_, i) => (
                            <Star key={i} size={14} className="text-gray-300" />
                          ))}
                          <span className="ml-1">и выше</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="py-4 border-t flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedTags([]);
                    setPriceRange([0, 10000]);
                    setSelectedRating(null);
                  }}
                >
                  Сбросить
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => setIsFilterSheetOpen(false)}
                >
                  Применить
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </main>
    </div>
  );
};

export default FlowerShop;
