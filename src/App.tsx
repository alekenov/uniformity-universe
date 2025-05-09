
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AddressSelection from "./pages/AddressSelection";
import FlowerShop from "./pages/FlowerShop";
import ProductDetail from "./pages/ProductDetail";
import HomePage from "./pages/HomePage";
import OrderStatus from "./pages/OrderStatus";
import { CartProvider } from "./contexts/CartContext";
import CartPanel from "./components/CartPanel";
import UserProfile from "./pages/UserProfile";
import DesignSystem from "./pages/DesignSystem";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<Index />} />
            <Route path="/cart" element={<Navigate to="/checkout" replace />} />
            <Route path="/address-selection" element={<AddressSelection />} />
            <Route path="/flower-shop" element={<FlowerShop />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/order/:orderId" element={<OrderStatus />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/design-system" element={<DesignSystem />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CartPanel />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
