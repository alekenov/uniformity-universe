
import React, { useState } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import CartItem from '@/components/CartItem';
import DeliveryOptions, { DeliveryType, DeliveryTime } from '@/components/DeliveryOptions';
import AddressPanel from '@/components/AddressPanel';
import PaymentOptions, { PaymentMethod } from '@/components/PaymentOptions';
import OrderSummary from '@/components/OrderSummary';
import { useToast } from '@/hooks/use-toast';

// Sample product data
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

// Sample payment cards
const paymentCards = [
  { id: 'card1', last4: '3375', type: 'visa' as const },
  { id: 'card2', last4: '2037', type: 'visa' as const },
  { id: 'card3', last4: '8001', type: 'visa' as const },
];

const Index: React.FC = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('standard');
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>('today');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card1');
  
  const [address, setAddress] = useState({
    street: 'улица Достоевского, 3с2',
    city: 'Москва',
    entrance: '',
    apartment: '12',
    floor: '',
    intercom: '',
  });
  
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
  
  const handleAddressChange = (field: keyof typeof address, value: string) => {
    setAddress({ ...address, [field]: value });
  };
  
  const handleSubmit = () => {
    toast({
      title: "Заказ оформлен",
      description: "Ваш заказ успешно оформлен и скоро будет доставлен",
    });
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
          <h1 className="text-2xl font-medium">Оформление заказа</h1>
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
              <div className="mb-2">
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
            
            <DeliveryOptions
              selectedType={deliveryType}
              selectedTime={deliveryTime}
              onTypeChange={setDeliveryType}
              onTimeChange={setDeliveryTime}
            />
            
            <AddressPanel
              address={address}
              onChange={handleAddressChange}
              onEdit={() => {
                toast({
                  title: "Редактирование адреса",
                  description: "Здесь будет форма редактирования адреса",
                });
              }}
            />
            
            <PaymentOptions
              cards={paymentCards}
              selectedCard={paymentMethod}
              onCardSelect={setPaymentMethod}
              onAddPromocode={() => {
                toast({
                  title: "Промокод",
                  description: "Здесь будет форма добавления промокода",
                });
              }}
            />
            
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              serviceFee={serviceFee}
              total={total}
              onSubmit={handleSubmit}
            />
          </>
        ) : (
          <div className="panel text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F0F0F0] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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

export default Index;
