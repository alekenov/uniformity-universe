
import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  entrance?: string;
  apartment?: string;
  floor?: string;
  isDefault: boolean;
}

const ProfileAddresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Дом',
      street: 'ул. Пушкина, д. 10',
      city: 'Москва',
      entrance: '2',
      apartment: '42',
      floor: '4',
      isDefault: true
    },
    {
      id: '2',
      name: 'Работа',
      street: 'пр. Ленина, д. 15',
      city: 'Москва',
      entrance: '1',
      apartment: '301',
      floor: '3',
      isDefault: false
    }
  ]);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
    name: '',
    street: '',
    city: 'Москва',
    entrance: '',
    apartment: '',
    floor: ''
  });

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress({
      name: address.name,
      street: address.street,
      city: address.city,
      entrance: address.entrance || '',
      apartment: address.apartment || '',
      floor: address.floor || ''
    });
    setIsAddressDialogOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(address => address.id !== id));
    toast.success('Адрес удален');
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(prev => 
      prev.map(address => ({
        ...address,
        isDefault: address.id === id
      }))
    );
    toast.success('Адрес по умолчанию изменен');
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressSave = () => {
    if (!newAddress.name || !newAddress.street) {
      toast.error('Заполните обязательные поля');
      return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(prev => 
        prev.map(address => 
          address.id === editingAddress.id 
            ? { ...address, ...newAddress } 
            : address
        )
      );
      toast.success('Адрес обновлен');
    } else {
      // Add new address
      const newId = Date.now().toString();
      setAddresses(prev => [
        ...prev, 
        { 
          ...newAddress, 
          id: newId, 
          isDefault: addresses.length === 0 
        }
      ]);
      toast.success('Адрес добавлен');
    }

    // Reset form
    setNewAddress({
      name: '',
      street: '',
      city: 'Москва',
      entrance: '',
      apartment: '',
      floor: ''
    });
    setEditingAddress(null);
    setIsAddressDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Адреса доставки</h3>
        <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => {
                setEditingAddress(null);
                setNewAddress({
                  name: '',
                  street: '',
                  city: 'Москва',
                  entrance: '',
                  apartment: '',
                  floor: ''
                });
              }}
            >
              <Plus className="h-4 w-4" />
              <span>Добавить</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? 'Редактировать адрес' : 'Добавить новый адрес'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название адреса</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={newAddress.name} 
                  onChange={handleAddressChange} 
                  placeholder="Например: Дом, Работа"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Город</Label>
                <Input 
                  id="city" 
                  name="city" 
                  value={newAddress.city} 
                  onChange={handleAddressChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Улица, дом</Label>
                <Input 
                  id="street" 
                  name="street" 
                  value={newAddress.street} 
                  onChange={handleAddressChange} 
                  placeholder="Например: ул. Пушкина, д. 10"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="entrance">Подъезд</Label>
                  <Input 
                    id="entrance" 
                    name="entrance" 
                    value={newAddress.entrance} 
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apartment">Квартира</Label>
                  <Input 
                    id="apartment" 
                    name="apartment" 
                    value={newAddress.apartment} 
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor">Этаж</Label>
                  <Input 
                    id="floor" 
                    name="floor" 
                    value={newAddress.floor} 
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
            </div>
            <Button onClick={handleAddressSave}>
              {editingAddress ? 'Обновить' : 'Добавить'} адрес
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length > 0 ? (
        <div className="space-y-3">
          {addresses.map((address) => (
            <div 
              key={address.id} 
              className={`p-4 rounded-xl border ${address.isDefault ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <MapPin className={`h-5 w-5 mt-0.5 ${address.isDefault ? 'text-primary' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-medium">{address.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{address.street}</div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {[
                        address.apartment && `кв. ${address.apartment}`,
                        address.entrance && `подъезд ${address.entrance}`,
                        address.floor && `этаж ${address.floor}`
                      ].filter(Boolean).join(', ')}
                    </div>
                    {!address.isDefault && (
                      <button 
                        className="mt-2 text-xs text-primary underline"
                        onClick={() => handleSetDefaultAddress(address.id)}
                      >
                        Сделать основным
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => handleEditAddress(address)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">У вас пока нет сохраненных адресов</p>
          <Button 
            variant="outline" 
            className="mt-3"
            onClick={() => setIsAddressDialogOpen(true)}
          >
            Добавить адрес
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileAddresses;
