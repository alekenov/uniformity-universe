
import React, { useState } from 'react';
import { MessageSquare, PenLine, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CardMessageProps {
  cardMessage: string;
  setCardMessage: (message: string) => void;
  showCardMessageInput: boolean;
  setShowCardMessageInput: (show: boolean) => void;
}

const CardMessage: React.FC<CardMessageProps> = ({
  cardMessage,
  setCardMessage,
  showCardMessageInput,
  setShowCardMessageInput
}) => {
  const { toast } = useToast();
  
  const handleAddCardMessage = () => {
    if (showCardMessageInput) {
      if (cardMessage.trim()) {
        toast({
          title: "Открытка добавлена",
          description: "Текст открытки сохранен",
        });
      }
      setShowCardMessageInput(false);
    } else {
      setShowCardMessageInput(true);
    }
  };
  
  const handleRemoveCardMessage = () => {
    setCardMessage('');
    setShowCardMessageInput(false);
    toast({
      title: "Открытка удалена",
      description: "Текст открытки был удален",
    });
  };

  if (showCardMessageInput) {
    return (
      <>
        <div className="p-4 border-t border-[#F0F0F0]">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="cardMessage" className="block text-sm font-medium">
              Текст открытки
            </label>
            <button 
              onClick={handleRemoveCardMessage}
              className="text-destructive hover:text-destructive/90 p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
              aria-label="Удалить открытку"
            >
              <X size={16} className="icon-sm" />
            </button>
          </div>
          <textarea
            id="cardMessage"
            value={cardMessage}
            onChange={(e) => setCardMessage(e.target.value)}
            placeholder="Введите текст для вашей открытки..."
            className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
            rows={3}
            maxLength={200}
          />
          <div className="form-hint text-right">
            {cardMessage.length}/200 символов
          </div>
        </div>
        <button 
          onClick={handleAddCardMessage}
          className="w-full text-center py-3 text-[#8B5CF6] font-medium hover:bg-[#F5F3FF] border-t border-[#F0F0F0] flex items-center justify-center transition-colors active-scale"
        >
          <MessageSquare size={18} className="icon mr-2" />
          Сохранить открытку
        </button>
      </>
    );
  }

  if (cardMessage.trim()) {
    return (
      <div className="p-4 border-t border-[#F0F0F0]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Текст открытки</h3>
          <div className="flex items-center">
            <button 
              onClick={() => setShowCardMessageInput(true)}
              className="text-[#8B5CF6] hover:text-[#7C3AED] p-1.5 rounded-full hover:bg-[#F5F3FF] transition-colors mr-1"
              aria-label="Редактировать открытку"
            >
              <PenLine size={16} className="icon-sm" />
            </button>
            <button 
              onClick={handleRemoveCardMessage}
              className="text-destructive hover:text-destructive/90 p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
              aria-label="Удалить открытку"
            >
              <X size={16} className="icon-sm" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{cardMessage}</p>
      </div>
    );
  }

  return (
    <button 
      onClick={handleAddCardMessage}
      className="w-full text-center py-3 text-[#8B5CF6] font-medium hover:bg-[#F5F3FF] border-t border-[#F0F0F0] flex items-center justify-center transition-colors active-scale"
    >
      <MessageSquare size={18} className="icon mr-2" />
      Добавить открытку
    </button>
  );
};

export default CardMessage;
