import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { SSODashboardLayout } from "./components/layout/SSODashboardLayout";
import { StaffDashboardLayout } from "./components/layout/StaffDashboardLayout";
import { TPDashboardLayout } from "./components/layout/TPDashboardLayout";
import Home from "./pages/Home";
import Finance from "./pages/Finance";
import Membership from "./pages/Membership";
import SmartServices from "./pages/SmartServices";
import Operation from "./pages/Operation";
import Takwim from "./pages/Takwim";
import Claim from "./pages/Claim";
import SSODashboard from "./pages/SSODashboard";
import SSOTakwim from "./pages/SSOTakwim";
import SSOEventOverview from "./pages/SSOEventOverview";
import SSOParticipantStats from "./pages/SSOParticipantStats";
import SSOEventBreakdown from "./pages/SSOEventBreakdown";
import StaffHome from "./pages/StaffHome";
import TPHome from "./pages/TPHome";
import TPMembership from "./pages/TPMembership";
import TPSmartServices from "./pages/TPSmartServices";
import TPOperation from "./pages/TPOperation";
import TPTakwim from "./pages/TPTakwim";
import TPClaim from "./pages/TPClaim";
import TPFinance from "./pages/TPFinance";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<DashboardLayout><Home /></DashboardLayout>} />
            <Route path="/finance" element={<DashboardLayout><Finance /></DashboardLayout>} />
            <Route path="/membership" element={<DashboardLayout><Membership /></DashboardLayout>} />
            <Route path="/smart-services" element={<DashboardLayout><SmartServices /></DashboardLayout>} />
            <Route path="/operation" element={<DashboardLayout><Operation /></DashboardLayout>} />
            <Route path="/takwim" element={<DashboardLayout><Takwim /></DashboardLayout>} />
            <Route path="/claim" element={<DashboardLayout><Claim /></DashboardLayout>} />
            
            {/* SSO Dashboard Routes */}
            <Route path="/sso" element={<SSODashboardLayout><SSODashboard /></SSODashboardLayout>} />
            <Route path="/sso/events" element={<SSODashboardLayout><SSOEventOverview /></SSODashboardLayout>} />
            <Route path="/sso/participants" element={<SSODashboardLayout><SSOParticipantStats /></SSODashboardLayout>} />
            <Route path="/sso/breakdown" element={<SSODashboardLayout><SSOEventBreakdown /></SSODashboardLayout>} />
            <Route path="/sso/takwim" element={<SSODashboardLayout><SSOTakwim /></SSODashboardLayout>} />
            
            {/* Staff Dashboard Routes */}
            <Route path="/staff" element={<StaffDashboardLayout><StaffHome /></StaffDashboardLayout>} />
            
            {/* TP Dashboard Routes */}
            <Route path="/tp" element={<TPDashboardLayout><TPHome /></TPDashboardLayout>} />
            <Route path="/tp/home" element={<TPDashboardLayout><TPHome /></TPDashboardLayout>} />
            <Route path="/tp/membership" element={<TPDashboardLayout><TPMembership /></TPDashboardLayout>} />
            <Route path="/tp/smart-services" element={<TPDashboardLayout><TPSmartServices /></TPDashboardLayout>} />
            <Route path="/tp/operation" element={<TPDashboardLayout><TPOperation /></TPDashboardLayout>} />
            <Route path="/tp/takwim" element={<TPDashboardLayout><TPTakwim /></TPDashboardLayout>} />
            <Route path="/tp/claim" element={<TPDashboardLayout><TPClaim /></TPDashboardLayout>} />
            <Route path="/tp/finance" element={<TPDashboardLayout><TPFinance /></TPDashboardLayout>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
