
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, Clock, Package, Truck, Home, Calendar, Edit, X, 
  MapPin, MessageSquare, ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

// Sample data for demonstration
const sampleOrder = {
  id: '12345',
  status: 'processing' as OrderStatus, // Added type assertion here
  createdAt: new Date(2023, 5, 15, 14, 30),
  total: 12500,
  items: [
    {
      id: 1,
      name: 'Букет "Весенний"',
      price: 8500,
      quantity: 1,
      image: '/public/placeholder.svg'
    }
  ],
  deliveryAddress: {
    street: 'ул. Пушкина, д. 10, кв. 5',
    city: 'Москва',
    entrance: '2',
    floor: '3',
    apartment: '5',
    intercom: '35B'
  },
  deliveryDate: new Date(2023, 5, 16, 15, 0),
  cardMessage: 'С днем рождения! Желаю счастья и здоровья!',
  paymentMethod: 'card',
  recipient: {
    name: 'Анна Иванова',
    phone: '+7 (999) 123-45-67'
  }
};

// Define the OrderStatus type to fix the type error
type OrderStatus = 'processing' | 'confirmed' | 'delivering' | 'delivered' | 'cancelled';

const OrderStatus: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for the actual order - would be fetched based on orderId in a real app
  const [order, setOrder] = useState(sampleOrder);
  
  // State for edit sheets
  const [editingAddress, setEditingAddress] = useState(false);
  const [editingDate, setEditingDate] = useState(false);
  const [editingMessage, setEditingMessage] = useState(false);
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  
  // Temporary states for edits
  const [tempAddress, setTempAddress] = useState(order.deliveryAddress);
  const [tempDate, setTempDate] = useState(order.deliveryDate);
  const [tempMessage, setTempMessage] = useState(order.cardMessage);
  
  const goBack = () => {
    navigate(-1);
  };
  
  const saveAddress = () => {
    setOrder(prev => ({
      ...prev,
      deliveryAddress: tempAddress
    }));
    setEditingAddress(false);
    toast({
      title: "Адрес обновлен",
      description: "Адрес доставки успешно изменен"
    });
  };
  
  const saveDate = () => {
    setOrder(prev => ({
      ...prev,
      deliveryDate: tempDate
    }));
    setEditingDate(false);
    toast({
      title: "Дата обновлена",
      description: "Дата доставки успешно изменена"
    });
  };
  
  const saveMessage = () => {
    setOrder(prev => ({
      ...prev,
      cardMessage: tempMessage
    }));
    setEditingMessage(false);
    toast({
      title: "Сообщение обновлено",
      description: "Текст открытки успешно изменен"
    });
  };
  
  const removeMessage = () => {
    setOrder(prev => ({
      ...prev,
      cardMessage: ''
    }));
    setEditingMessage(false);
    toast({
      title: "Открытка удалена",
      description: "Текст открытки успешно удален"
    });
  };
  
  const cancelOrder = () => {
    setOrder(prev => ({
      ...prev,
      status: 'cancelled' as OrderStatus // Added type assertion here
    }));
    setConfirmingCancel(false);
    toast({
      title: "Заказ отменен",
      description: "Ваш заказ был успешно отменен"
    });
  };
  
  // Status step calculation
  const getStatusStep = (status: OrderStatus) => {
    switch(status) {
      case "processing": return 0;
      case "confirmed": return 1;
      case "delivering": return 2;
      case "delivered": return 3;
      case "cancelled": return -1;
      default: return 0;
    }
  };
  
  const statusStep = getStatusStep(order.status);
  
  return (
    <div className="container max-w-3xl mx-auto pb-20 px-4">
      {/* Header */}
      <div className="py-4 flex items-center">
        <button onClick={goBack} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-medium ml-2">Статус заказа #{order.id}</h1>
      </div>
      
      {/* Order Status */}
      {order.status === 'cancelled' ? (
        <div className="bg-red-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-medium text-red-700">Заказ отменен</h2>
          <p className="text-sm text-red-600">
            Заказ был отменен {format(new Date(), 'dd MMMM, HH:mm', { locale: ru })}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-medium">Статус доставки</h2>
            <span className="text-sm text-gray-500">
              {format(order.createdAt, 'dd MMMM yyyy', { locale: ru })}
            </span>
          </div>
          
          {/* Progress Stepper */}
          <div className="relative mb-2">
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0"></div>
            <div className="flex justify-between relative z-10">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusStep >= 0 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                  <Clock size={20} />
                </div>
                <span className="text-xs mt-2">Обработка</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                  <Package size={20} />
                </div>
                <span className="text-xs mt-2">Подтвержден</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusStep >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                  <Truck size={20} />
                </div>
                <span className="text-xs mt-2">В пути</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusStep >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                  <Home size={20} />
                </div>
                <span className="text-xs mt-2">Доставлен</span>
              </div>
            </div>
          </div>
          
          {/* Status Message */}
          <p className="text-sm text-gray-600 text-center mt-4">
            {statusStep === 0 && "Ваш заказ обрабатывается. Мы свяжемся с вами в ближайшее время."}
            {statusStep === 1 && "Ваш заказ подтвержден. Мы готовим его к отправке."}
            {statusStep === 2 && "Ваш заказ в пути. Ожидайте доставку."}
            {statusStep === 3 && "Ваш заказ доставлен. Спасибо за покупку!"}
          </p>
        </div>
      )}
      
      {/* Order Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Детали заказа</h2>
        
        {/* Product Details */}
        {order.items.map(item => (
          <div key={item.id} className="flex items-center mb-6 pb-6 border-b border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-500">Количество: {item.quantity}</span>
                <span className="font-medium">{item.price.toLocaleString()} ₸</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Preview Image */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <h3 className="font-medium mb-3">Предварительный вид букета</h3>
          <div className="w-full h-52 bg-gray-50 rounded-lg flex items-center justify-center">
            <ShoppingBag size={48} className="text-gray-300" />
            <span className="text-gray-400 ml-3">Изображение будет доступно ближе к доставке</span>
          </div>
        </div>
        
        {/* Delivery Details with Edit */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Адрес доставки</h3>
            {order.status !== 'cancelled' && (
              <button 
                onClick={() => {
                  setTempAddress(order.deliveryAddress);
                  setEditingAddress(true);
                }}
                className="text-[#4BA3E3] hover:text-[#3A92D2] p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                aria-label="Изменить адрес"
              >
                <Edit size={16} />
              </button>
            )}
          </div>
          <div className="flex items-start">
            <MapPin size={18} className="text-gray-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm">{order.deliveryAddress.street}</p>
              <p className="text-sm text-gray-500">
                {order.deliveryAddress.city}, 
                Подъезд: {order.deliveryAddress.entrance}, 
                Этаж: {order.deliveryAddress.floor}, 
                Кв: {order.deliveryAddress.apartment}, 
                Домофон: {order.deliveryAddress.intercom}
              </p>
            </div>
          </div>
        </div>
        
        {/* Delivery Date with Edit */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Дата и время доставки</h3>
            {order.status !== 'cancelled' && (
              <button 
                onClick={() => {
                  setTempDate(order.deliveryDate);
                  setEditingDate(true);
                }}
                className="text-[#4BA3E3] hover:text-[#3A92D2] p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                aria-label="Изменить дату"
              >
                <Edit size={16} />
              </button>
            )}
          </div>
          <div className="flex items-start">
            <Calendar size={18} className="text-gray-400 mr-2 mt-0.5" />
            <p className="text-sm">
              {format(order.deliveryDate, 'dd MMMM yyyy, HH:mm', { locale: ru })}
            </p>
          </div>
        </div>
        
        {/* Card Message with Edit */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Текст открытки</h3>
            {order.status !== 'cancelled' && order.cardMessage && (
              <div className="flex">
                <button 
                  onClick={() => {
                    setTempMessage(order.cardMessage);
                    setEditingMessage(true);
                  }}
                  className="text-[#4BA3E3] hover:text-[#3A92D2] p-1.5 rounded-full hover:bg-blue-50 transition-colors mr-1"
                  aria-label="Редактировать открытку"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={removeMessage}
                  className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                  aria-label="Удалить открытку"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
          {order.cardMessage ? (
            <div className="flex items-start">
              <MessageSquare size={18} className="text-gray-400 mr-2 mt-0.5" />
              <p className="text-sm">{order.cardMessage}</p>
            </div>
          ) : (
            <div className="flex items-center text-gray-400">
              <MessageSquare size={18} className="mr-2" />
              <p className="text-sm">Без открытки</p>
              {order.status !== 'cancelled' && (
                <button 
                  onClick={() => {
                    setTempMessage('');
                    setEditingMessage(true);
                  }}
                  className="text-[#4BA3E3] ml-2 text-sm hover:underline"
                >
                  Добавить
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Recipient */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <h3 className="font-medium mb-3">Получатель</h3>
          <p className="text-sm">{order.recipient.name}</p>
          <p className="text-sm text-gray-500">{order.recipient.phone}</p>
        </div>
        
        {/* Payment */}
        <div>
          <h3 className="font-medium mb-3">Оплата</h3>
          <div className="flex justify-between">
            <span className="text-sm">Сумма заказа</span>
            <span className="font-medium">{order.total.toLocaleString()} ₸</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Способ оплаты</span>
            <span className="text-sm">
              {order.paymentMethod === 'card' ? 'Банковская карта' : 'Наличные'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      {order.status !== 'cancelled' && order.status !== 'delivered' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={() => setConfirmingCancel(true)}
          >
            Отменить заказ
          </Button>
        </div>
      )}
      
      {/* Edit Address Sheet */}
      <Sheet open={editingAddress} onOpenChange={setEditingAddress}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Изменить адрес доставки</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label className="text-sm font-medium">Улица, дом</label>
              <input 
                type="text" 
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                value={tempAddress.street}
                onChange={(e) => setTempAddress({...tempAddress, street: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Город</label>
              <input 
                type="text" 
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                value={tempAddress.city}
                onChange={(e) => setTempAddress({...tempAddress, city: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Подъезд</label>
                <input 
                  type="text" 
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  value={tempAddress.entrance}
                  onChange={(e) => setTempAddress({...tempAddress, entrance: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Этаж</label>
                <input 
                  type="text" 
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  value={tempAddress.floor}
                  onChange={(e) => setTempAddress({...tempAddress, floor: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Квартира/Офис</label>
                <input 
                  type="text" 
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  value={tempAddress.apartment}
                  onChange={(e) => setTempAddress({...tempAddress, apartment: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Домофон</label>
                <input 
                  type="text" 
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  value={tempAddress.intercom}
                  onChange={(e) => setTempAddress({...tempAddress, intercom: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <Button onClick={saveAddress}>Сохранить</Button>
            <Button variant="outline" onClick={() => setEditingAddress(false)}>Отмена</Button>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Edit Date Sheet */}
      <Sheet open={editingDate} onOpenChange={setEditingDate}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Изменить дату доставки</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <div className="mb-4">
              <label className="text-sm font-medium">Дата</label>
              <input 
                type="date" 
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                value={format(tempDate, 'yyyy-MM-dd')}
                onChange={(e) => {
                  const newDate = new Date(e.target.value);
                  newDate.setHours(tempDate.getHours());
                  newDate.setMinutes(tempDate.getMinutes());
                  setTempDate(newDate);
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Время</label>
              <input 
                type="time" 
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                value={format(tempDate, 'HH:mm')}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':');
                  const newDate = new Date(tempDate);
                  newDate.setHours(parseInt(hours));
                  newDate.setMinutes(parseInt(minutes));
                  setTempDate(newDate);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <Button onClick={saveDate}>Сохранить</Button>
            <Button variant="outline" onClick={() => setEditingDate(false)}>Отмена</Button>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Edit Message Sheet */}
      <Sheet open={editingMessage} onOpenChange={setEditingMessage}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Изменить текст открытки</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <label className="text-sm font-medium">Текст открытки</label>
            <textarea 
              className="w-full h-40 mt-1 border border-gray-300 rounded-md p-2"
              value={tempMessage}
              onChange={(e) => setTempMessage(e.target.value)}
              placeholder="Введите текст открытки..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Максимум 200 символов
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <Button onClick={saveMessage}>Сохранить</Button>
            <Button variant="outline" onClick={() => setEditingMessage(false)}>Отмена</Button>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Cancel Confirmation Sheet */}
      <Sheet open={confirmingCancel} onOpenChange={setConfirmingCancel}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Отменить заказ</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <p className="text-gray-600">
              Вы уверены, что хотите отменить заказ? Это действие невозможно отменить.
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <Button variant="destructive" onClick={cancelOrder}>
              Да, отменить заказ
            </Button>
            <Button variant="outline" onClick={() => setConfirmingCancel(false)}>
              Нет, вернуться
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OrderStatus;
