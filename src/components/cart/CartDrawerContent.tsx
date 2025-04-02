
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Clock, ShoppingBag } from 'lucide-react';
import SuggestionProducts from '@/components/cart/SuggestionProducts';
import CardMessage from '@/components/cart/CardMessage';
import { Product } from '@/types/cart';

// Примерные данные для рекомендуемых товаров
const suggestionProducts = [
  {
    id: 'suggest1',
    name: 'Ирисы синие',
    description: '5 шт',
    price: 5700,
    quantity: 1,
    image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
  },
  {
    id: 'suggest2',
    name: 'Тюльпаны розовые',
    description: '7 шт',
    price: 6400,
    quantity: 1,
    image: 'https://avatars.mds.yandex.net/get-eda/371306/2f0969b0bd0c397c78ec42a34c36a16a/orig',
  },
  {
    id: 'suggest3',
    name: 'Гипсофила',
    description: 'букет',
    price: 3900,
    quantity: 1,
    image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
  },
];

const CartDrawerContent: React.FC = () => {
  const { cartItems, updateQuantity, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCardMessageInput, setShowCardMessageInput] = useState(false);
  const [cardMessage, setCardMessage] = useState('');
  
  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };
  
  const addSuggestionToCart = (product: Product) => {
    // Здесь будет логика добавления рекомендуемого товара в корзину
    toast({
      title: "Товар добавлен",
      description: `${product.name} добавлен в корзину`,
    });
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const subtotal = getCartTotal();
  const deliveryFee = 0; // Бесплатная доставка
  const serviceFee = 990;
  const total = subtotal + deliveryFee + serviceFee;
  
  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F0F0F0] flex items-center justify-center">
          <ShoppingBag size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">Ваша корзина пуста</h3>
        <p className="text-gray-500 mb-4">Добавьте товары для оформления заказа</p>
        <Button 
          onClick={() => navigate('/flower-shop')}
          className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
        >
          Перейти в каталог
        </Button>
      </div>
    );
  }
  
  return (
    <div className="relative h-full">
      <div className="px-4">
        {/* Заголовок */}
        <div className="flex items-center justify-between py-4 sticky top-0 bg-background z-10">
          <h3 className="text-lg font-medium">Ваша корзина</h3>
          <button 
            className="text-sm text-gray-500 hover:text-red-500 flex items-center"
            onClick={clearCart}
          >
            Очистить
          </button>
        </div>
        
        {/* Время доставки */}
        <div className="bg-green-50 p-3 rounded-md mb-4 flex items-center">
          <Clock size={18} className="text-green-600 mr-2" />
          <div>
            <p className="text-sm text-green-800 font-medium">Доставка через 40-60 минут</p>
            <p className="text-xs text-green-700">Ближайший слот доставки сегодня 12:00-14:00</p>
          </div>
        </div>
        
        {/* Товары в корзине */}
        <div className="mb-4 rounded-md border border-gray-100 overflow-hidden">
          <div className="divide-y divide-[#F0F0F0]">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        </div>
        
        {/* Текст открытки */}
        <div className="mb-4">
          <CardMessage
            cardMessage={cardMessage}
            setCardMessage={setCardMessage}
            showCardMessageInput={showCardMessageInput}
            setShowCardMessageInput={setShowCardMessageInput}
          />
        </div>
        
        {/* Рекомендуемые товары */}
        <SuggestionProducts 
          products={suggestionProducts} 
          addToCart={addSuggestionToCart} 
        />
      </div>
      
      {/* Итоги и кнопка заказа */}
      <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] mt-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Товары</span>
            <span>{subtotal} ₸</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Доставка</span>
            <span className="text-green-600">Бесплатно</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Сервисный сбор</span>
            <span>{serviceFee} ₸</span>
          </div>
          <div className="flex justify-between font-medium text-base pt-2 border-t border-gray-100 mt-1">
            <span>Итого</span>
            <span>{total} ₸</span>
          </div>
          <Button
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] mt-2"
            onClick={handleCheckout}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawerContent;
