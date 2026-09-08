import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookkeepingProvider } from "@/context/BookkeepingContext";
import Index from "./pages/Index";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Reports from "./pages/Reports";
import TaxSummary from "./pages/TaxSummary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BookkeepingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/tax-summary" element={<TaxSummary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BookkeepingProvider>
  </QueryClientProvider>
);

export default App;
