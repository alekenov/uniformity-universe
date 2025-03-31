import React, { useState } from 'react';
import { ArrowLeft, Trash2, ShoppingBag, MessageSquare, X, PenLine } from 'lucide-react';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import FlowerShopLink from '@/components/FlowerShopLink';

// Define store types
interface Store {
  id: string;
  name: string;
  status: string;
  total: number;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  unit?: string;
  image?: string;
  weight?: string;
}

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
  
  const handleAddCardMessage = () => {
    if (showCardMessageInput) {
      if (cardMessage.trim()) {
        toast({
          title: "Открытка добавлена",
          description: "Текст открытки сохранен",
        });
      }
      setShowCardMessageInput(false);
    } else {
      setShowCardMessageInput(true);
    }
  };
  
  const handleRemoveCardMessage = () => {
    setCardMessage('');
    setShowCardMessageInput(false);
    toast({
      title: "Открытка удалена",
      description: "Текст открытки был удален",
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
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center">
          <button 
            className="p-2 -ml-2 mr-2"
            onClick={() => navigate('/flower-shop')}
          >
            <ArrowLeft size={20} className="icon" />
          </button>
          <h1 className="text-2xl font-medium">Корзина</h1>
          {activeStore.products.length > 0 && (
            <button 
              className="ml-auto flex items-center text-gray-500 hover:text-red-500"
              onClick={clearActiveCart}
            >
              <Trash2 size={18} className="icon-sm mr-1" />
              <span className="text-sm">Очистить</span>
            </button>
          )}
        </div>
        
        {/* Store tabs */}
        <div className="px-4 overflow-x-auto pb-2 -mb-2">
          <div className="flex space-x-2">
            {stores.map(store => (
              <button
                key={store.id}
                onClick={() => setActiveStoreId(store.id)}
                className={`flex-shrink-0 py-2 px-4 rounded-full border text-sm whitespace-nowrap ${
                  activeStoreId === store.id 
                    ? 'border-[#8B5CF6] bg-[#F5F3FF]' 
                    : 'border-[#E0E0E0] bg-white'
                } active-scale`}
              >
                <div className="font-medium">{store.name}</div>
                <div className="flex items-center text-gray-500 text-xs">
                  {store.products.length > 0 ? `${store.total} ₸` : null}
                  {store.products.length > 0 && store.status ? ' · ' : null}
                  {store.status}
                </div>
              </button>
            ))}
          </div>
        </div>
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
              
              {showCardMessageInput ? (
                <div className="p-4 border-t border-[#F0F0F0]">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="cardMessage" className="block text-sm font-medium">
                      Текст открытки
                    </label>
                    <button 
                      onClick={handleRemoveCardMessage}
                      className="text-destructive hover:text-destructive/90 p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
                      aria-label="Удалить открытку"
                    >
                      <X size={16} className="icon-sm" />
                    </button>
                  </div>
                  <textarea
                    id="cardMessage"
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    placeholder="Введите текст для вашей открытки..."
                    className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
                    rows={3}
                    maxLength={200}
                  />
                  <div className="form-hint text-right">
                    {cardMessage.length}/200 символов
                  </div>
                </div>
              ) : cardMessage.trim() && (
                <div className="p-4 border-t border-[#F0F0F0]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Текст открытки</h3>
                    <div className="flex items-center">
                      <button 
                        onClick={() => setShowCardMessageInput(true)}
                        className="text-[#8B5CF6] hover:text-[#7C3AED] p-1.5 rounded-full hover:bg-[#F5F3FF] transition-colors mr-1"
                        aria-label="Редактировать открытку"
                      >
                        <PenLine size={16} className="icon-sm" />
                      </button>
                      <button 
                        onClick={handleRemoveCardMessage}
                        className="text-destructive hover:text-destructive/90 p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
                        aria-label="Удалить открытку"
                      >
                        <X size={16} className="icon-sm" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{cardMessage}</p>
                </div>
              )}
              
              {!cardMessage.trim() && !showCardMessageInput && (
                <button 
                  onClick={handleAddCardMessage}
                  className="w-full text-center py-3 text-[#8B5CF6] font-medium hover:bg-[#F5F3FF] border-t border-[#F0F0F0] flex items-center justify-center transition-colors active-scale"
                >
                  <MessageSquare size={18} className="icon mr-2" />
                  Добавить открытку
                </button>
              )}
              
              {showCardMessageInput && (
                <button 
                  onClick={handleAddCardMessage}
                  className="w-full text-center py-3 text-[#8B5CF6] font-medium hover:bg-[#F5F3FF] border-t border-[#F0F0F0] flex items-center justify-center transition-colors active-scale"
                >
                  <MessageSquare size={18} className="icon mr-2" />
                  Сохранить открытку
                </button>
              )}
            </div>
            
            {/* Suggestions section - moved up */}
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-3">Что-то ещё?</h2>
              <div className="grid grid-cols-3 gap-3">
                {suggestionProducts.map(product => (
                  <div key={product.id} className="panel p-0 overflow-hidden hover-shadow">
                    <div className="aspect-square bg-[#f9f9f9] flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <div className="font-medium text-sm">{product.price} ₸</div>
                      <div className="text-xs line-clamp-1">{product.name}</div>
                      <div className="text-xs text-gray-500 mb-1">{product.weight}</div>
                      <button 
                        onClick={() => addSuggestionToCart(product)}
                        className="w-full flex items-center justify-center py-1.5 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 text-xs active-scale"
                      >
                        <span className="text-lg">+</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              serviceFee={serviceFee}
              total={total}
              onSubmit={handleCheckout}
            />
            
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] border-t border-[#F0F0F0]">
              <div className="container max-w-3xl mx-auto">
                <button 
                  onClick={handleCheckout}
                  className="checkout-button bg-[#8B5CF6] hover:bg-[#7C3AED] active-scale"
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="panel text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F0F0F0] flex items-center justify-center">
              <ShoppingBag size={24} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Ва��а корзина пуста</h2>
            <p className="text-gray-500 mb-6">Добавьте товары для оформления заказа</p>
            <button className="checkout-button bg-[#8B5CF6] hover:bg-[#7C3AED] active-scale">
              Перейти в каталог
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
