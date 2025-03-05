
import React from 'react';
import ShopCard from './ShopCard';

interface Shop {
  id: number;
  name: string;
  address: string;
  rating: number;
  deliveryTime: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance: number | null;
}

interface ShopListProps {
  shops: Shop[];
  onShopClick: (shopId: number) => void;
}

const ShopList: React.FC<ShopListProps> = ({ shops, onShopClick }) => {
  return (
    <div className="mb-16" id="shops-section">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Популярные цветочные магазины</h2>
        <div className="text-sm text-gray-500">
          {shops[0]?.distance !== null && "Отсортировано по расстоянию"}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {shops.map((shop) => (
          <div key={shop.id}>
            <ShopCard shop={shop} onClick={onShopClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopList;
