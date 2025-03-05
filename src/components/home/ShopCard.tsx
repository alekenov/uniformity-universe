
import React from 'react';
import { Star, Clock } from 'lucide-react';

interface ShopCardProps {
  shop: {
    id: number;
    name: string;
    address: string;
    rating: number;
    deliveryTime: string;
    image: string;
    distance?: number | null;
  };
  onClick: (shopId: number) => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, onClick }) => {
  return (
    <div 
      className="bg-white rounded-md shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(shop.id)}
    >
      <div className="aspect-[3/2] relative">
        <img 
          src={shop.image} 
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        {shop.distance !== null && shop.distance !== undefined && (
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full">
            {shop.distance.toFixed(1)} км
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="font-medium text-sm mb-0.5 truncate">{shop.name}</h3>
        <p className="text-gray-500 text-xs mb-1.5 truncate">{shop.address}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star size={12} className="text-yellow-400 mr-0.5" />
            <span className="text-xs font-medium">{shop.rating}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock size={12} className="mr-0.5" />
            <span className="text-[10px]">{shop.deliveryTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
