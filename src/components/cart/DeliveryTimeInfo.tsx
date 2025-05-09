
import React from 'react';
import { Clock, Store } from 'lucide-react';

interface DeliveryTimeInfoProps {
  deliveryMethod: 'delivery' | 'pickup';
}

const DeliveryTimeInfo: React.FC<DeliveryTimeInfoProps> = ({ deliveryMethod }) => {
  if (deliveryMethod === 'delivery') {
    return (
      <div className="bg-green-50 p-3 rounded-md mb-4 flex items-center">
        <Clock size={18} className="text-green-600 mr-2" />
        <div>
          <p className="text-sm text-green-800 font-medium">Доставка через 40-60 минут</p>
          <p className="text-xs text-green-700">Ближайший слот доставки сегодня 12:00-14:00</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-blue-50 p-3 rounded-md mb-4 flex items-center">
      <Store size={18} className="text-blue-600 mr-2" />
      <div>
        <p className="text-sm text-blue-800 font-medium">Самовывоз сегодня</p>
        <p className="text-xs text-blue-700">Заказ будет готов через 30-40 минут</p>
      </div>
    </div>
  );
};

export default DeliveryTimeInfo;
