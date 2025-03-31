
import React, { useState } from 'react';
import { ArrowLeft, Trash2, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartItem from '@/components/CartItem';
import DeliveryOptions, { DeliveryType, DeliveryTime } from '@/components/DeliveryOptions';
import PaymentOptions from '@/components/PaymentOptions';
import OrderSummary from '@/components/OrderSummary';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const initialProducts = [
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
];

const paymentCards = [
  { id: 'card1', last4: '3375', type: 'visa' as const },
  { id: 'card2', last4: '2037', type: 'visa' as const },
  { id: 'card3', last4: '8001', type: 'visa' as const },
];

const Index: React.FC = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('other');
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>('today');
  const [paymentMethod, setPaymentMethod] = useState('card1');
  
  const [address, setAddress] = useState({
    street: 'улица Достоевского, 3с2',
    city: 'Алматы',
    entrance: '',
    apartment: '12',
    floor: '',
    intercom: '',
  });
  
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity === 0) {
      setProducts(products.filter(product => product.id !== id));
      toast({
        title: "Товар удален из корзины",
        description: "Товар был удален из вашего заказа",
      });
    } else {
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
  
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const deliveryFee = 0;
  const serviceFee = 990;
  const total = subtotal + deliveryFee + serviceFee;
  
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center">
          <Link to="/cart" className="p-2 -ml-2 mr-2">
            <ArrowLeft size={20} />
          </Link>
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
            <DeliveryOptions
              selectedType={deliveryType}
              selectedTime={deliveryTime}
              onTypeChange={setDeliveryType}
              onTimeChange={setDeliveryTime}
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
              buttonText="Оформить заказ"
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

      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] border-t border-[#F0F0F0] md:hidden">
          <div className="container max-w-3xl mx-auto">
            <Button 
              onClick={handleSubmit}
              className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] active-scale flex items-center justify-center gap-2"
            >
              <span>Оформить заказ</span>
              <PackageCheck size={18} className="ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
