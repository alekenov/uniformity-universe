
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Flower, 
  Cake, 
  ShoppingBag, 
  Gift, 
  ChevronRight, 
  ArrowLeft 
} from 'lucide-react';

// Define category types
type MainCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories: Subcategory[];
};

type Subcategory = {
  id: string;
  name: string;
};

// Sample category data
const categories: MainCategory[] = [
  {
    id: 'flowers',
    name: 'Цветы',
    icon: <Flower />,
    subcategories: [
      { id: 'bouquets', name: 'Букеты' },
      { id: 'compositions', name: 'Композиции' },
      { id: 'single-flowers', name: 'Одиночные цветы' },
      { id: 'wedding', name: 'Свадебные букеты' },
      { id: 'plants', name: 'Комнатные растения' },
    ]
  },
  {
    id: 'sweets',
    name: 'Кондитерские изделия',
    icon: <Cake />,
    subcategories: [
      { id: 'cakes', name: 'Торты' },
      { id: 'cupcakes', name: 'Капкейки' },
      { id: 'cookies', name: 'Печенье' },
      { id: 'chocolate', name: 'Шоколад' },
      { id: 'pastry', name: 'Выпечка' },
    ]
  },
  {
    id: 'gifts',
    name: 'Подарки',
    icon: <Gift />,
    subcategories: [
      { id: 'gift-baskets', name: 'Подарочные корзины' },
      { id: 'souvenirs', name: 'Сувениры' },
      { id: 'greeting-cards', name: 'Открытки' },
      { id: 'perfumes', name: 'Парфюмерия' },
    ]
  },
  {
    id: 'groceries',
    name: 'Продукты',
    icon: <ShoppingBag />,
    subcategories: [
      { id: 'fruits', name: 'Фрукты' },
      { id: 'vegetables', name: 'Овощи' },
      { id: 'dairy', name: 'Молочные продукты' },
      { id: 'meat', name: 'Мясо и птица' },
      { id: 'bakery', name: 'Хлебобулочные изделия' },
    ]
  },
];

interface CategorySelectorProps {
  onCategorySelected: (main: string, sub: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategorySelected }) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  
  const handleMainCategoryClick = (categoryId: string) => {
    setSelectedMainCategory(categoryId);
    setShowSubcategories(true);
  };
  
  const handleSubcategoryClick = (subcategoryId: string) => {
    if (selectedMainCategory) {
      onCategorySelected(selectedMainCategory, subcategoryId);
      // Reset state after selection
      setSelectedMainCategory(null);
      setShowSubcategories(false);
    }
  };
  
  const handleBackClick = () => {
    setShowSubcategories(false);
  };
  
  const selectedCategory = categories.find(cat => cat.id === selectedMainCategory);
  
  return (
    <div className="panel p-4 bg-white rounded-lg shadow-sm mb-8">
      {!showSubcategories ? (
        <>
          <h2 className="text-xl font-medium mb-4">Выберите категорию</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleMainCategoryClick(category.id)}
                className="flex flex-col items-center p-4 border rounded-lg hover:bg-secondary hover:border-primary transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-primary">
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackClick}
              className="mr-2 p-1 h-8 w-8"
            >
              <ArrowLeft size={18} />
            </Button>
            <h2 className="text-xl font-medium">
              {selectedCategory?.name}
            </h2>
          </div>
          <div className="space-y-2">
            {selectedCategory?.subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() => handleSubcategoryClick(subcategory.id)}
                className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-secondary hover:border-primary transition-all"
              >
                <span className="font-medium">{subcategory.name}</span>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySelector;
