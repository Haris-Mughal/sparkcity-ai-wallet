import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Offers from "./pages/Offers";
import Checkout from "./pages/Checkout";
import Wallet from "./pages/Wallet";
import Privacy from "./pages/Privacy";
import Merchant from "./pages/Merchant";
import MerchantControls from "./pages/MerchantControls";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/merchant" element={<Merchant />} />
          <Route path="/merchant/controls" element={<MerchantControls />} />
          <Route path="/merchant/analytics" element={<Analytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
