
import React from 'react';
import { cn } from '@/lib/utils';
import { DeliveryType } from '@/components/DeliveryOptions';
import { Gift, User } from 'lucide-react';

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
    id: 'other',
    title: 'Хочу подарить',
    color: '#E5DEFF',
    icon: <Gift size={18} />,
  },
  {
    id: 'self',
    title: 'Заказываю себе',
    color: '#FEF7CD',
    icon: <User size={18} />,
  },
];

const DeliveryTypeSelector: React.FC<DeliveryTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-3">
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
            <div className="absolute top-1 right-1 text-xs bg-white rounded-full px-1.5 py-0.5 shadow-sm">
              +{option.additionalPrice} ₽
            </div>
          )}
          <div className="flex flex-col items-center justify-center p-2">
            <div className="mb-1 text-gray-700">
              {option.icon}
            </div>
            <span className="text-xs font-medium text-center">{option.title}</span>
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
