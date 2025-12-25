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
import SubscriptionCallback from "./pages/SubscriptionCallback";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import PayrollRuns from "./pages/PayrollRuns";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import Expenses from "./pages/Expenses";
import ExpenseReports from "./pages/ExpenseReports";
import ExpenseBudgets from "./pages/ExpenseBudgets";
import ExpenseAnalytics from "./pages/ExpenseAnalytics";
import PaymentSettings from "./pages/PaymentSettings";
import OrganizationSettings from "./pages/OrganizationSettings";
import TeamSettings from "./pages/TeamSettings";
import ProfileSettings from "./pages/ProfileSettings";
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
            <Route path="/subscription/callback" element={<SubscriptionCallback />} />
            
            {/* Protected routes with dashboard layout */}
            <Route
              element={
                <AuthGuard requireOrganization>
                  <DashboardLayout />
                </AuthGuard>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Payroll routes */}
              <Route path="/payroll/employees" element={<Employees />} />
              <Route path="/payroll/employees/:id" element={<Employees />} />
              <Route path="/payroll/runs" element={<PayrollRuns />} />
              <Route path="/payroll/runs/:id" element={<PayrollRuns />} />
              
              {/* Invoice routes */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/:id" element={<Invoices />} />
              
              {/* Expenses */}
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/expenses/budgets" element={<ExpenseBudgets />} />
              
              {/* Reports */}
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/expenses" element={<ExpenseReports />} />
              <Route path="/reports/analytics" element={<ExpenseAnalytics />} />
              <Route path="/reports/payroll" element={<Reports />} />
              <Route path="/reports/invoices" element={<Reports />} />
              
              {/* Settings */}
              <Route path="/settings/organization" element={<OrganizationSettings />} />
              <Route path="/settings/gateways" element={<PaymentSettings />} />
              <Route path="/settings/subscription" element={<Subscription />} />
              <Route path="/settings/team" element={<TeamSettings />} />
              <Route path="/settings/profile" element={<ProfileSettings />} />
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

export default App;
