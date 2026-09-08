import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReservationProvider } from "@/context/ReservationContext";
import Index from "./pages/Index";
import RestaurantDetail from "./pages/RestaurantDetail";
import MyReservations from "./pages/MyReservations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ReservationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/reservations" element={<MyReservations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ReservationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
