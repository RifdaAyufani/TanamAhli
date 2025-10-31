import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideCart from "./components/SideCart";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Klinik from "./pages/Klinik";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import ProductListing from "./pages/ProductListing";
import Wizard from "./pages/Wizard";
import WizardRecommendations from "./pages/WizardRecommendations";
import Diagnosis from "./pages/Diagnosis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header
          currentPath={location.pathname}
          onCartClick={() => setIsCartOpen(true)}
        />
        <SideCart isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/klinik" element={<Klinik />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route
              path="/wizard/recommendations"
              element={<WizardRecommendations />}
            />
            <Route path="/category/:categoryId" element={<ProductListing />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/diagnosis/:symptomId" element={<Diagnosis />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
