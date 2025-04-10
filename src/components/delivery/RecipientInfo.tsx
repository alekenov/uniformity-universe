
import React from 'react';
import { User, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface RecipientInfoProps {
  recipientName: string;
  setRecipientName: (value: string) => void;
  recipientPhone: string;
  setRecipientPhone: (value: string) => void;
}

const RecipientInfo: React.FC<RecipientInfoProps> = ({
  recipientName,
  setRecipientName,
  recipientPhone,
  setRecipientPhone,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-sm text-gray-500 mb-1">
        <User size={16} className="mr-2" />
        Информация о получателе
      </div>
      
      <div className="space-y-4 max-w-md">
        <div>
          <Input 
            value={recipientName} 
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Имя получателя" 
            className="mt-1"
          />
        </div>
        
        <div>
          <div className="relative">
            <Input 
              value={recipientPhone} 
              onChange={(e) => setRecipientPhone(e.target.value)}
              placeholder="Телефон получателя" 
              className="mt-1"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 flex items-center">
            <Phone size={12} className="inline mr-1" /> Свяжемся для согласования доставки
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipientInfo;
