
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/cart';
import { useNavigate } from 'react-router-dom';
import EmptyCartDrawer from './EmptyCartDrawer';
import DeliveryMethodSelector from './DeliveryMethodSelector';
import DeliveryTimeInfo from './DeliveryTimeInfo';
import CartItemsList from './CartItemsList';
import CartSummary from './CartSummary';
import CardMessage from './CardMessage';
import SuggestionProducts from './SuggestionProducts';

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
  const { cartItems, updateQuantity, clearCart, getCartTotal, addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCardMessageInput, setShowCardMessageInput] = useState(false);
  const [cardMessage, setCardMessage] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  
  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };
  
  const addSuggestionToCart = (product: Product) => {
    // Convert the suggestion product to CartProduct format
    const cartProduct = {
      id: `${product.id}-${Date.now()}`, // Ensure unique ID
      name: product.name,
      price: product.price,
      image: product.image || '',
      quantity: product.quantity || 1,
      shopId: 'default-shop',
      shopName: 'Магазин'
    };
    
    // Add to cart using the context function
    addToCart(cartProduct);
    
    toast({
      title: "Товар добавлен",
      description: `${product.name} добавлен в корзину`,
    });
  };
  
  const subtotal = getCartTotal();
  const total = subtotal; // Removed the service fee
  
  if (cartItems.length === 0) {
    return <EmptyCartDrawer />;
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
        <DeliveryMethodSelector 
          deliveryMethod={deliveryMethod} 
          setDeliveryMethod={setDeliveryMethod} 
        />
        
        {/* Время доставки */}
        <DeliveryTimeInfo deliveryMethod={deliveryMethod} />
        
        {/* Товары в корзине */}
        <CartItemsList 
          cartItems={cartItems} 
          onQuantityChange={handleQuantityChange} 
        />
        
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
      
      {/* Summary and checkout button */}
      <CartSummary total={total} />
    </div>
  );
};

export default CartDrawerContent;
