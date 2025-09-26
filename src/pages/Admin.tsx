import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { SEOHead } from '@/components/seo-head';
import { BlogManager } from '@/components/admin/BlogManager';
import { PortfolioManager } from '@/components/admin/PortfolioManager';
import { TestimonialsManager } from '@/components/admin/TestimonialsManager';
import { ContactLeadsManager } from '@/components/admin/ContactLeadsManager';
import { LogOut } from 'lucide-react';

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('blog');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <SEOHead 
        title="Admin Dashboard - Adil's Portfolio"
        description="Content management dashboard"
      />
      <main className="min-h-screen bg-background">
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="leads">Contact Leads</TabsTrigger>
            </TabsList>

            <TabsContent value="blog" className="mt-6">
              <BlogManager />
            </TabsContent>

            <TabsContent value="portfolio" className="mt-6">
              <PortfolioManager />
            </TabsContent>

            <TabsContent value="testimonials" className="mt-6">
              <TestimonialsManager />
            </TabsContent>

            <TabsContent value="leads" className="mt-6">
              <ContactLeadsManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}