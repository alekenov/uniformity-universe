
import React from 'react';
import { Product, Store } from '@/types/cart';
import { Tabs } from "@/components/ui/tabs";
import OrderItemsSection from '@/components/checkout/OrderItemsSection';
import CheckoutSidebar from '@/components/checkout/CheckoutSidebar';
import StoreAddressManager from '@/components/checkout/StoreAddressManager';
import EmptyCheckout from '@/components/checkout/EmptyCheckout';

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

interface CheckoutLayoutProps {
  products: Product[];
  stores: Store[];
  activeStoreId: string;
  activeStore: Store | undefined;
  activeAddress: StoreAddressState;
  deliveryType: string;
  deliveryTime: string;
  paymentMethod: string;
  cardMessage: string;
  showCardMessageInput: boolean;
  customerPhone: string;
  selectedRegion: string;
  selectedCity: string;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  onStoreChange: (storeId: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onDeliveryTypeChange: (type: any) => void;
  onDeliveryTimeChange: (time: any) => void;
  onPaymentMethodChange: (method: string) => void;
  onCardMessageChange: (message: string) => void;
  setShowCardMessageInput: (show: boolean) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onCityChange: (city: string) => void;
  handleAddressChange: (storeId: string, field: keyof StoreAddressState, value: string | boolean) => void;
  toggleCourierComment: (storeId: string) => void;
  onSubmit: () => void;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  products,
  stores,
  activeStoreId,
  activeStore,
  activeAddress,
  deliveryType,
  deliveryTime,
  paymentMethod,
  cardMessage,
  showCardMessageInput,
  customerPhone,
  selectedRegion,
  selectedCity,
  subtotal,
  deliveryFee,
  serviceFee,
  total,
  onStoreChange,
  onQuantityChange,
  onDeliveryTypeChange,
  onDeliveryTimeChange,
  onPaymentMethodChange,
  onCardMessageChange,
  setShowCardMessageInput,
  onCustomerPhoneChange,
  onCityChange,
  handleAddressChange,
  toggleCourierComment,
  onSubmit,
}) => {
  if (products.length === 0) {
    return <EmptyCheckout />;
  }

  return (
    <div className="flex flex-col md:flex-row md:space-x-6">
      <div className="w-full md:w-2/3">
        <Tabs value={activeStoreId} onValueChange={onStoreChange}>
          <OrderItemsSection
            stores={stores}
            activeStoreId={activeStoreId}
            onStoreChange={onStoreChange}
            onQuantityChange={onQuantityChange}
            cardMessage={cardMessage}
            setCardMessage={onCardMessageChange}
            showCardMessageInput={showCardMessageInput}
            setShowCardMessageInput={setShowCardMessageInput}
          />
          
          {activeStore && (
            <StoreAddressManager
              activeStore={activeStore}
              activeStoreId={activeStoreId}
              activeAddress={activeAddress}
              deliveryType={deliveryType as any}
              deliveryTime={deliveryTime as any}
              selectedRegion={selectedRegion}
              selectedCity={selectedCity}
              onCityChange={onCityChange}
              onDeliveryTypeChange={onDeliveryTypeChange}
              onDeliveryTimeChange={onDeliveryTimeChange}
              handleAddressChange={handleAddressChange}
              toggleCourierComment={toggleCourierComment}
            />
          )}
        </Tabs>
      </div>
      
      <CheckoutSidebar
        paymentCards={[
          { id: 'card1', type: 'kaspi' },
          { id: 'card2', type: 'visa' },
          { id: 'card3', type: 'paypal' },
          { id: 'card4', type: 'money' },
        ]}
        selectedCard={paymentMethod}
        onCardSelect={onPaymentMethodChange}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        serviceFee={serviceFee}
        total={total}
        onSubmit={onSubmit}
        customerPhone={customerPhone}
        onCustomerPhoneChange={onCustomerPhoneChange}
      />
    </div>
  );
};

export default CheckoutLayout;
