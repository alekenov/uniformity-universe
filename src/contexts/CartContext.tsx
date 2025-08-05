
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  shopId: string;
  shopName: string;
}

interface CartContextType {
  cartItems: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  isCartPanelOpen: boolean;
  setCartPanelOpen: (isOpen: boolean) => void;
  isDrawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = (product: CartProduct) => {
    setCartItems(prev => {
      // Check if product already exists in cart
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Product exists, update quantity
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += product.quantity;
        
        toast({
          title: "Товар добавлен в корзину",
          description: `${product.name} (${product.quantity} шт)`,
        });
        
        return newItems;
      } else {
        // Product doesn't exist, add new item
        toast({
          title: "Товар добавлен в корзину",
          description: product.name,
        });
        
        return [...prev, product];
      }
    });
    
    // Open cart panel when adding items
    setIsCartPanelOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    
    toast({
      title: "Товар удален из корзины",
      description: "Товар был удален из вашего заказа",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Корзина очищена",
      description: "Все товары были удалены из корзины",
    });
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const setCartPanelOpen = (isOpen: boolean) => {
    setIsCartPanelOpen(isOpen);
  };

  const setDrawerOpen = (isOpen: boolean) => {
    console.log('[CartContext] Setting drawer open:', isOpen);
    setIsDrawerOpen(isOpen);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        getCartCount,
        getCartTotal,
        isCartPanelOpen,
        setCartPanelOpen,
        isDrawerOpen,
        setDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
