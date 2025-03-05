
// Sample flower shops data
export const flowerShops = [
  {
    id: 1,
    name: 'Цветочный Рай',
    address: 'ул. Ленина, 42',
    rating: 4.8,
    deliveryTime: '30-40 мин',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Букет Столицы',
    address: 'ул. Пушкина, 10',
    rating: 4.7,
    deliveryTime: '40-50 мин',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Флорист и Я',
    address: 'пр. Мира, 15',
    rating: 4.9,
    deliveryTime: '20-30 мин',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Твой Букет',
    address: 'ул. Гагарина, 23',
    rating: 4.6,
    deliveryTime: '35-45 мин',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Цветочная Лавка',
    address: 'ул. Достоевского, 8',
    rating: 4.7,
    deliveryTime: '25-35 мин',
    image: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'Розовый Сад',
    address: 'ул. Чехова, 33',
    rating: 4.5,
    deliveryTime: '45-55 мин',
    image: '/placeholder.svg'
  },
  {
    id: 7,
    name: 'Цветы от Ольги',
    address: 'пр. Победы, 12',
    rating: 4.8,
    deliveryTime: '30-45 мин',
    image: '/placeholder.svg'
  },
  {
    id: 8,
    name: 'ФлораМаркет',
    address: 'ул. Тургенева, 5',
    rating: 4.9,
    deliveryTime: '20-35 мин',
    image: '/placeholder.svg'
  },
];

// Calculate distance between two coordinates
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
};

// Add coordinates to shops (mock data)
export const shopsWithCoordinates = flowerShops.map(shop => ({
  ...shop,
  coordinates: {
    lat: 55.7 + (Math.random() * 0.1), // Mock coordinates around Moscow
    lng: 37.6 + (Math.random() * 0.1)
  },
  distance: null as number | null
}));
