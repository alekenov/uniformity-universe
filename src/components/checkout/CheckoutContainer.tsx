
import React, { useState, useEffect } from 'react';
import DeliveryOptions, { DeliveryType, DeliveryTime } from '@/components/DeliveryOptions';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import OrderItemsSection from '@/components/checkout/OrderItemsSection';
import EmptyCheckout from '@/components/checkout/EmptyCheckout';
import CheckoutSidebar from '@/components/checkout/CheckoutSidebar';
import RegionCitySelector from '@/components/address/RegionCitySelector';
import DeliveryAddress from '@/components/delivery/DeliveryAddress';
import { Product, Store } from '@/types/cart';
import { Tabs } from "@/components/ui/tabs";

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

interface StoreAddressState {
  street: string;
  city: string;
  entrance: string;
  apartment: string;
  floor: string;
  intercom: string;
  courierComment: string;
  askRecipientForAddress: boolean;
  showCourierComment: boolean;
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
  const [selectedCity, setSelectedCity] = useState(initialCity);
  
  // State for delivery addresses (one for each store)
  const [storeAddresses, setStoreAddresses] = useState<Record<string, StoreAddressState>>({});

  // Initialize store addresses
  useEffect(() => {
    const newStoreAddresses: Record<string, StoreAddressState> = { ...storeAddresses };
    
    stores.forEach(store => {
      if (!newStoreAddresses[store.id]) {
        newStoreAddresses[store.id] = {
          street: store.address?.street || '',
          city: store.address?.city || selectedCity,
          entrance: store.address?.entrance || '',
          apartment: store.address?.apartment || '',
          floor: store.address?.floor || '',
          intercom: store.address?.intercom || '',
          courierComment: '',
          askRecipientForAddress: false,
          showCourierComment: false,
        };
      }
    });
    
    setStoreAddresses(newStoreAddresses);
  }, [stores, selectedCity]);

  const paymentCards = [
    { id: 'card1', type: 'kaspi' as const },
    { id: 'card2', type: 'visa' as const },
    { id: 'card3', type: 'paypal' as const },
    { id: 'card4', type: 'money' as const },
  ];
  
  const handleAddressChange = (storeId: string, field: keyof StoreAddressState, value: string | boolean) => {
    setStoreAddresses(prev => {
      const updatedStore = { ...prev[storeId] };
      
      // Type assertion to handle both string and boolean values
      if (typeof value === 'boolean') {
        (updatedStore[field] as boolean) = value;
      } else {
        (updatedStore[field] as string) = value;
      }
      
      return {
        ...prev,
        [storeId]: updatedStore
      };
    });
    
    // Update store address in parent component
    if (['street', 'city', 'entrance', 'apartment', 'floor', 'intercom'].includes(field)) {
      const storeAddress = storeAddresses[storeId];
      
      onUpdateStoreAddress(storeId, {
        street: field === 'street' ? value as string : storeAddress.street,
        city: field === 'city' ? value as string : storeAddress.city,
        entrance: field === 'entrance' ? value as string : storeAddress.entrance,
        apartment: field === 'apartment' ? value as string : storeAddress.apartment,
        floor: field === 'floor' ? value as string : storeAddress.floor,
        intercom: field === 'intercom' ? value as string : storeAddress.intercom
      });
    }
  };
  
  const toggleCourierComment = (storeId: string) => {
    setStoreAddresses(prev => ({
      ...prev,
      [storeId]: {
        ...prev[storeId],
        showCourierComment: !prev[storeId].showCourierComment
      }
    }));
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
    
    // Update city for all store addresses
    Object.keys(storeAddresses).forEach(storeId => {
      handleAddressChange(storeId, 'city', city);
    });
    
    toast({
      title: "Город изменен",
      description: "Обратите внимание, что ассортимент и цены могут отличаться в разных городах",
    });
  };
  
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const deliveryFee = 0;
  const serviceFee = 990;
  const total = subtotal + deliveryFee + serviceFee;
  
  const activeStore = stores.find(store => store.id === activeStoreId);
  const activeAddress = storeAddresses[activeStoreId] || {
    street: '',
    city: selectedCity,
    entrance: '',
    apartment: '',
    floor: '',
    intercom: '',
    courierComment: '',
    askRecipientForAddress: false,
    showCourierComment: false,
  };
  
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <CheckoutHeader 
        hasProducts={products.length > 0} 
        clearCart={clearCart} 
      />
      
      <main className="container max-w-6xl mx-auto px-4 py-6 pb-24">
        {products.length > 0 ? (
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="w-full md:w-2/3">
              <Tabs value={activeStoreId} onValueChange={onStoreChange}>
                <OrderItemsSection
                  stores={stores}
                  activeStoreId={activeStoreId}
                  onStoreChange={onStoreChange}
                  onQuantityChange={onQuantityChange}
                  cardMessage={cardMessage}
                  setCardMessage={setCardMessage}
                  showCardMessageInput={showCardMessageInput}
                  setShowCardMessageInput={setShowCardMessageInput}
                />
                
                {activeStore && (
                  <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-medium">Доставка для {activeStore.name}</h2>
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
                    />
                    
                    <div className="mt-6">
                      <DeliveryAddress
                        address={activeAddress.street}
                        setAddress={(value) => handleAddressChange(activeStoreId, 'street', value)}
                        apartment={activeAddress.apartment}
                        setApartment={(value) => handleAddressChange(activeStoreId, 'apartment', value)}
                        floor={activeAddress.floor}
                        setFloor={(value) => handleAddressChange(activeStoreId, 'floor', value)}
                        courierComment={activeAddress.courierComment}
                        setCourierComment={(value) => handleAddressChange(activeStoreId, 'courierComment', value)}
                        askRecipientForAddress={activeAddress.askRecipientForAddress}
                        setAskRecipientForAddress={(value) => handleAddressChange(activeStoreId, 'askRecipientForAddress', value)}
                        showCourierComment={activeAddress.showCourierComment}
                        toggleCourierComment={() => toggleCourierComment(activeStoreId)}
                      />
                    </div>
                  </div>
                )}
              </Tabs>
            </div>
            
            <CheckoutSidebar
              paymentCards={paymentCards}
              selectedCard={paymentMethod}
              onCardSelect={setPaymentMethod}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              serviceFee={serviceFee}
              total={total}
              onSubmit={handleSubmit}
              customerPhone={customerPhone}
              onCustomerPhoneChange={setCustomerPhone}
            />
          </div>
        ) : (
          <EmptyCheckout />
        )}
      </main>
    </div>
  );
};

export default CheckoutContainer;
