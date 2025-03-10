
import React, { useState } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { PaymentMethod } from '@/components/PaymentOptions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface PaymentCard {
  id: PaymentMethod;
  last4: string;
  type: 'visa' | 'mastercard';
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

const ProfilePaymentMethods: React.FC = () => {
  const [cards, setCards] = useState<PaymentCard[]>([
    { id: 'card1', last4: '4242', type: 'visa', expiryMonth: '12', expiryYear: '25', isDefault: true },
    { id: 'card2', last4: '1234', type: 'mastercard', expiryMonth: '06', expiryYear: '26', isDefault: false }
  ]);
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: ''
  });

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCard = () => {
    // Basic validation
    if (
      !newCard.cardNumber || 
      !newCard.expiryMonth || 
      !newCard.expiryYear || 
      !newCard.cvv || 
      !newCard.cardholderName
    ) {
      toast.error('Заполните все поля');
      return;
    }

    // Simulate adding a card
    const cardType = Math.random() > 0.5 ? 'visa' : 'mastercard';
    const last4 = newCard.cardNumber.slice(-4);
    
    setCards(prev => [
      ...prev,
      {
        id: `card${Date.now()}`,
        last4,
        type: cardType,
        expiryMonth: newCard.expiryMonth,
        expiryYear: newCard.expiryYear,
        isDefault: cards.length === 0
      }
    ]);

    // Reset form and close dialog
    setNewCard({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: ''
    });
    setIsCardDialogOpen(false);
    toast.success('Карта добавлена');
  };

  const handleDeleteCard = (id: string) => {
    const deletingDefault = cards.find(card => card.id === id)?.isDefault;
    
    // Remove the card
    const updatedCards = cards.filter(card => card.id !== id);
    
    // If we're deleting the default card and there are other cards,
    // set the first remaining card as default
    if (deletingDefault && updatedCards.length > 0) {
      updatedCards[0].isDefault = true;
    }
    
    setCards(updatedCards);
    toast.success('Карта удалена');
  };

  const handleSetDefaultCard = (id: string) => {
    setCards(prev => 
      prev.map(card => ({
        ...card,
        isDefault: card.id === id
      }))
    );
    toast.success('Карта по умолчанию изменена');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Способы оплаты</h3>
        <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span>Добавить</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить новую карту</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Имя владельца</Label>
                <Input 
                  id="cardholderName" 
                  name="cardholderName" 
                  value={newCard.cardholderName} 
                  onChange={handleCardChange} 
                  placeholder="Имя как на карте"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Номер карты</Label>
                <Input 
                  id="cardNumber" 
                  name="cardNumber" 
                  value={newCard.cardNumber} 
                  onChange={handleCardChange} 
                  placeholder="XXXX XXXX XXXX XXXX"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="expiryMonth">Месяц</Label>
                  <Input 
                    id="expiryMonth" 
                    name="expiryMonth" 
                    value={newCard.expiryMonth} 
                    onChange={handleCardChange}
                    placeholder="MM"
                    maxLength={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryYear">Год</Label>
                  <Input 
                    id="expiryYear" 
                    name="expiryYear" 
                    value={newCard.expiryYear} 
                    onChange={handleCardChange}
                    placeholder="YY"
                    maxLength={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    name="cvv" 
                    type="password"
                    value={newCard.cvv} 
                    onChange={handleCardChange}
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
            <Button onClick={handleAddCard}>Добавить карту</Button>
          </DialogContent>
        </Dialog>
      </div>

      {cards.length > 0 ? (
        <div className="space-y-3">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`p-4 rounded-xl border ${card.isDefault ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-[#F0F0F0] rounded flex items-center justify-center">
                    {card.type === 'visa' && (
                      <svg viewBox="0 0 48 48" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" fill="#1434CB"/>
                        <path d="M17.0533 29.4933H13.3333L15.7333 18.5067H19.4533L17.0533 29.4933Z" fill="white"/>
                        <path d="M27.8934 18.76C27.16 18.4933 26.0534 18.2133 24.7467 18.2133C21.6267 18.2133 19.4534 19.8267 19.44 22.0533C19.4134 23.7067 21.0134 24.6 22.2 25.1333C23.4134 25.6667 23.8134 26.0133 23.8134 26.4933C23.8 27.2 22.8934 27.5333 22.04 27.5333C20.8534 27.5333 20.2134 27.3467 19.1334 26.8667L18.68 26.6533L18.2 29.2667C19.0534 29.6267 20.6534 29.9467 22.3067 29.96C25.6267 29.96 27.76 28.3733 27.7867 26C27.8 24.7467 27 23.8 25.24 23C24.1334 22.44 23.48 22.0667 23.48 21.5067C23.48 21 24.0134 20.4667 25.08 20.4667C25.96 20.4533 26.6 20.6933 27.08 20.9333L27.4 21.0933L27.8934 18.76Z" fill="white"/>
                        <path d="M32.1867 25.8267C32.4267 25.2 33.5733 22.32 33.5733 22.32C33.56 22.3333 33.84 21.5733 34 21.1333L34.2133 22.1867C34.2133 22.1867 34.88 25.32 35 25.8267C34.7733 25.8267 32.48 25.8267 32.1867 25.8267ZM35.9733 18.5067H33.3067C32.4533 18.5067 31.8133 18.7333 31.4 19.5333L26.8667 29.4933H30.1867C30.1867 29.4933 30.7733 27.9333 30.8934 27.6133C31.2 27.6133 34.44 27.6133 34.8267 27.6133C34.92 28.0133 35.24 29.4933 35.24 29.4933H38.16L35.9733 18.5067Z" fill="white"/>
                      </svg>
                    )}
                    {card.type === 'mastercard' && (
                      <svg viewBox="0 0 48 48" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="24" r="12" fill="#EB001B"/>
                        <circle cx="32" cy="24" r="12" fill="#F79E1B"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 32.16C27.2702 29.662 29.44 26.0538 29.44 22C29.44 17.9462 27.2702 14.338 24 11.84C20.7298 14.338 18.56 17.9462 18.56 22C18.56 26.0538 20.7298 29.662 24 32.16Z" fill="#FF5F00"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">•••• {card.last4}</div>
                    <div className="text-sm text-gray-500">
                      {card.expiryMonth}/{card.expiryYear}
                    </div>
                    {!card.isDefault && (
                      <button 
                        className="mt-1 text-xs text-primary underline"
                        onClick={() => handleSetDefaultCard(card.id)}
                      >
                        Сделать основной
                      </button>
                    )}
                  </div>
                </div>
                <button 
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <CreditCard className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">У вас пока нет сохраненных карт</p>
          <Button 
            variant="outline" 
            className="mt-3"
            onClick={() => setIsCardDialogOpen(true)}
          >
            Добавить карту
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePaymentMethods;
