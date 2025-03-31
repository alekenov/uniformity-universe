
import React, { useState } from 'react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, User, Phone, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import DeliveryTimeSlots from './DeliveryTimeSlots';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface GiftingFlowProps {
  selectedTime: DeliveryTime;
  onTimeChange: (time: DeliveryTime) => void;
  manualTimeSlot: boolean;
  setManualTimeSlot: (value: boolean) => void;
  askRecipientForTime: boolean;
  setAskRecipientForTime: (value: boolean) => void;
}

const GiftingFlow: React.FC<GiftingFlowProps> = ({
  selectedTime,
  onTimeChange,
  manualTimeSlot,
  setManualTimeSlot,
  askRecipientForTime,
  setAskRecipientForTime,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-6">
      {/* Delivery Date Selection */}
      <div>
        <div className="bg-[#F8F8F8] rounded-full p-1 flex items-center">
          <button
            className={`flex-1 px-4 py-2 text-sm rounded-full transition-all duration-200 ${
              selectedTime === 'today'
                ? "bg-white shadow-sm font-medium" 
                : "text-gray-600 hover:bg-white/50"
            }`}
            onClick={() => onTimeChange('today')}
          >
            Сегодня
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm rounded-full transition-all duration-200 ${
              selectedTime === 'tomorrow'
                ? "bg-white shadow-sm font-medium"
                : "text-gray-600 hover:bg-white/50"
            }`}
            onClick={() => onTimeChange('tomorrow')}
          >
            Завтра
          </button>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="flex-1 px-4 py-2 text-sm rounded-full transition-all duration-200 text-gray-600 hover:bg-white/50"
              >
                <CalendarIcon size={16} className="inline-block mr-1" />
                Выбрать
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                }}
                disabled={{ before: new Date() }}
                initialFocus
                locale={ru}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Separator className="bg-gray-100" />

      {/* Delivery Time Selection */}
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Clock size={16} className="mr-2" />
          Время доставки
        </div>

        <RadioGroup 
          defaultValue={manualTimeSlot ? "manual" : "ask"}
          className="flex gap-2 mb-3"
          onValueChange={(value) => {
            if (value === "manual") {
              setManualTimeSlot(true);
              setAskRecipientForTime(false);
            } else {
              setManualTimeSlot(false);
              setAskRecipientForTime(true);
            }
          }}
        >
          <div className="flex-1 flex items-center justify-center">
            <RadioGroupItem 
              value="manual" 
              id="manual" 
              className="peer sr-only" 
            />
            <Label
              htmlFor="manual"
              className="flex-1 flex justify-center py-2 text-sm rounded-md border border-gray-200 cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary"
            >
              Выбрать интервал
            </Label>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <RadioGroupItem 
              value="ask" 
              id="ask" 
              className="peer sr-only" 
            />
            <Label
              htmlFor="ask"
              className="flex-1 flex justify-center py-2 text-sm rounded-md border border-gray-200 cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary"
            >
              Уточнить у получателя
            </Label>
          </div>
        </RadioGroup>
        
        {askRecipientForTime && (
          <p className="text-xs text-gray-500 flex items-center mb-2">
            <Clock size={12} className="inline mr-1" /> Мы сами свяжемся, чтобы согласовать время
          </p>
        )}
        
        {/* Show time slots only when manual selection is active */}
        {manualTimeSlot && <DeliveryTimeSlots selectedDay={selectedTime} />}
      </div>
    </div>
  );
};

export default GiftingFlow;
