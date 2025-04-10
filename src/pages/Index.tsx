
import React, { useState } from 'react';
import CheckoutContainer from '@/components/checkout/CheckoutContainer';
import { Product } from '@/types/cart';

const initialProducts = [
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
];

const Index: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <CheckoutContainer 
      products={products}
      setProducts={setProducts}
    />
  );
};

export default Index;
