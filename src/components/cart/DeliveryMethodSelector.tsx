
import React from 'react';
import { Truck, Store } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface DeliveryMethodSelectorProps {
  deliveryMethod: 'delivery' | 'pickup';
  setDeliveryMethod: (value: 'delivery' | 'pickup') => void;
}

const DeliveryMethodSelector: React.FC<DeliveryMethodSelectorProps> = ({ 
  deliveryMethod, 
  setDeliveryMethod 
}) => {
  return (
    <div className="mb-4">
      <RadioGroup 
        value={deliveryMethod}
        onValueChange={(value: 'delivery' | 'pickup') => setDeliveryMethod(value as 'delivery' | 'pickup')}
        className="flex space-x-2 bg-[#F8F8F8] p-1 rounded-lg"
      >
        <div className={`flex-1 rounded-md transition-colors ${deliveryMethod === 'delivery' ? 'bg-white shadow-sm' : ''}`}>
          <RadioGroupItem 
            value="delivery" 
            id="cart-delivery" 
            className="sr-only" 
          />
          <Label 
            htmlFor="cart-delivery" 
            className={`w-full p-2 flex items-center justify-center cursor-pointer text-sm ${deliveryMethod === 'delivery' ? 'font-medium' : 'text-gray-600'}`}
          >
            <Truck size={16} className="mr-1.5" />
            Доставка
          </Label>
        </div>
        
        <div className={`flex-1 rounded-md transition-colors ${deliveryMethod === 'pickup' ? 'bg-white shadow-sm' : ''}`}>
          <RadioGroupItem 
            value="pickup" 
            id="cart-pickup" 
            className="sr-only" 
          />
          <Label 
            htmlFor="cart-pickup" 
            className={`w-full p-2 flex items-center justify-center cursor-pointer text-sm ${deliveryMethod === 'pickup' ? 'font-medium' : 'text-gray-600'}`}
          >
            <Store size={16} className="mr-1.5" />
            Самовывоз
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default DeliveryMethodSelector;
