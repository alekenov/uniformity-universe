import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import CartHeader from '@/components/cart/CartHeader';
import StoreTabs from '@/components/cart/StoreTabs';
import CardMessage from '@/components/cart/CardMessage';
import EmptyCart from '@/components/cart/EmptyCart';
import SuggestionProducts from '@/components/cart/SuggestionProducts';
import { Store, Product } from '@/types/cart';
import { Button } from '@/components/ui/button';

// Sample store data
const initialStores: Store[] = [
  {
    id: '1',
    name: 'Цветочный Рай',
    status: 'Открыто',
    total: 33800,
    products: [
      {
        id: '1',
        name: 'Букет "Нежная весна" из розовых тюльпанов',
        description: '15 шт',
        price: 15900,
        oldPrice: 19900,
        quantity: 1,
        image: 'https://avatars.mds.yandex.net/get-eda/371306/2f0969b0bd0c397c78ec42a34c36a16a/orig',
      },
      {
        id: '2',
        name: 'Букет "Солнечный день" из желтых роз',
        description: '11 шт',
        price: 17900,
        oldPrice: 22400,
        quantity: 1,
        image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
      },
    ],
  },
  {
    id: '2',
    name: 'METRO',
    status: 'Открыто',
    total: 21700,
    products: [
      {
        id: 'm1',
        name: 'Сыр "Пармезан" выдержанный 24 месяца',
        description: 'Италия',
        price: 12900,
        oldPrice: 14500,
        quantity: 1,
        weight: '250 г',
        image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
      },
      {
        id: 'm2',
        name: 'Виноград красный "Кишмиш"',
        description: 'Узбекистан',
        price: 8800,
        quantity: 1,
        unit: 'кг',
        weight: '1 кг',
        image: 'https://avatars.mds.yandex.net/get-eda/371306/2f0969b0bd0c397c78ec42a34c36a16a/orig',
      },
    ],
  },
];

// Additional product suggestions
const suggestionProducts: Product[] = [
  {
    id: 'suggest1',
    name: 'Лимоны',
    description: 'Весовые',
    price: 570,
    quantity: 1,
    unit: 'кг',
    weight: '260 г',
    image: 'public/lovable-uploads/5ff5da7a-3a63-4f02-94e9-fc78fc9c43b4.png',
  },
  {
    id: 'suggest2',
    name: 'Голубика',
    description: '125 г',
    price: 3030,
    quantity: 1,
    weight: '125 г',
    image: 'public/lovable-uploads/5ff5da7a-3a63-4f02-94e9-fc78fc9c43b4.png',
  },
  {
    id: 'suggest3',
    name: 'Батон "Молодежный"',
    description: 'нарезка, 352г',
    price: 510,
    quantity: 1,
    weight: '352 г',
    image: 'public/lovable-uploads/5ff5da7a-3a63-4f02-94e9-fc78fc9c43b4.png',
  },
];

const Cart: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stores, setStores] = useState(initialStores);
  const [activeStoreId, setActiveStoreId] = useState(initialStores[0].id);
  const [showCardMessageInput, setShowCardMessageInput] = useState(false);
  const [cardMessage, setCardMessage] = useState('');
  
  const activeStore = stores.find(store => store.id === activeStoreId) || stores[0];
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    const updatedStores = stores.map(store => {
      if (store.id === activeStoreId) {
        if (quantity === 0) {
          const updatedProducts = store.products.filter(product => product.id !== productId);
          return { 
            ...store, 
            products: updatedProducts,
            total: updatedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0)
          };
        } else {
          const updatedProducts = store.products.map(product => 
            product.id === productId ? { ...product, quantity } : product
          );
          return { 
            ...store, 
            products: updatedProducts,
            total: updatedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0)
          };
        }
      }
      return store;
    });
    
    setStores(updatedStores);
    
    if (quantity === 0) {
      toast({
        title: "Товар удален из корзины",
        description: "Товар был удален из вашего заказа",
      });
    }
  };
  
  const clearActiveCart = () => {
    const updatedStores = stores.map(store => 
      store.id === activeStoreId ? { ...store, products: [], total: 0 } : store
    );
    setStores(updatedStores);
    toast({
      title: "Корзина очищена",
      description: "Все товары были удалены из корзины",
    });
  };
  
  const addSuggestionToCart = (product: Product) => {
    const updatedStores = stores.map(store => {
      if (store.id === activeStoreId) {
        const updatedProducts = [...store.products, {...product, id: `${product.id}-${Date.now()}`}];
        return { 
          ...store, 
          products: updatedProducts,
          total: updatedProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0)
        };
      }
      return store;
    });
    
    setStores(updatedStores);
    toast({
      title: "Товар добавлен",
      description: `${product.name} добавлен в корзину`,
    });
  };
  
  // Calculate order summary for active store
  const subtotal = activeStore.total;
  const deliveryFee = 0; // Free delivery
  const serviceFee = 990;
  const total = subtotal + deliveryFee + serviceFee;

  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <CartHeader 
          hasItems={activeStore.products.length > 0} 
          onClearCart={clearActiveCart} 
        />
        
        <StoreTabs 
          stores={stores} 
          activeStoreId={activeStoreId} 
          onStoreChange={setActiveStoreId} 
        />
      </header>
      
      <main className="container max-w-3xl mx-auto px-4 py-6 pb-24">
        {activeStore.products.length > 0 ? (
          <>
            <div className="panel mb-4">
              <div className="divide-y divide-[#F0F0F0]">
                {activeStore.products.map((product) => (
                  <CartItem
                    key={product.id}
                    {...product}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
              
              <CardMessage
                cardMessage={cardMessage}
                setCardMessage={setCardMessage}
                showCardMessageInput={showCardMessageInput}
                setShowCardMessageInput={setShowCardMessageInput}
              />
            </div>
            
            <SuggestionProducts 
              products={suggestionProducts}
              addToCart={addSuggestionToCart}
            />
            
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              serviceFee={serviceFee}
              total={total}
              onSubmit={handleCheckout}
              buttonText="Перейти к оформлению"
            />
          </>
        ) : (
          <EmptyCart />
        )}
      </main>
    </div>
  );
};

export default Cart;
