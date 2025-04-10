
import { useState, useEffect } from 'react';
import { Store } from '@/types/cart';
import { useToast } from '@/hooks/use-toast';

export interface StoreAddressState {
  street: string;
  city: string;
  entrance: string;
  apartment: string;
  floor: string;
  intercom: string;
  courierComment: string;
  askRecipientForAddress: boolean;
  showCourierComment: boolean;
}

interface UseStoreAddressesProps {
  stores: Store[];
  activeStoreId: string;
  initialCity: string;
  onUpdateStoreAddress: (storeId: string, address: Store['address']) => void;
}

export const useStoreAddresses = ({
  stores,
  activeStoreId,
  initialCity,
  onUpdateStoreAddress
}: UseStoreAddressesProps) => {
  const { toast } = useToast();
  const [storeAddresses, setStoreAddresses] = useState<Record<string, StoreAddressState>>({});
  const [selectedCity, setSelectedCity] = useState(initialCity);

  // Initialize store addresses
  useEffect(() => {
    const newStoreAddresses: Record<string, StoreAddressState> = { ...storeAddresses };
    
    stores.forEach(store => {
      if (!newStoreAddresses[store.id]) {
        newStoreAddresses[store.id] = {
          street: store.address?.street || '',
          city: store.address?.city || selectedCity,
          entrance: store.address?.entrance || '',
          apartment: store.address?.apartment || '',
          floor: store.address?.floor || '',
          intercom: store.address?.intercom || '',
          courierComment: '',
          askRecipientForAddress: false,
          showCourierComment: false,
        };
      }
    });
    
    setStoreAddresses(newStoreAddresses);
  }, [stores, selectedCity]);

  const handleAddressChange = (storeId: string, field: keyof StoreAddressState, value: string | boolean) => {
    setStoreAddresses(prev => {
      const updatedStore = { ...prev[storeId] };
      
      // Type assertion to handle both string and boolean values
      if (typeof value === 'boolean') {
        (updatedStore[field] as boolean) = value;
      } else {
        (updatedStore[field] as string) = value;
      }
      
      return {
        ...prev,
        [storeId]: updatedStore
      };
    });
    
    // Update store address in parent component
    if (['street', 'city', 'entrance', 'apartment', 'floor', 'intercom'].includes(field)) {
      const storeAddress = storeAddresses[storeId];
      
      onUpdateStoreAddress(storeId, {
        street: field === 'street' ? value as string : storeAddress.street,
        city: field === 'city' ? value as string : storeAddress.city,
        entrance: field === 'entrance' ? value as string : storeAddress.entrance,
        apartment: field === 'apartment' ? value as string : storeAddress.apartment,
        floor: field === 'floor' ? value as string : storeAddress.floor,
        intercom: field === 'intercom' ? value as string : storeAddress.intercom
      });
    }
  };
  
  const toggleCourierComment = (storeId: string) => {
    setStoreAddresses(prev => ({
      ...prev,
      [storeId]: {
        ...prev[storeId],
        showCourierComment: !prev[storeId].showCourierComment
      }
    }));
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    
    // Update city for all store addresses
    Object.keys(storeAddresses).forEach(storeId => {
      handleAddressChange(storeId, 'city', city);
    });
    
    toast({
      title: "Город изменен",
      description: "Обратите внимание, что ассортимент и цены могут отличаться в разных городах",
    });
  };

  const getActiveAddress = () => {
    return storeAddresses[activeStoreId] || {
      street: '',
      city: selectedCity,
      entrance: '',
      apartment: '',
      floor: '',
      intercom: '',
      courierComment: '',
      askRecipientForAddress: false,
      showCourierComment: false,
    };
  };

  return {
    storeAddresses,
    selectedCity,
    handleAddressChange,
    toggleCourierComment,
    handleCityChange,
    getActiveAddress
  };
};
