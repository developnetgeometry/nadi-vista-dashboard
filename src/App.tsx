import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Finance from "./pages/Finance";
import Membership from "./pages/Membership";
import SmartServices from "./pages/SmartServices";
import Operation from "./pages/Operation";
import Takwim from "./pages/Takwim";
import Claim from "./pages/Claim";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/finance" element={<DashboardLayout><Finance /></DashboardLayout>} />
          <Route path="/membership" element={<DashboardLayout><Membership /></DashboardLayout>} />
          <Route path="/smart-services" element={<DashboardLayout><SmartServices /></DashboardLayout>} />
          <Route path="/operation" element={<DashboardLayout><Operation /></DashboardLayout>} />
          <Route path="/takwim" element={<DashboardLayout><Takwim /></DashboardLayout>} />
          <Route path="/claim" element={<DashboardLayout><Claim /></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
