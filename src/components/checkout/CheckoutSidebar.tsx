
import React from 'react';
import PaymentOptions from '@/components/PaymentOptions';
import OrderSummary from '@/components/OrderSummary';
import { useToast } from '@/hooks/use-toast';

interface CheckoutSidebarProps {
  paymentCards: { id: string; last4: string; type: 'visa' | 'mastercard' }[];
  selectedCard: string;
  onCardSelect: (id: string) => void;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  onSubmit: () => void;
}

const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({
  paymentCards,
  selectedCard,
  onCardSelect,
  subtotal,
  deliveryFee,
  serviceFee,
  total,
  onSubmit
}) => {
  const { toast } = useToast();
  
  return (
    <div className="w-full md:w-1/3 mt-6 md:mt-0">
      <div className="md:sticky md:top-24">
        <PaymentOptions
          cards={paymentCards}
          selectedCard={selectedCard}
          onCardSelect={onCardSelect}
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
          onSubmit={onSubmit}
          buttonText="Оформить заказ"
        />
      </div>
    </div>
  );
};

export default CheckoutSidebar;
