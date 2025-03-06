
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, Clock, Package, Truck, Home, Calendar, Edit, X, 
  MapPin, MessageSquare, ShoppingBag, ThumbsUp, User, Phone,
  Image, Check, MessageCircle, Save, ChevronRight, MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

// Sample data for demonstration
const sampleOrder = {
  id: '12345',
  status: 'processing' as OrderStatus, // Added type assertion here
  statusHistory: [
    { status: 'processing' as OrderStatus, timestamp: new Date(2023, 5, 15, 14, 30), note: 'Заказ получен и обрабатывается' },
  ],
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
  bouquetPhoto: '/placeholder.svg', // Фото собранного букета
  customerApproved: false, // Клиент подтвердил
  florist: {
    name: 'Елена Цветкова',
    phone: '+7 (777) 123-45-67',
    photo: '/placeholder.svg'
  },
  courier: {
    name: 'Александр Доставкин',
    phone: '+7 (777) 987-65-43',
    photo: '/placeholder.svg'
  },
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
  
  // State for inline editing
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);
  const [isContactingFlorist, setIsContactingFlorist] = useState(false);
  const [isContactingCourier, setIsContactingCourier] = useState(false);
  const [showStatusHistory, setShowStatusHistory] = useState(false);
  
  // Temporary states for edits
  const [tempAddress, setTempAddress] = useState(order.deliveryAddress);
  const [tempDate, setTempDate] = useState(order.deliveryDate);
  const [tempMessage, setTempMessage] = useState(order.cardMessage);
  const [messageText, setMessageText] = useState('');
  
  const goBack = () => {
    navigate(-1);
  };
  
  const approveOrder = () => {
    setOrder(prev => ({
      ...prev,
      customerApproved: true
    }));
    toast({
      title: "Букет одобрен",
      description: "Спасибо за подтверждение! Ваш заказ готовится к доставке."
    });
  };
  
  const saveAddress = () => {
    setOrder(prev => ({
      ...prev,
      deliveryAddress: tempAddress
    }));
    setIsEditingAddress(false);
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
    setIsEditingDate(false);
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
    setIsEditingMessage(false);
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
    setIsEditingMessage(false);
    toast({
      title: "Открытка удалена",
      description: "Текст открытки успешно удален"
    });
  };
  
  const cancelOrder = () => {
    updateOrderStatus('cancelled');
    setIsConfirmingCancel(false);
    toast({
      title: "Заказ отменен",
      description: "Ваш заказ был успешно отменен"
    });
  };
  
  const sendMessage = (recipient: 'florist' | 'courier') => {
    toast({
      title: `Сообщение отправлено`,
      description: `Ваше сообщение отправлено ${recipient === 'florist' ? 'флористу' : 'курьеру'}`
    });
    setMessageText('');
    if (recipient === 'florist') {
      setIsContactingFlorist(false);
    } else {
      setIsContactingCourier(false);
    }
  };
  
  // Update order status with history
  const updateOrderStatus = (newStatus: OrderStatus, note: string = '') => {
    const statusNote = note || getDefaultStatusNote(newStatus);
    const statusUpdate = {
      status: newStatus,
      timestamp: new Date(),
      note: statusNote
    };
    
    setOrder(prev => ({
      ...prev,
      status: newStatus,
      statusHistory: [...prev.statusHistory, statusUpdate]
    }));
    
    toast({
      title: "Статус обновлен",
      description: `Заказ теперь в статусе: ${getStatusLabel(newStatus)}`
    });
  };
  
  // Get the next status in the flow
  const getNextStatus = (currentStatus: OrderStatus): OrderStatus => {
    switch(currentStatus) {
      case 'processing': return 'confirmed';
      case 'confirmed': return 'delivering';
      case 'delivering': return 'delivered';
      case 'delivered': return 'delivered'; // No next status after delivered
      case 'cancelled': return 'cancelled'; // No next status after cancelled
      default: return 'processing';
    }
  };
  
  // Get a default note for the status
  const getDefaultStatusNote = (status: OrderStatus): string => {
    switch(status) {
      case 'processing': return 'Заказ получен и обрабатывается';
      case 'confirmed': return 'Заказ подтвержден и собран';
      case 'delivering': return 'Заказ передан курьеру';
      case 'delivered': return 'Заказ успешно доставлен получателю';
      case 'cancelled': return 'Заказ отменен';
      default: return '';
    }
  };
  
  // Get a human-readable label for the status
  const getStatusLabel = (status: OrderStatus): string => {
    switch(status) {
      case 'processing': return 'Обрабатывается';
      case 'confirmed': return 'Подтвержден';
      case 'delivering': return 'В пути';
      case 'delivered': return 'Доставлен';
      case 'cancelled': return 'Отменен';
      default: return 'Неизвестный статус';
    }
  };
  
  // Get a color for the status
  const getStatusColor = (status: OrderStatus): string => {
    switch(status) {
      case 'processing': return 'bg-blue-500';
      case 'confirmed': return 'bg-yellow-500';
      case 'delivering': return 'bg-orange-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
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
      
      {/* Bouquet Preview & Approval - This is now the primary focus */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Ваш букет</h2>
        
        <div className="mb-4">
          {order.bouquetPhoto ? (
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={order.bouquetPhoto} 
                alt="Ваш букет" 
                className="w-full h-64 object-cover"
              />
              {order.customerApproved && (
                <div className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full">
                  <Check size={20} />
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
              <Image size={48} className="text-gray-300 mb-3" />
              <span className="text-gray-400">Фото букета будет доступно после сборки</span>
            </div>
          )}
        </div>
        
        {!order.customerApproved && order.bouquetPhoto && order.status !== 'cancelled' && (
          <Button 
            variant="default" 
            className="w-full mb-4"
            onClick={approveOrder}
          >
            <ThumbsUp className="mr-2" size={18} />
            Подтвердить букет
          </Button>
        )}
        
        {order.customerApproved && (
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <ThumbsUp className="text-green-500 mr-2" size={18} />
              <span className="text-green-700 font-medium">Вы подтвердили букет</span>
            </div>
          </div>
        )}
        
        {/* Florist & Courier Info */}
        {(order.status === 'confirmed' || order.status === 'delivering' || order.customerApproved) && (
          <div className="space-y-4">
            {/* Florist */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                  {order.florist.photo ? (
                    <img src={order.florist.photo} alt="Флорист" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-full h-full p-2 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">Флорист: {order.florist.name}</p>
                  <p className="text-xs text-gray-500">{order.florist.phone}</p>
                </div>
              </div>
              <div className="flex">
                <button 
                  className="p-2 text-[#4BA3E3] hover:bg-blue-50 rounded-full mr-1"
                  onClick={() => setIsContactingFlorist(true)}
                >
                  <MessageCircle size={20} />
                </button>
                <a 
                  href={`tel:${order.florist.phone}`} 
                  className="p-2 text-[#4BA3E3] hover:bg-blue-50 rounded-full"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>
            
            {/* Florist Message Form (Inline) */}
            {isContactingFlorist && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Сообщение флористу</h3>
                <textarea 
                  className="w-full h-32 border border-gray-300 rounded-md p-2 mb-3"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Введите сообщение флористу..."
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => sendMessage('florist')} 
                    disabled={!messageText.trim()}
                    size="sm"
                  >
                    Отправить
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsContactingFlorist(false)}
                    size="sm"
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            )}
            
            {/* Courier (only show when delivering) */}
            {(order.status === 'delivering' || order.status === 'delivered') && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                    {order.courier.photo ? (
                      <img src={order.courier.photo} alt="Курьер" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-full h-full p-2 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Курьер: {order.courier.name}</p>
                    <p className="text-xs text-gray-500">{order.courier.phone}</p>
                  </div>
                </div>
                <div className="flex">
                  <button 
                    className="p-2 text-[#4BA3E3] hover:bg-blue-50 rounded-full mr-1"
                    onClick={() => setIsContactingCourier(true)}
                  >
                    <MessageCircle size={20} />
                  </button>
                  <a 
                    href={`tel:${order.courier.phone}`} 
                    className="p-2 text-[#4BA3E3] hover:bg-blue-50 rounded-full"
                  >
                    <Phone size={20} />
                  </a>
                </div>
              </div>
            )}
            
            {/* Courier Message Form (Inline) */}
            {isContactingCourier && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Сообщение курьеру</h3>
                <textarea 
                  className="w-full h-32 border border-gray-300 rounded-md p-2 mb-3"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Введите сообщение курьеру..."
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => sendMessage('courier')} 
                    disabled={!messageText.trim()}
                    size="sm"
                  >
                    Отправить
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsContactingCourier(false)}
                    size="sm"
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Order Status - IMPROVED SECTION */}
      {order.status === 'cancelled' ? (
        <div className="bg-red-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-medium text-red-700">Заказ отменен</h2>
          <p className="text-sm text-red-600">
            Заказ был отменен {format(new Date(), 'dd MMMM, HH:mm', { locale: ru })}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-lg font-medium">Статус доставки</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {format(order.createdAt, 'dd MMMM yyyy', { locale: ru })}
              </span>
              <button 
                onClick={() => setShowStatusHistory(!showStatusHistory)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                aria-label={showStatusHistory ? "Скрыть историю" : "Показать историю"}
              >
                {showStatusHistory ? <X size={18} /> : <MoreHorizontal size={18} />}
              </button>
            </div>
          </div>
          
          {/* Progress Stepper */}
          <div className="relative mb-4">
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
          <p className="text-sm text-gray-600 text-center mt-4 mb-4">
            {statusStep === 0 && "Ваш заказ обрабатывается. Мы свяжемся с вами в ближайшее время."}
            {statusStep === 1 && "Ваш заказ подтвержден. Мы готовим его к отправке."}
            {statusStep === 2 && "Ваш заказ в пути. Ожидайте доставку."}
            {statusStep === 3 && "Ваш заказ доставлен. Спасибо за покупку!"}
          </p>
          
          {/* Test Button for Changing Status (ДЛЯ ТЕСТА) */}
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <Button 
              onClick={() => updateOrderStatus(getNextStatus(order.status))}
              className="w-full mb-4"
            >
              <ChevronRight size={18} className="mr-2" />
              Перейти к следующему статусу (тест)
            </Button>
          )}
          
          {/* Status History Timeline */}
          {showStatusHistory && order.statusHistory.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium mb-4">История статусов</h3>
              <div className="space-y-4">
                {order.statusHistory.map((item, index) => (
                  <div key={index} className="relative pl-8">
                    {/* Connecting line */}
                    {index < order.statusHistory.length - 1 && (
                      <div className="absolute top-6 bottom-0 left-3.5 w-0.5 bg-gray-200"></div>
                    )}
                    {/* Status dot */}
                    <div className={`absolute top-0.5 left-0 w-7 h-7 rounded-full flex items-center justify-center ${getStatusColor(item.status)} text-white`}>
                      {item.status === 'processing' && <Clock size={14} />}
                      {item.status === 'confirmed' && <Package size={14} />}
                      {item.status === 'delivering' && <Truck size={14} />}
                      {item.status === 'delivered' && <Home size={14} />}
                      {item.status === 'cancelled' && <X size={14} />}
                    </div>
                    {/* Status info */}
                    <div>
                      <p className="text-sm font-medium">{getStatusLabel(item.status)}</p>
                      <p className="text-xs text-gray-500">{format(item.timestamp, 'dd MMM yyyy, HH:mm', { locale: ru })}</p>
                      {item.note && <p className="text-xs text-gray-600 mt-1">{item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
        
        {/* Delivery Address with Inline Edit */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Адрес доставки</h3>
            {order.status !== 'cancelled' && !isEditingAddress && (
              <button 
                onClick={() => {
                  setTempAddress(order.deliveryAddress);
                  setIsEditingAddress(true);
                }}
                className="text-[#4BA3E3] hover:text-[#3A92D2] p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                aria-label="Изменить адрес"
              >
                <Edit size={16} />
              </button>
            )}
          </div>
          
          {!isEditingAddress ? (
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
          ) : (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid gap-3">
                <div>
                  <label className="text-sm font-medium">Улица, дом</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
                    value={tempAddress.street}
                    onChange={(e) => setTempAddress({...tempAddress, street: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Город</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
                    value={tempAddress.city}
                    onChange={(e) => setTempAddress({...tempAddress, city: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Подъезд</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
                      value={tempAddress.entrance}
                      onChange={(e) => setTempAddress({...tempAddress, entrance: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Этаж</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
                      value={tempAddress.floor}
                      onChange={(e) => setTempAddress({...tempAddress, floor: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Квартира/Офис</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
                      value={tempAddress.apartment}
                      onChange={(e) => setTempAddress({...tempAddress, apartment: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Домофон</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
                      value={tempAddress.intercom}
                      onChange={(e) => setTempAddress({...tempAddress, intercom: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-1">
                  <Button size="sm" onClick={saveAddress} className="gap-1">
                    <Save size={14} />
                    Сохранить
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsEditingAddress(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Delivery Date with Inline Edit */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Дата и время доставки</h3>
            {order.status !== 'cancelled' && !isEditingDate && (
              <button 
                onClick={() => {
                  setTempDate(order.deliveryDate);
                  setIsEditingDate(true);
                }}
                className="text-[#4BA3E3] hover:text-[#3A92D2] p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                aria-label="Изменить дату"
              >
                <Edit size={16} />
              </button>
            )}
          </div>
          
          {!isEditingDate ? (
            <div className="flex items-start">
              <Calendar size={18} className="text-gray-400 mr-2 mt-0.5" />
              <p className="text-sm">
                {format(order.deliveryDate, 'dd MMMM yyyy, HH:mm', { locale: ru })}
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid gap-3">
                <div>
                  <label className="text-sm font-medium">Дата</label>
                  <input 
                    type="date" 
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
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
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
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
                <div className="flex gap-2 mt-1">
                  <Button size="sm" onClick={saveDate} className="gap-1">
                    <Save size={14} />
                    Сохранить
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsEditingDate(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Card Message with Inline Edit */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Текст открытки</h3>
            {order.status !== 'cancelled' && order.cardMessage && !isEditingMessage && (
              <div className="flex">
                <button 
                  onClick={() => {
                    setTempMessage(order.cardMessage);
                    setIsEditingMessage(true);
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
          
          {!isEditingMessage ? (
            order.cardMessage ? (
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
                      setIsEditingMessage(true);
                    }}
                    className="text-[#4BA3E3] ml-2 text-sm hover:underline"
                  >
                    Добавить
                  </button>
                )}
              </div>
            )
          ) : (
            <div className="bg-blue-50 p-4 rounded-lg">
              <label className="text-sm font-medium">Текст открытки</label>
              <textarea 
                className="w-full h-32 mt-1 border border-gray-300 rounded-md p-2 text-sm"
                value={tempMessage}
                onChange={(e) => setTempMessage(e.target.value)}
                placeholder="Введите текст открытки..."
              />
              <p className="text-xs text-gray-500 mt-1 mb-3">
                Максимум 200 символов
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={saveMessage} className="gap-1">
                  <Save size={14} />
                  Сохранить
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setIsEditingMessage(false)}
                >
                  Отмена
                </Button>
              </div>
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
      
      {/* Cancellation Confirmation (Inline) */}
      {isConfirmingCancel && (
        <div className="bg-red-50 rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-medium mb-3 text-red-800">Подтверждение отмены заказа</h3>
          <p className="text-sm text-red-700 mb-4">
            Вы уверены, что хотите отменить заказ? Это действие невозможно отменить.
          </p>
          <div className="flex gap-3">
            <Button 
              variant="destructive" 
              onClick={cancelOrder}
              size="sm"
            >
              Да, отменить заказ
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsConfirmingCancel(false)}
              size="sm"
            >
              Нет, вернуться
            </Button>
          </div>
        </div>
      )}
      
      {/* Actions */}
      {order.status !== 'cancelled' && order.status !== 'delivered' && !isConfirmingCancel && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={() => setIsConfirmingCancel(true)}
          >
            Отменить заказ
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
