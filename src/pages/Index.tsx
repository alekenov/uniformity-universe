
import React, { useState, useEffect } from 'react';
import CheckoutContainer from '@/components/checkout/CheckoutContainer';
import { Product, Store } from '@/types/cart';

const initialProducts = [
  // Store 1: Цветочный Рай
  {
    id: '1',
    name: 'Букет "Нежная весна" из розовых тюльпанов',
    description: '15 шт',
    price: 15900,
    oldPrice: 19900,
    quantity: 1,
    image: 'https://avatars.mds.yandex.net/get-eda/371306/2f0969b0bd0c397c78ec42a34c36a16a/orig',
    storeId: 'store1',
    storeName: 'Цветочный Рай'
  },
  {
    id: '2',
    name: 'Букет "Солнечный день" из желтых роз',
    description: '11 шт',
    price: 17900,
    oldPrice: 22400,
    quantity: 1,
    image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
    storeId: 'store1',
    storeName: 'Цветочный Рай'
  },
  
  // Store 2: METRO
  {
    id: '3',
    name: 'Сыр "Пармезан" выдержанный 24 месяца',
    description: 'Италия, 250 г',
    price: 12900,
    oldPrice: 14500,
    quantity: 1,
    image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
    storeId: 'store2',
    storeName: 'METRO'
  },
  {
    id: '4',
    name: 'Виноград красный "Кишмиш"',
    description: 'Узбекистан, 1 кг',
    price: 8800,
    quantity: 1,
    image: 'https://avatars.mds.yandex.net/get-eda/371306/2f0969b0bd0c397c78ec42a34c36a16a/orig',
    storeId: 'store2',
    storeName: 'METRO'
  },
  
  // Store 3: Аптека 36.6
  {
    id: '5',
    name: 'Витамин C',
    description: '60 таблеток',
    price: 3900,
    quantity: 1,
    image: 'https://avatars.mds.yandex.net/get-eda/371306/2f0969b0bd0c397c78ec42a34c36a16a/orig',
    storeId: 'store3',
    storeName: 'Аптека 36.6'
  },
  {
    id: '6',
    name: 'Ибупрофен',
    description: '20 таблеток',
    price: 2400,
    quantity: 1,
    image: 'https://avatars.mds.yandex.net/get-eda/3735388/b59c7629ff7e50c3b198494f4d9d3fe4/orig',
    storeId: 'store3',
    storeName: 'Аптека 36.6'
  }
];

const Index: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [stores, setStores] = useState<Store[]>([]);
  const [activeStoreId, setActiveStoreId] = useState<string>('');

  // Group products by store
  useEffect(() => {
    const storeMap: Record<string, Store> = {};
    
    products.forEach(product => {
      const storeId = product.storeId || 'unknown';
      const storeName = product.storeName || 'Магазин';
      
      if (!storeMap[storeId]) {
        storeMap[storeId] = {
          id: storeId,
          name: storeName,
          status: 'Открыто',
          total: 0,
          products: [],
          address: {
            street: '',
            city: 'Нур-Султан',
          }
        };
      }
      
      storeMap[storeId].products.push(product);
      storeMap[storeId].total += product.price * product.quantity;
    });
    
    const storeArray = Object.values(storeMap);
    setStores(storeArray);
    
    // Set active store to first store if not set or if current active store no longer exists
    if (!activeStoreId || !storeMap[activeStoreId]) {
      setActiveStoreId(storeArray.length > 0 ? storeArray[0].id : '');
    }
  }, [products, activeStoreId]);

  const handleStoreChange = (storeId: string) => {
    setActiveStoreId(storeId);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity === 0) {
      setProducts(products.filter(product => product.id !== id));
    } else {
      setProducts(products.map(product => 
        product.id === id ? { ...product, quantity } : product
      ));
    }
  };

  const updateStoreAddress = (storeId: string, address: Store['address']) => {
    setStores(prevStores => 
      prevStores.map(store => 
        store.id === storeId ? { ...store, address } : store
      )
    );
  };

  return (
    <CheckoutContainer 
      products={products}
      setProducts={setProducts}
      stores={stores}
      activeStoreId={activeStoreId}
      onStoreChange={handleStoreChange}
      onQuantityChange={handleQuantityChange}
      onUpdateStoreAddress={updateStoreAddress}
    />
  );
};

export default Index;
