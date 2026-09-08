import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JobProvider } from "@/context/JobContext";
import Index from "./pages/Index";
import JobDetail from "./pages/JobDetail";
import Dashboard from "./pages/employer/Dashboard";
import PostJob from "./pages/employer/PostJob";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <JobProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/employer/dashboard" element={<Dashboard />} />
            <Route path="/employer/post-job" element={<PostJob />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </JobProvider>
  </QueryClientProvider>
);

export default App;
