import React, { useState } from 'react';
import { ArrowLeft, Trash2, ShoppingBag, ChevronRight } from 'lucide-react';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

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
    status: 'Закрыто',
    total: 0,
    products: [],
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
  const [stores, setStores] = useState(initialStores);
  const [activeStoreId, setActiveStoreId] = useState(initialStores[0].id);
  
  const activeStore = stores.find(store => store.id === activeStoreId) || stores[0];
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    const updatedStores = stores.map(store => {
      if (store.id === activeStoreId) {
        if (quantity === 0) {
          // Remove the product if quantity is 0
          const updatedProducts = store.products.filter(product => product.id !== productId);
          return { 
            ...store, 
            products: updatedProducts,
            total: updatedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0)
          };
        } else {
          // Update the quantity
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
  
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center">
          <button className="p-2 -ml-2 mr-2">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-medium">Корзина</h1>
          {activeStore.products.length > 0 && (
            <button 
              className="ml-auto flex items-center text-gray-500 hover:text-red-500"
              onClick={clearActiveCart}
            >
              <Trash2 size={18} className="mr-1" />
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
                    ? 'border-[#222] bg-[#fff]' 
                    : 'border-[#E0E0E0] bg-white'
                }`}
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
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="divide-y divide-[#F0F0F0]">
                {activeStore.products.map((product) => (
                  <CartItem
                    key={product.id}
                    {...product}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
              
              <button className="w-full text-center py-3 text-[#4BA3E3] font-medium hover:underline border-t border-[#F0F0F0]">
                Перейти в магазин
              </button>
            </div>
            
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              serviceFee={serviceFee}
              total={total}
              onSubmit={() => {
                // Navigate to checkout page
                window.location.href = '/';
              }}
            />
            
            {/* Suggestions section - more compact now */}
            <div className="mt-5">
              <h2 className="text-lg font-medium mb-3">Что-то ещё?</h2>
              <div className="grid grid-cols-3 gap-3">
                {suggestionProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
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
                        className="w-full flex items-center justify-center py-1.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                      >
                        <span className="text-lg">+</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
              <div className="container max-w-3xl mx-auto">
                <Link 
                  to="/"
                  className="bg-[#FF6633] text-white font-medium py-3 px-6 rounded-xl w-full flex items-center justify-center"
                >
                  Оформить заказ
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F0F0F0] flex items-center justify-center">
              <ShoppingBag size={24} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Ваша корзина пуста</h2>
            <p className="text-gray-500 mb-6">Добавьте товары для оформления заказа</p>
            <button className="bg-[#FF6633] text-white font-medium py-3 px-6 rounded-xl hover:bg-[#FF6633]/90 transition-colors">
              Перейти в каталог
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
