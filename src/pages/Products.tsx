
import React, { useState } from 'react';
import { ArrowLeft, Grid2X2, List, ShoppingBag, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

// Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  category: string;
  tags?: string[];
}

// Sample products data
const products: Product[] = [
  {
    id: "p1",
    name: "Смартфон XYZ Pro 12, 256ГБ, черный",
    price: 349990,
    oldPrice: 399990,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 156,
    category: "Электроника",
    tags: ["Смартфоны", "Новинки"]
  },
  {
    id: "p2",
    name: "Наушники беспроводные Sound Master",
    price: 45990,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviewCount: 78,
    category: "Аксессуары",
    tags: ["Аудио", "Беспроводные"]
  },
  {
    id: "p3",
    name: "Планшет TabOne Ultra 10.5", 128ГБ",
    price: 189990,
    oldPrice: 229990,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviewCount: 42,
    category: "Электроника",
    tags: ["Планшеты", "Скидка"]
  },
  {
    id: "p4",
    name: "Умные часы FitTrack 3, черные",
    price: 79990,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 64,
    category: "Электроника",
    tags: ["Часы", "Фитнес"]
  },
  {
    id: "p5",
    name: "Фотокамера LightCapture X100, 24MP",
    price: 299990,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewCount: 36,
    category: "Электроника",
    tags: ["Фото", "Премиум"]
  },
  {
    id: "p6",
    name: "Портативная колонка SoundWave Mini",
    price: 29990,
    oldPrice: 35990,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    reviewCount: 28,
    category: "Аксессуары",
    tags: ["Аудио", "Скидка"]
  }
];

// Single column product card
const SingleColumnProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      shopId: "main-shop",
      shopName: "Основной магазин"
    });
  };
  
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  
  return (
    <div 
      className="bg-white border border-[#F0F0F0] rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow mb-4"
      onClick={handleClick}
    >
      <div className="flex">
        <div className="w-1/3 aspect-square overflow-hidden relative">
          <img 
            src={product.image} 
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
        </div>
        
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs text-gray-500 mb-1">{product.category}</div>
            <h4 className="font-medium text-base line-clamp-2 mb-2">{product.name}</h4>
            
            {product.rating && (
              <div className="flex items-center gap-1 mb-3">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm">{product.rating} <span className="text-gray-500">({product.reviewCount})</span></span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-lg">{product.price.toLocaleString()} ₸</div>
              {product.oldPrice && (
                <div className="text-sm text-gray-500 line-through">{product.oldPrice.toLocaleString()} ₸</div>
              )}
            </div>
            <button 
              className="w-10 h-10 bg-[#F8F8F8] rounded-full flex items-center justify-center hover:bg-[#F0F0F0] transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Two column product card
const TwoColumnProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      shopId: "main-shop",
      shopName: "Основной магазин"
    });
  };
  
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  
  return (
    <div 
      className="bg-white border border-[#F0F0F0] rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col"
      onClick={handleClick}
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
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
      </div>
      
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
          <h4 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h4>
          
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs">{product.rating} <span className="text-gray-500">({product.reviewCount})</span></span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div>
            <div className="font-medium">{product.price.toLocaleString()} ₸</div>
            {product.oldPrice && (
              <div className="text-xs text-gray-500 line-through">{product.oldPrice.toLocaleString()} ₸</div>
            )}
          </div>
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

const Products: React.FC = () => {
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('grid');
  
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-medium">Каталог товаров</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "w-9 h-9",
                viewMode === 'single' && "bg-secondary text-primary"
              )}
              onClick={() => setViewMode('single')}
            >
              <List size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "w-9 h-9",
                viewMode === 'grid' && "bg-secondary text-primary"
              )}
              onClick={() => setViewMode('grid')}
            >
              <Grid2X2 size={18} />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container max-w-3xl mx-auto px-4 py-6 pb-20">
        {/* Header with view toggle */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Все товары</h2>
            <div className="text-sm text-gray-500">{products.length} товаров</div>
          </div>
        </div>
        
        {/* Products list */}
        {viewMode === 'single' ? (
          <div className="space-y-4">
            {products.map(product => (
              <SingleColumnProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map(product => (
              <TwoColumnProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
