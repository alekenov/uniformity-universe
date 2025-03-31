
import React, { useState } from 'react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Calendar as CalendarIcon, Clock, User, Phone, MapPin, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import DeliveryTimeSlots from './DeliveryTimeSlots';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [floor, setFloor] = useState('');
  const [courierComment, setCourierComment] = useState('');
  const [askRecipientForAddress, setAskRecipientForAddress] = useState(false);
  const [showCourierComment, setShowCourierComment] = useState(false);
  
  const toggleCourierComment = () => setShowCourierComment(!showCourierComment);

  return (
    <div className="space-y-6">
      {/* Дата доставки */}
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

      {/* Время доставки - новый дизайн */}
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Clock size={16} className="mr-2" />
          Время доставки
        </div>

        <RadioGroup 
          defaultValue={manualTimeSlot ? "manual" : "ask"}
          className="grid grid-cols-2 gap-2"
          onValueChange={(value) => {
            if (value === "manual") {
              setManualTimeSlot(true);
              setAskRecipientForTime(false);
            } else {
              setAskRecipientForTime(true);
              setManualTimeSlot(false);
            }
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="manual" id="manual" />
            <Label htmlFor="manual" className="cursor-pointer">Выбрать интервал</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ask" id="ask" />
            <Label htmlFor="ask" className="cursor-pointer">Уточнить у получателя</Label>
          </div>
        </RadioGroup>
        
        {/* Показать временные слоты только при ручном выборе */}
        {manualTimeSlot ? (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Выберите удобное время</p>
            <DeliveryTimeSlots selectedDay={selectedTime} />
          </div>
        ) : askRecipientForTime && (
          <div className="bg-gray-50 p-3 rounded-md mt-2">
            <p className="text-sm text-gray-500 flex items-center">
              <MessageSquare size={14} className="mr-2" />
              Мы сами уточним удобное время с получателем
            </p>
          </div>
        )}
      </div>
      
      <Separator className="bg-gray-100" />

      {/* Информация о получателе */}
      <div className="space-y-4">
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <User size={16} className="mr-2" />
          Информация о получателе
        </div>
        
        <div className="space-y-4">
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
              <Phone size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <Phone size={12} className="inline mr-1" /> Свяжемся для согласования доставки
            </p>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-100" />
      
      {/* Адрес доставки */}
      <div className="space-y-4">
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <MapPin size={16} className="mr-2" />
          Адрес доставки
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox 
            id="askRecipientAddress"
            checked={askRecipientForAddress}
            onCheckedChange={(checked) => {
              setAskRecipientForAddress(checked === true);
              if (checked === true) {
                setAddress('');
                setApartment('');
                setFloor('');
                setCourierComment('');
                setShowCourierComment(false);
              }
            }}
          />
          <label
            htmlFor="askRecipientAddress"
            className="text-sm leading-none"
          >
            Уточнить адрес у получателя по телефону
          </label>
        </div>

        {!askRecipientForAddress && (
          <div className="space-y-4">
            <div>
              <Input 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Улица и номер дома" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Input 
                value={apartment} 
                onChange={(e) => setApartment(e.target.value)}
                placeholder="Квартира/офис" 
              />
              <Input 
                value={floor} 
                onChange={(e) => setFloor(e.target.value)}
                placeholder="Этаж" 
              />
            </div>
            
            {!showCourierComment ? (
              <Button 
                variant="ghost" 
                onClick={toggleCourierComment}
                className="text-sm text-gray-500 p-0 h-auto hover:bg-transparent hover:text-gray-700"
                type="button"
              >
                + Добавить комментарий для курьера
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="courierComment" className="text-sm font-normal text-gray-500">
                    Комментарий курьеру
                  </Label>
                  <Button 
                    variant="ghost" 
                    onClick={toggleCourierComment}
                    className="text-xs text-gray-400 p-0 h-auto hover:bg-transparent hover:text-gray-700"
                    type="button"
                  >
                    Скрыть
                  </Button>
                </div>
                <Textarea 
                  id="courierComment" 
                  value={courierComment}
                  onChange={(e) => setCourierComment(e.target.value)}
                  placeholder="Код от двери, как найти подъезд, другие детали..." 
                  rows={2}
                  className="resize-none text-sm"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftingFlow;
