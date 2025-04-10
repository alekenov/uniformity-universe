
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutLayout from '@/components/checkout/CheckoutLayout';
import { Product, Store } from '@/types/cart';
import { useStoreAddresses } from './useStoreAddresses';
import { DeliveryType, DeliveryTime } from '@/components/DeliveryOptions';

interface CheckoutContainerProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  stores: Store[];
  activeStoreId: string;
  onStoreChange: (storeId: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onUpdateStoreAddress: (storeId: string, address: Store['address']) => void;
  initialRegion?: string;
  initialCity?: string;
}

const CheckoutContainer: React.FC<CheckoutContainerProps> = ({
  products,
  setProducts,
  stores,
  activeStoreId,
  onStoreChange,
  onQuantityChange,
  onUpdateStoreAddress,
  initialRegion = 'Казахстан',
  initialCity = 'Нур-Султан',
}) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('other');
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>('today');
  const [paymentMethod, setPaymentMethod] = useState('card1');
  const [cardMessage, setCardMessage] = useState('');
  const [showCardMessageInput, setShowCardMessageInput] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  
  // Use our custom hook for address management
  const {
    selectedCity,
    handleAddressChange,
    toggleCourierComment,
    handleCityChange,
    getActiveAddress
  } = useStoreAddresses({
    stores,
    activeStoreId,
    initialCity,
    onUpdateStoreAddress
  });
  
  const handleSubmit = () => {
    toast({
      title: "Заказ оформлен",
      description: "Ваш заказ успешно оформлен и скоро будет доставлен",
    });
  };
  
  const clearCart = () => {
    setProducts([]);
  };
  
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const deliveryFee = 0;
  const serviceFee = 990;
  const total = subtotal + deliveryFee + serviceFee;
  
  const activeStore = stores.find(store => store.id === activeStoreId);
  const activeAddress = getActiveAddress();
  
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <CheckoutHeader 
        hasProducts={products.length > 0} 
        clearCart={clearCart} 
      />
      
      <main className="container max-w-6xl mx-auto px-4 py-6 pb-24">
        <CheckoutLayout
          products={products}
          stores={stores}
          activeStoreId={activeStoreId}
          activeStore={activeStore}
          activeAddress={activeAddress}
          deliveryType={deliveryType}
          deliveryTime={deliveryTime}
          paymentMethod={paymentMethod}
          cardMessage={cardMessage}
          showCardMessageInput={showCardMessageInput}
          customerPhone={customerPhone}
          selectedRegion={selectedRegion}
          selectedCity={selectedCity}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          serviceFee={serviceFee}
          total={total}
          onStoreChange={onStoreChange}
          onQuantityChange={onQuantityChange}
          onDeliveryTypeChange={setDeliveryType}
          onDeliveryTimeChange={setDeliveryTime}
          onPaymentMethodChange={setPaymentMethod}
          onCardMessageChange={setCardMessage}
          setShowCardMessageInput={setShowCardMessageInput}
          onCustomerPhoneChange={setCustomerPhone}
          onCityChange={handleCityChange}
          handleAddressChange={handleAddressChange}
          toggleCourierComment={toggleCourierComment}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default CheckoutContainer;
