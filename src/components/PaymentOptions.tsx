
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type PaymentMethod = string;

interface PaymentCard {
  id: PaymentMethod;
  last4: string;
  type: 'visa' | 'mastercard';
}

interface PaymentOptionsProps {
  cards: PaymentCard[];
  selectedCard: PaymentMethod;
  onCardSelect: (id: PaymentMethod) => void;
  customerPhone: string;
  onCustomerPhoneChange: (phone: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  cards,
  selectedCard,
  onCardSelect,
  customerPhone,
  onCustomerPhoneChange,
}) => {
  return (
    <div className="panel">
      <h2 className="text-xl font-medium mb-4">Оплата</h2>
      
      <div className="flex gap-3 mb-4 overflow-x-auto py-1 -mx-1 px-1">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onCardSelect(card.id)}
            className={cn(
              "flex-shrink-0 flex items-center gap-3 py-2 px-3 border rounded-xl cursor-pointer transition-all",
              selectedCard === card.id
                ? "border-primary bg-secondary"
                : "border-[#E0E0E0] hover:border-gray-300"
            )}
          >
            <div className="w-10 h-6">
              {card.type === 'visa' && (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" fill="#1434CB"/>
                  <path d="M17.0533 29.4933H13.3333L15.7333 18.5067H19.4533L17.0533 29.4933Z" fill="white"/>
                  <path d="M27.8934 18.76C27.16 18.4933 26.0534 18.2133 24.7467 18.2133C21.6267 18.2133 19.4534 19.8267 19.44 22.0533C19.4134 23.7067 21.0134 24.6 22.2 25.1333C23.4134 25.6667 23.8134 26.0133 23.8134 26.4933C23.8 27.2 22.8934 27.5333 22.04 27.5333C20.8534 27.5333 20.2134 27.3467 19.1334 26.8667L18.68 26.6533L18.2 29.2667C19.0534 29.6267 20.6534 29.9467 22.3067 29.96C25.6267 29.96 27.76 28.3733 27.7867 26C27.8 24.7467 27 23.8 25.24 23C24.1334 22.44 23.48 22.0667 23.48 21.5067C23.48 21 24.0134 20.4667 25.08 20.4667C25.96 20.4533 26.6 20.6933 27.08 20.9333L27.4 21.0933L27.8934 18.76Z" fill="white"/>
                  <path d="M32.1867 25.8267C32.4267 25.2 33.5733 22.32 33.5733 22.32C33.56 22.3333 33.84 21.5733 34 21.1333L34.2133 22.1867C34.2133 22.1867 34.88 25.32 35 25.8267C34.7733 25.8267 32.48 25.8267 32.1867 25.8267ZM35.9733 18.5067H33.3067C32.4533 18.5067 31.8133 18.7333 31.4 19.5333L26.8667 29.4933H30.1867C30.1867 29.4933 30.7733 27.9333 30.8934 27.6133C31.2 27.6133 34.44 27.6133 34.8267 27.6133C34.92 28.0133 35.24 29.4933 35.24 29.4933H38.16L35.9733 18.5067Z" fill="white"/>
                </svg>
              )}
              {card.type === 'mastercard' && (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="24" r="12" fill="#EB001B"/>
                  <circle cx="32" cy="24" r="12" fill="#F79E1B"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M24 32.16C27.2702 29.662 29.44 26.0538 29.44 22C29.44 17.9462 27.2702 14.338 24 11.84C20.7298 14.338 18.56 17.9462 18.56 22C18.56 26.0538 20.7298 29.662 24 32.16Z" fill="#FF5F00"/>
                </svg>
              )}
            </div>
            <div className="text-sm font-medium">•• {card.last4}</div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2 max-w-md">
        <Label htmlFor="customerPhone" className="text-sm text-gray-500">
          Номер телефона заказчика
        </Label>
        <div className="relative">
          <Input
            id="customerPhone"
            type="tel"
            value={customerPhone}
            onChange={(e) => onCustomerPhoneChange(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className="pr-10"
          />
          <Phone size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
