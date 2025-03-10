
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CreditCard, MapPin, Archive, LogOut, ChevronRight, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileAddresses from '@/components/profile/ProfileAddresses';
import ProfilePaymentMethods from '@/components/profile/ProfilePaymentMethods';
import ProfileOrderHistory from '@/components/profile/ProfileOrderHistory';
import ProfileInfo from '@/components/profile/ProfileInfo';

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-3"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-medium">Личный кабинет</h1>
          </div>
        </div>
      </div>

      {/* User Info Card */}
      <div className="container max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Иван Иванов</h2>
              <p className="text-gray-500">+7 (123) 456-78-90</p>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-4 bg-white rounded-xl p-1">
            <TabsTrigger 
              value="info" 
              className="rounded-lg data-[state=active]:bg-[#F3F3F3] data-[state=active]:text-black"
            >
              <div className="flex flex-col items-center py-1">
                <User className="h-5 w-5 mb-1" />
                <span className="text-xs">Профиль</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="addresses" 
              className="rounded-lg data-[state=active]:bg-[#F3F3F3] data-[state=active]:text-black"
            >
              <div className="flex flex-col items-center py-1">
                <MapPin className="h-5 w-5 mb-1" />
                <span className="text-xs">Адреса</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="payments" 
              className="rounded-lg data-[state=active]:bg-[#F3F3F3] data-[state=active]:text-black"
            >
              <div className="flex flex-col items-center py-1">
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-xs">Оплата</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="orders" 
              className="rounded-lg data-[state=active]:bg-[#F3F3F3] data-[state=active]:text-black"
            >
              <div className="flex flex-col items-center py-1">
                <Archive className="h-5 w-5 mb-1" />
                <span className="text-xs">Заказы</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="bg-white rounded-xl p-4 shadow-sm">
            <ProfileInfo />
          </TabsContent>

          <TabsContent value="addresses" className="bg-white rounded-xl p-4 shadow-sm">
            <ProfileAddresses />
          </TabsContent>

          <TabsContent value="payments" className="bg-white rounded-xl p-4 shadow-sm">
            <ProfilePaymentMethods />
          </TabsContent>

          <TabsContent value="orders" className="bg-white rounded-xl p-4 shadow-sm">
            <ProfileOrderHistory />
          </TabsContent>
        </Tabs>

        {/* Logout Button */}
        <button className="mt-6 w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm text-red-500">
          <div className="flex items-center">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Выйти</span>
          </div>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
