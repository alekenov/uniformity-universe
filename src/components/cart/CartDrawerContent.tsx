import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Clock, ShoppingBag, Truck, Store } from 'lucide-react';
import SuggestionProducts from '@/components/cart/SuggestionProducts';
import CardMessage from '@/components/cart/CardMessage';
import { Product } from '@/types/cart';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DrawerClose } from '@/components/ui/drawer';

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
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  
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
    // Drawer will be closed automatically by using DrawerClose
  };
  
  const subtotal = getCartTotal();
  const total = subtotal; // Removed the service fee
  
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
    <div className="relative h-full flex flex-col">
      <div className="px-4 flex-grow overflow-y-auto">
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
        
        {/* Delivery Method Selection */}
        <div className="mb-4">
          <RadioGroup 
            value={deliveryMethod}
            onValueChange={(value: 'delivery' | 'pickup') => setDeliveryMethod(value as 'delivery' | 'pickup')}
            className="flex space-x-2 bg-[#F8F8F8] p-1 rounded-lg"
          >
            <div className={`flex-1 rounded-md transition-colors ${deliveryMethod === 'delivery' ? 'bg-white shadow-sm' : ''}`}>
              <RadioGroupItem 
                value="delivery" 
                id="cart-delivery" 
                className="sr-only" 
              />
              <Label 
                htmlFor="cart-delivery" 
                className={`w-full p-2 flex items-center justify-center cursor-pointer text-sm ${deliveryMethod === 'delivery' ? 'font-medium' : 'text-gray-600'}`}
              >
                <Truck size={16} className="mr-1.5" />
                Доставка
              </Label>
            </div>
            
            <div className={`flex-1 rounded-md transition-colors ${deliveryMethod === 'pickup' ? 'bg-white shadow-sm' : ''}`}>
              <RadioGroupItem 
                value="pickup" 
                id="cart-pickup" 
                className="sr-only" 
              />
              <Label 
                htmlFor="cart-pickup" 
                className={`w-full p-2 flex items-center justify-center cursor-pointer text-sm ${deliveryMethod === 'pickup' ? 'font-medium' : 'text-gray-600'}`}
              >
                <Store size={16} className="mr-1.5" />
                Самовывоз
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Время доставки */}
        {deliveryMethod === 'delivery' ? (
          <div className="bg-green-50 p-3 rounded-md mb-4 flex items-center">
            <Clock size={18} className="text-green-600 mr-2" />
            <div>
              <p className="text-sm text-green-800 font-medium">Доставка через 40-60 минут</p>
              <p className="text-xs text-green-700">Ближайший слот доставки сегодня 12:00-14:00</p>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 p-3 rounded-md mb-4 flex items-center">
            <Store size={18} className="text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Самовывоз сегодня</p>
              <p className="text-xs text-blue-700">Заказ будет готов через 30-40 минут</p>
            </div>
          </div>
        )}
        
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
      
      {/* Simplified summary and checkout button */}
      <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] mt-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Итого</span>
          <span className="font-medium">{total} ₸</span>
        </div>
        <DrawerClose asChild>
          <Button
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED]"
            onClick={handleCheckout}
          >
            Оформить заказ
          </Button>
        </DrawerClose>
      </div>
    </div>
  );
};

export default CartDrawerContent;
