
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, MessageCircle, Share2, Tag, ShoppingBag, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

// This would normally come from an API, but for demo purposes, we'll use mock data
const product = {
  id: "featured-1",
  name: "Премиум букет 'Элегантность'",
  price: 4500,
  description: "Роскошный букет из свежих цветов, идеально подходит для особых случаев. Элегантное сочетание нежных оттенков создаст незабываемое впечатление.",
  composition: [
    "Розы: 5 шт",
    "Пионы: 3 шт",
    "Эустома: 4 шт",
    "Гипсофила",
    "Декоративная зелень"
  ],
  sizes: [
    { id: "small", name: "Маленький", price: 3500, description: "Диаметр ~25 см" },
    { id: "medium", name: "Средний", price: 4500, description: "Диаметр ~35 см" },
    { id: "large", name: "Большой", price: 6000, description: "Диаметр ~45 см" }
  ],
  rating: 4.9,
  reviewCount: 48,
  images: [
    "https://images.unsplash.com/photo-1596438459194-f275f413d6ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1561181286-d5c73134c97b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
  ],
  shopId: "flower-shop-1",
  shopName: "Цветочный Рай"
};

const reviews = [
  {
    id: 1,
    author: "Елена К.",
    date: "15 мая 2023",
    rating: 5,
    text: "Заказывала этот букет на юбилей мамы. Доставили вовремя, цветы свежие, очень красивая композиция. Мама была в восторге! Большое спасибо за качественный сервис.",
    helpful: 24
  },
  {
    id: 2,
    author: "Алексей П.",
    date: "3 апреля 2023",
    rating: 4,
    text: "Отличный букет, но хотелось бы больше вариантов по размеру.",
    helpful: 15
  },
  {
    id: 3,
    author: "Марина С.",
    date: "28 марта 2023",
    rating: 5,
    text: "Регулярно заказываю цветы в этом магазине. Этот букет просто восхитительный, долго стоит и не вянет. Отдельное спасибо флористам за творческий подход!",
    helpful: 32
  }
];

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState(product.sizes[1].id); // Medium as default
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const selectedSizeObj = product.sizes.find(size => size.id === selectedSize) || product.sizes[0];
  
  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} (${selectedSizeObj.name})`,
      price: selectedSizeObj.price,
      image: product.images[0],
      quantity: quantity,
      shopId: product.shopId,
      shopName: product.shopName
    });
    
    // Navigate to the cart page after adding the product
    navigate('/cart');
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/flower-shop" className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors">
              <Heart size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="container max-w-3xl mx-auto px-4 py-4 pb-20">
        {/* Image Gallery */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
          <div className="relative aspect-square">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image navigation dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/60'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
            
            {/* Image gallery button */}
            <button className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full">
              <ImageIcon size={18} />
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <h1 className="text-xl font-medium mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center gap-1 mr-4">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span>{product.rating}</span>
              <span className="text-gray-500">({product.reviewCount})</span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{product.description}</p>
          
          {/* Composition */}
          <div className="mb-4">
            <h3 className="font-medium mb-2 flex items-center gap-1.5">
              <Tag size={16} />
              Состав букета:
            </h3>
            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
              {product.composition.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Size Selection */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <h3 className="font-medium mb-3">Выберите размер:</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {product.sizes.map((size) => (
              <button
                key={size.id}
                className={cn(
                  "p-3 border rounded-xl text-center transition-all",
                  selectedSize === size.id 
                    ? "border-primary bg-primary/5" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setSelectedSize(size.id)}
              >
                <div className="font-medium">{size.name}</div>
                <div className="text-xs text-gray-500">{size.description}</div>
                <div className="mt-1 font-medium">{size.price} ₸</div>
              </button>
            ))}
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Количество:</span>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={decrementQuantity}
              >-</button>
              <span className="px-4 py-1.5">{quantity}</span>
              <button 
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={incrementQuantity}
              >+</button>
            </div>
          </div>
          
          {/* Total Price */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Итоговая стоимость:</span>
            <span className="font-medium text-lg">{selectedSizeObj.price * quantity} ₸</span>
          </div>
          
          <Button 
            className="w-full gap-2 py-6" 
            onClick={handleAddToCart}
          >
            <ShoppingBag size={18} />
            Добавить в корзину
          </Button>
        </div>
        
        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-lg flex items-center gap-1.5">
              <MessageCircle size={18} />
              Отзывы клиентов
            </h3>
            <Button variant="outline" size="sm">
              Все отзывы
            </Button>
          </div>
          
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 bg-[#F8F8F8] rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{review.author}</div>
                    <div className="text-xs text-gray-500">{review.date}</div>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star 
                        key={idx} 
                        size={14} 
                        className={idx < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{review.text}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <span>{review.helpful} пользователям помог этот отзыв</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
