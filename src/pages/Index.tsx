
import React, { useState } from 'react';
import DeliveryOptions, { DeliveryType, DeliveryTime } from '@/components/DeliveryOptions';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import OrderItemsSection from '@/components/checkout/OrderItemsSection';
import EmptyCheckout from '@/components/checkout/EmptyCheckout';
import CheckoutSidebar from '@/components/checkout/CheckoutSidebar';
import RegionCitySelector from '@/components/address/RegionCitySelector';

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
  const isMobile = useIsMobile();
  const [products, setProducts] = useState(initialProducts);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('other');
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>('today');
  const [paymentMethod, setPaymentMethod] = useState('card1');
  const [cardMessage, setCardMessage] = useState('');
  const [showCardMessageInput, setShowCardMessageInput] = useState(false);
  
  // State for city selection
  const [selectedRegion, setSelectedRegion] = useState('Казахстан');
  const [selectedCity, setSelectedCity] = useState('Нур-Султан');
  
  const [address, setAddress] = useState({
    street: 'улица Достоевского, 3с2',
    city: selectedCity,
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
  
  const clearCart = () => {
    setProducts([]);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setAddress(prev => ({ ...prev, city }));
    toast({
      title: "Город изменен",
      description: "Обратите внимание, что ассортимент и цены могут отличаться в разных городах",
    });
  };
  
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const deliveryFee = 0;
  const serviceFee = 990;
  const total = subtotal + deliveryFee + serviceFee;
  
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <CheckoutHeader 
        hasProducts={products.length > 0} 
        clearCart={clearCart} 
      />
      
      <main className="container max-w-6xl mx-auto px-4 py-6 pb-24">
        {products.length > 0 ? (
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Левая колонка с информацией о доставке */}
            <div className="w-full md:w-2/3">
              {/* Блок "Ваш заказ" только для десктопной версии */}
              {!isMobile && (
                <OrderItemsSection
                  products={products}
                  onQuantityChange={handleQuantityChange}
                  cardMessage={cardMessage}
                  setCardMessage={setCardMessage}
                  showCardMessageInput={showCardMessageInput}
                  setShowCardMessageInput={setShowCardMessageInput}
                />
              )}
              
              {/* Блок "Доставка" с селектором города */}
              <div className="panel">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Доставка</h2>
                  <RegionCitySelector
                    selectedRegion={selectedRegion}
                    selectedCity={selectedCity}
                    onCityChange={handleCityChange}
                    compact={true}
                  />
                </div>
                <DeliveryOptions
                  selectedType={deliveryType}
                  selectedTime={deliveryTime}
                  onTypeChange={setDeliveryType}
                  onTimeChange={setDeliveryTime}
                  // Добавляем новые пропсы для мобильной версии
                  products={isMobile ? products : []}
                  onQuantityChange={handleQuantityChange}
                  cardMessage={cardMessage}
                  setCardMessage={setCardMessage}
                  showCardMessageInput={showCardMessageInput}
                  setShowCardMessageInput={setShowCardMessageInput}
                />
              </div>
            </div>
            
            {/* Правая колонка с оплатой и итогами */}
            <CheckoutSidebar
              paymentCards={paymentCards}
              selectedCard={paymentMethod}
              onCardSelect={setPaymentMethod}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              serviceFee={serviceFee}
              total={total}
              onSubmit={handleSubmit}
            />
          </div>
        ) : (
          <EmptyCheckout />
        )}
      </main>
    </div>
  );
};

export default Index;
