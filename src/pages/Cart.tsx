
import React, { useState } from 'react';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// Sample product data - same as used in Index.tsx
const initialProducts = [
  {
    id: '1',
    name: 'Соус для обжаривания лапши Sen Soy Premium Wok',
    description: '310 г',
    price: 159,
    oldPrice: 199,
    quantity: 1,
    image: 'https://avatars.mds.yandex.net/get-eda/371306/2f0969b0bd0c397c78ec42a34c36a16a/orig',
  },
  {
    id: '2',
    name: 'Зубная щетка Splat Special Blackwood Medium средней жесткости',
    description: '1 шт',
    price: 179,
    oldPrice: 224,
    quantity: 1,
    image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
  },
];

const Cart: React.FC = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity === 0) {
      // Remove the product if quantity is 0
      setProducts(products.filter(product => product.id !== id));
      toast({
        title: "Товар удален из корзины",
        description: "Товар был удален из вашего заказа",
      });
    } else {
      // Update the quantity
      setProducts(products.map(product => 
        product.id === id ? { ...product, quantity } : product
      ));
    }
  };
  
  // Calculate order summary
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const deliveryFee = 0; // Free delivery
  const serviceFee = 99;
  const total = subtotal + deliveryFee + serviceFee;
  
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center">
          <button className="p-2 -ml-2 mr-2">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-medium">Корзина</h1>
          {products.length > 0 && (
            <button 
              className="ml-auto flex items-center text-gray-500 hover:text-red-500"
              onClick={() => {
                setProducts([]);
                toast({
                  title: "Корзина очищена",
                  description: "Все товары были удалены из корзины",
                });
              }}
            >
              <Trash2 size={18} className="mr-1" />
              <span className="text-sm">Очистить</span>
            </button>
          )}
        </div>
      </header>
      
      <main className="container max-w-3xl mx-auto px-4 py-6 pb-24">
        {products.length > 0 ? (
          <>
            <div className="panel mb-4">
              <div className="mb-4">
                {products.map((product) => (
                  <CartItem
                    key={product.id}
                    {...product}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
              
              <button className="w-full text-center py-3 text-[#4BA3E3] font-medium hover:underline">
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
            
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
              <div className="container max-w-3xl mx-auto">
                <Link 
                  to="/"
                  className="checkout-button flex items-center justify-center"
                >
                  Оформить заказ
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="panel text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F0F0F0] flex items-center justify-center">
              <ShoppingBag size={24} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Ваша корзина пуста</h2>
            <p className="text-gray-500 mb-6">Добавьте товары для оформления заказа</p>
            <button className="bg-primary text-white font-medium py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors">
              Перейти в каталог
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
