
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ProfileInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (123) 456-78-90',
    birthday: '1990-01-01',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Профиль обновлен');
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Личные данные</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">ФИО</Label>
          <Input 
            id="name" 
            name="name" 
            value={userInfo.name} 
            onChange={handleChange} 
            placeholder="Введите ваше имя"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={userInfo.email} 
            onChange={handleChange} 
            placeholder="Введите ваш email"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input 
            id="phone" 
            name="phone" 
            value={userInfo.phone} 
            onChange={handleChange} 
            placeholder="Введите ваш телефон"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birthday">Дата рождения</Label>
          <Input 
            id="birthday" 
            name="birthday" 
            type="date" 
            value={userInfo.birthday} 
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Примечания к заказам</Label>
          <Textarea 
            id="notes" 
            name="notes" 
            value={userInfo.notes} 
            onChange={handleChange} 
            placeholder="Например: звонить перед доставкой"
            className="min-h-[100px]"
          />
        </div>
        
        <Button type="submit" className="w-full">Сохранить изменения</Button>
      </form>
    </div>
  );
};

export default ProfileInfo;
