
import React from 'react';
import { X, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const CartPanel: React.FC = () => {
  const { 
    cartItems, 
    isCartPanelOpen, 
    setCartPanelOpen, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCart();

  if (!isCartPanelOpen || cartItems.length === 0) {
    return null;
  }

  const total = getCartTotal();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setCartPanelOpen(false)}
      />
      <div className="relative z-10 bg-white rounded-t-xl shadow-lg max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <span className="font-medium">Корзина</span>
            <span className="text-sm text-gray-500">({cartItems.length})</span>
          </div>
          <button 
            onClick={() => setCartPanelOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-4 flex-grow">
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <div className="font-medium text-sm">{item.name}</div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-2">{item.shopName}</div>
                  
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{item.price} ₸</div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          item.quantity > 1 ? "bg-gray-200 text-gray-700" : "bg-gray-100 text-gray-400"
                        )}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      
                      <span className="w-6 text-center">{item.quantity}</span>
                      
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-700"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Итого:</span>
            <span className="font-medium text-lg">{total} ₸</span>
          </div>
          
          <Link to="/cart">
            <Button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED]">
              Оформить заказ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
