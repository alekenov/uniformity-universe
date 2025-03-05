import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Все' },
  { id: 'bouquets', name: 'Букеты' },
  { id: 'flowers-by-piece', name: 'Цветы поштучно' },
  { id: 'gifts', name: 'Подарки' },
  { id: 'pots', name: 'Цветы в горшках' },
];

const FlowerShop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-medium">Flower Shop</h1>
        </div>
      </header>
      
      <main className="container max-w-3xl mx-auto px-4 py-4">
        <div className="panel mb-4">
          <h2 className="text-lg font-medium mb-3">Быстрый заказ цветов рядом с вами</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex-shrink-0 py-2 px-3 rounded-full border cursor-pointer ${
                  selectedCategory === category.id
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="border rounded-lg p-2">
              <div className="aspect-w-3 aspect-h-4 relative overflow-hidden rounded-lg mb-2">
                <img
                  src="https://images.unsplash.com/photo-1503919502252-c329916d674f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
                  alt=""
                  className="object-cover w-full h-full absolute top-0 left-0"
                />
              </div>
              <div className="text-sm">
                <div className="font-medium">$24</div>
                <div className="text-gray-500">Rose</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FlowerShop;
