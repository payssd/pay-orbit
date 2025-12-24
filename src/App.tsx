import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Pages
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Subscription from "./pages/Subscription";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Semi-protected routes (need auth but not org) */}
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/subscription" element={<Subscription />} />
            
            {/* Protected routes with dashboard layout */}
            <Route
              element={
                <AuthGuard requireOrganization>
                  <DashboardLayout />
                </AuthGuard>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Payroll routes - placeholders */}
              <Route path="/payroll/employees" element={<PlaceholderPage title="Employees" />} />
              <Route path="/payroll/employees/new" element={<PlaceholderPage title="Add Employee" />} />
              <Route path="/payroll/runs" element={<PlaceholderPage title="Payroll Runs" />} />
              <Route path="/payroll/runs/new" element={<PlaceholderPage title="New Payroll Run" />} />
              
              {/* Invoice routes - placeholders */}
              <Route path="/customers" element={<PlaceholderPage title="Customers" />} />
              <Route path="/invoices" element={<PlaceholderPage title="Invoices" />} />
              <Route path="/invoices/new" element={<PlaceholderPage title="New Invoice" />} />
              
              {/* Reports - placeholders */}
              <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
              <Route path="/reports/payroll" element={<PlaceholderPage title="Payroll Reports" />} />
              <Route path="/reports/invoices" element={<PlaceholderPage title="Invoice Reports" />} />
              
              {/* Settings - placeholders */}
              <Route path="/settings/organization" element={<PlaceholderPage title="Organization Settings" />} />
              <Route path="/settings/gateways" element={<PlaceholderPage title="Payment Gateways" />} />
              <Route path="/settings/subscription" element={<PlaceholderPage title="Subscription" />} />
              <Route path="/settings/team" element={<PlaceholderPage title="Team Members" />} />
              <Route path="/settings/profile" element={<PlaceholderPage title="Profile" />} />
            </Route>
            
            {/* Redirect root to dashboard or auth */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Placeholder component for routes to be implemented
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="page-transition">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">This page is coming soon in the next phase.</p>
    </div>
  );
}

export default App;
