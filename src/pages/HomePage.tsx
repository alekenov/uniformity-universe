
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CategorySelector from '@/components/CategorySelector';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AddressInput from '@/components/home/AddressInput';
import ShopList from '@/components/home/ShopList';
import { shopsWithCoordinates, calculateDistance } from '@/data/shopData';

const HomePage: React.FC = () => {
  const [address, setAddress] = useState('');
  const [shops, setShops] = useState(shopsWithCoordinates);
  const [selectedShop, setSelectedShop] = useState<number | null>(null);
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleShopClick = (shopId: number) => {
    navigate(`/flower-shop?id=${shopId}`);
  };

  const handleAddressSubmit = (addressValue: string) => {
    setAddress(addressValue);
    setShowCategorySelector(true);
  };

  const handleCategorySelected = (mainCategory: string, subCategory: string) => {
    // Store the address and category information
    localStorage.setItem('deliveryAddress', address);
    localStorage.setItem('selectedMainCategory', mainCategory);
    localStorage.setItem('selectedSubCategory', subCategory);
    
    // Navigate to flower shop with category parameters
    navigate(`/flower-shop?category=${mainCategory}&subcategory=${subCategory}`);
  };

  const handleLocationFound = (lat: number, lng: number) => {
    // Sort shops by distance from the user
    const shopsWithDistance = shops.map(shop => ({
      ...shop,
      distance: calculateDistance(lat, lng, shop.coordinates.lat, shop.coordinates.lng)
    }));
    
    // Sort shops by distance
    const sortedShops = [...shopsWithDistance].sort((a, b) => {
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;
      return a.distance - b.distance;
    });
    
    setShops(sortedShops);
    
    // Auto-scroll to shops section
    document.getElementById('shops-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Свежие цветы с доставкой
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Доставляем букеты из ближайшего к вам цветочного магазина за 1-2 часа
          </p>
        </div>

        {/* Address Input or Category Selector */}
        {!showCategorySelector ? (
          <div className="max-w-xl mx-auto mb-16">
            <AddressInput 
              onAddressSubmit={handleAddressSubmit}
              onLocationFound={handleLocationFound}
            />
          </div>
        ) : (
          <div className="max-w-xl mx-auto mb-16">
            <CategorySelector onCategorySelected={handleCategorySelected} />
            <Button 
              variant="outline" 
              onClick={() => setShowCategorySelector(false)}
              className="w-full"
            >
              Изменить адрес доставки
            </Button>
          </div>
        )}

        {/* Flower Shops Section */}
        <ShopList shops={shops} onShopClick={handleShopClick} />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
