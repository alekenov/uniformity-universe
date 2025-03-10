
import React from 'react';
import { cn } from '@/lib/utils';
import { DeliveryType } from '@/components/DeliveryOptions';
import { TruckIcon, UserRound, ShoppingBagIcon, HomeIcon } from 'lucide-react';

interface DeliveryOption {
  id: DeliveryType;
  title: string;
  description?: string;
  additionalPrice?: number;
  color: string;
  icon: React.ReactNode;
}

interface DeliveryTypeSelectorProps {
  selectedType: DeliveryType;
  onTypeChange: (type: DeliveryType) => void;
}

const deliveryOptions: DeliveryOption[] = [
  {
    id: 'delivery',
    title: 'Доставка',
    color: '#E5F7FF',
    icon: <TruckIcon size={24} />,
  },
  {
    id: 'other',
    title: 'Заказ другому',
    color: '#E5DEFF',
    icon: <UserRound size={24} />,
  },
  {
    id: 'self',
    title: 'Сам получатель',
    color: '#FEF7CD',
    icon: <HomeIcon size={24} />,
  },
  {
    id: 'pickup',
    title: 'Самовывоз',
    color: '#F2FCE2',
    icon: <ShoppingBagIcon size={24} />,
  },
];

const DeliveryTypeSelector: React.FC<DeliveryTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      {deliveryOptions.map((option) => (
        <div
          key={option.id}
          style={{ 
            backgroundColor: selectedType === option.id ? option.color + '40' : 'white',
          }}
          className={cn(
            "delivery-option transition-all duration-200 border-2 hover:shadow-md rounded-lg overflow-hidden",
            selectedType === option.id 
              ? "border-primary shadow-sm" 
              : "border-transparent hover:border-gray-200"
          )}
          onClick={() => onTypeChange(option.id)}
        >
          {option.additionalPrice && (
            <div className="absolute top-2 right-2 text-xs bg-white rounded-full px-2 py-1 shadow-sm">
              +{option.additionalPrice} ₽
            </div>
          )}
          <div className="flex flex-col items-center justify-center p-3">
            <div className="mb-2 text-gray-700">
              {option.icon}
            </div>
            <span className="text-sm font-medium text-center">{option.title}</span>
          </div>
          {option.description && (
            <span className="text-xs text-gray-500">{option.description}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeliveryTypeSelector;
