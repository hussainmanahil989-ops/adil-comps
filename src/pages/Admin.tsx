import { useState } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SEOHead } from '@/components/seo-head';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { EnhancedBlogManager } from '@/components/admin/EnhancedBlogManager';
import { EnhancedPortfolioManager } from '@/components/admin/EnhancedPortfolioManager';
import { EnhancedTestimonialsManager } from '@/components/admin/EnhancedTestimonialsManager';
import { EnhancedContactLeadsManager } from '@/components/admin/EnhancedContactLeadsManager';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="text-xl font-medium">Loading dashboard...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <SEOHead 
        title="CMS Dashboard - Adil's Portfolio"
        description="Professional content management system"
      />
      <div className="min-h-screen bg-background flex">
        <AdminSidebar 
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="blog" element={<EnhancedBlogManager />} />
              <Route path="portfolio" element={<EnhancedPortfolioManager />} />
              <Route path="testimonials" element={<EnhancedTestimonialsManager />} />
              <Route path="leads" element={<EnhancedContactLeadsManager />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
}