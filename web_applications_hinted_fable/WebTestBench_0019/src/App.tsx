import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ForumProvider } from "@/context/ForumContext";
import HomePage from "@/pages/HomePage";
import ThreadPage from "@/pages/ThreadPage";
import NewThreadPage from "@/pages/NewThreadPage";
import CategoryPage from "@/pages/CategoryPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ForumProvider>
          <Toaster position="top-right" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/thread/:id" element={<ThreadPage />} />
              <Route path="/new-thread" element={<NewThreadPage />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ForumProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
