
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

const ProfileOrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState<Order[]>([
    { id: '12345', date: '12.05.2023', status: 'delivered', total: 2890, items: 3 },
    { id: '12346', date: '24.04.2023', status: 'delivered', total: 1540, items: 1 },
    { id: '12347', date: '15.04.2023', status: 'cancelled', total: 3200, items: 2 },
    { id: '12348', date: '01.04.2023', status: 'delivered', total: 4100, items: 4 }
  ]);

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'В обработке';
      case 'delivered':
        return 'Доставлен';
      case 'cancelled':
        return 'Отменен';
      default:
        return '';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'text-amber-600';
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return '';
    }
  };

  const handleOrderClick = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">История заказов</h3>

      {orders.length > 0 ? (
        <div className="space-y-3">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
              onClick={() => handleOrderClick(order.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">№{order.id}</span>
                    <span className="text-sm text-gray-500">от {order.date}</span>
                  </div>
                  <div className="mt-1">
                    <span className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      {order.items} {order.items === 1 ? 'товар' : order.items < 5 ? 'товара' : 'товаров'}
                    </span>
                  </div>
                  <div className="mt-1 font-medium">
                    {order.total} ₽
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">У вас пока нет заказов</p>
          <Button 
            variant="outline" 
            className="mt-3"
            onClick={() => navigate('/flower-shop')}
          >
            Перейти в магазин
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileOrderHistory;
