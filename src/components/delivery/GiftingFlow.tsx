
import React, { useState } from 'react';
import { DeliveryTime } from '@/components/DeliveryOptions';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import DeliveryTimeSlots from './DeliveryTimeSlots';

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
  const [askRecipientForAddress, setAskRecipientForAddress] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  
  const toggleAddressDetails = () => setShowAddressDetails(!showAddressDetails);

  // Определяем день недели и дату для отображения
  const getTodayTomorrowText = (day: DeliveryTime) => {
    if (day === 'today') return 'Сегодня';
    if (day === 'tomorrow') return 'Завтра';
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Выбор даты доставки */}
      <div className="space-y-2">
        <div className="font-medium text-base mb-2">Дата доставки</div>
        <div className="flex bg-[#F8F8F8] rounded-full p-1">
          <button
            className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
              selectedTime === 'today'
                ? "bg-white shadow-sm font-medium" 
                : "text-gray-600 hover:bg-white/50"
            }`}
            onClick={() => onTimeChange('today')}
          >
            Сегодня
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
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
                className="px-4 py-2 text-sm rounded-full transition-all duration-200 text-gray-600 hover:bg-white/50"
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
                  // Здесь можно добавить логику для выбора конкретной даты
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

      {/* Время доставки */}
      <div className="space-y-2">
        <div className="font-medium text-base mb-2 flex items-center">
          <Clock size={18} className="mr-2 text-gray-500" />
          Время доставки ({getTodayTomorrowText(selectedTime)})
        </div>

        {/* Переключатель для ручного выбора времени или уточнения у получателя */}
        <div className="flex items-center space-x-2 mb-3">
          <Button
            variant={manualTimeSlot ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setManualTimeSlot(true);
              setAskRecipientForTime(false);
            }}
            className={`flex-1 ${manualTimeSlot ? "" : "border-dashed"}`}
          >
            Выбрать интервал
          </Button>
          <Button
            variant={askRecipientForTime ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setAskRecipientForTime(true);
              setManualTimeSlot(false);
            }}
            className={`flex-1 ${askRecipientForTime ? "" : "border-dashed"}`}
          >
            Уточнить у получателя
          </Button>
        </div>
        
        {/* Показать временные слоты только при ручном выборе */}
        {manualTimeSlot && <DeliveryTimeSlots selectedDay={selectedTime} />}
      </div>

      {/* Информация о получателе */}
      <div className="space-y-4">
        <div className="font-medium text-base">Информация о получателе</div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="recipientName">Имя получателя</Label>
            <Input 
              id="recipientName" 
              value={recipientName} 
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Имя Фамилия" 
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="recipientPhone">Телефон получателя</Label>
            <Input 
              id="recipientPhone" 
              value={recipientPhone} 
              onChange={(e) => setRecipientPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__" 
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Мы позвоним или напишем для согласования доставки
            </p>
          </div>
        </div>
      </div>

      {/* Адрес доставки */}
      <div className="space-y-3">
        <div className="font-medium text-base">Адрес доставки</div>
        
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox 
            id="askRecipientAddress"
            checked={askRecipientForAddress}
            onCheckedChange={(checked) => {
              setAskRecipientForAddress(checked === true);
              if (checked === true) {
                setAddress('');
                setApartment('');
                setShowAddressDetails(false);
              }
            }}
          />
          <label
            htmlFor="askRecipientAddress"
            className="text-sm font-medium leading-none"
          >
            Уточним адрес у получателя по телефону
          </label>
        </div>

        {!askRecipientForAddress && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="address">Улица и номер дома</Label>
              <Input 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Улица и номер дома" 
                className="mt-1"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleAddressDetails}
                className="text-sm"
              >
                {showAddressDetails ? 'Скрыть детали' : 'Добавить детали доставки'}
              </Button>
            </div>
            
            {showAddressDetails && (
              <div className="space-y-3 p-3 bg-gray-50 rounded-md">
                <div>
                  <Label htmlFor="apartment">Квартира/офис</Label>
                  <Input 
                    id="apartment" 
                    value={apartment} 
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="Номер квартиры/офиса" 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="comment">Комментарий курьеру</Label>
                  <textarea 
                    id="comment" 
                    placeholder="Код от двери, как найти подъезд и т.д." 
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftingFlow;
