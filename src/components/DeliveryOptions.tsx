
import React, { useState, useEffect } from 'react';
import DeliveryTypeSelector from './delivery/DeliveryTypeSelector';
import DeliveryTimeSelector from './delivery/DeliveryTimeSelector';
import DeliveryTimeSlots from './delivery/DeliveryTimeSlots';
import GiftingFlow from './delivery/GiftingFlow';
import SelfDeliveryFlow from './delivery/SelfDeliveryFlow';
import { useIsMobile } from '@/hooks/use-mobile';
import CartItem from '@/components/CartItem';
import CardMessage from '@/components/cart/CardMessage';
import { Product } from '@/types/cart';

export type DeliveryType = 'other' | 'self' | 'pickup';
export type DeliveryTime = 'today' | 'tomorrow';

interface DeliveryOptionsProps {
  selectedType: DeliveryType;
  selectedTime: DeliveryTime;
  onTypeChange: (type: DeliveryType) => void;
  onTimeChange: (time: DeliveryTime) => void;
  products?: Product[];
  onQuantityChange?: (id: string, quantity: number) => void;
  cardMessage?: string;
  setCardMessage?: (message: string) => void;
  showCardMessageInput?: boolean;
  setShowCardMessageInput?: (show: boolean) => void;
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  selectedType,
  selectedTime,
  onTypeChange,
  onTimeChange,
  products = [],
  onQuantityChange = () => {},
  cardMessage = '',
  setCardMessage = () => {},
  showCardMessageInput = false,
  setShowCardMessageInput = () => {}
}) => {
  const [manualTimeSlot, setManualTimeSlot] = useState(false);
  const [askRecipientForTime, setAskRecipientForTime] = useState(false);
  const isMobile = useIsMobile();

  // Ensure our defaults are set when component mounts
  useEffect(() => {
    setManualTimeSlot(false);
    setAskRecipientForTime(false);
  }, []);

  return (
    <>      
      {/* Отображаем товары только на мобильных устройствах */}
      {isMobile && products.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-4">Ваш заказ</h2>
          <div className="divide-y divide-[#F0F0F0] border border-[#F0F0F0] rounded-md mb-4">
            {products.map((product) => (
              <CartItem
                key={product.id}
                {...product}
                onQuantityChange={onQuantityChange}
              />
            ))}
          </div>
          
          <CardMessage
            cardMessage={cardMessage}
            setCardMessage={setCardMessage}
            showCardMessageInput={showCardMessageInput}
            setShowCardMessageInput={setShowCardMessageInput}
          />
        </div>
      )}
      
      <DeliveryTypeSelector 
        selectedType={selectedType} 
        onTypeChange={onTypeChange} 
      />
      
      {selectedType === 'other' ? (
        <GiftingFlow 
          selectedTime={selectedTime}
          onTimeChange={onTimeChange}
          manualTimeSlot={manualTimeSlot}
          setManualTimeSlot={setManualTimeSlot}
          askRecipientForTime={askRecipientForTime}
          setAskRecipientForTime={setAskRecipientForTime}
        />
      ) : (
        <SelfDeliveryFlow
          selectedTime={selectedTime}
          onTimeChange={onTimeChange}
        />
      )}
    </>
  );
};

export default DeliveryOptions;
