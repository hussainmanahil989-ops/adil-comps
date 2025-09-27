import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Users,
  TrendingUp,
  Eye,
  Calendar,
  Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  portfolioProjects: number;
  testimonials: number;
  contactLeads: number;
  recentActivity: any[];
}

const CHART_COLORS = ['hsl(var(--youtube-red))', 'hsl(var(--primary))', 'hsl(var(--muted-foreground))', 'hsl(var(--accent))'];

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    portfolioProjects: 0,
    testimonials: 0,
    contactLeads: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch blog posts stats
      const { data: blogPosts, error: blogError } = await supabase
        .from('blog_posts')
        .select('published, created_at');
      
      if (blogError) throw blogError;

      // Fetch portfolio projects
      const { data: portfolio, error: portfolioError } = await supabase
        .from('portfolio_projects')
        .select('id');
      
      if (portfolioError) throw portfolioError;

      // Fetch testimonials
      const { data: testimonials, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('id');
      
      if (testimonialsError) throw testimonialsError;

      // Fetch contact leads
      const { data: leads, error: leadsError } = await supabase
        .from('contact_leads')
        .select('id, created_at')
        .order('created_at', { ascending: false });
      
      if (leadsError) throw leadsError;

      const publishedPosts = blogPosts?.filter(post => post.published).length || 0;
      const draftPosts = blogPosts?.filter(post => !post.published).length || 0;

      setStats({
        totalPosts: blogPosts?.length || 0,
        publishedPosts,
        draftPosts,
        portfolioProjects: portfolio?.length || 0,
        testimonials: testimonials?.length || 0,
        contactLeads: leads?.length || 0,
        recentActivity: leads?.slice(0, 5) || []
      });

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch dashboard statistics',
      });
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Blog Posts', value: stats.totalPosts, published: stats.publishedPosts, drafts: stats.draftPosts },
    { name: 'Portfolio', value: stats.portfolioProjects, published: stats.portfolioProjects, drafts: 0 },
    { name: 'Testimonials', value: stats.testimonials, published: stats.testimonials, drafts: 0 },
    { name: 'Leads', value: stats.contactLeads, published: stats.contactLeads, drafts: 0 },
  ];

  const pieData = [
    { name: 'Published Posts', value: stats.publishedPosts },
    { name: 'Draft Posts', value: stats.draftPosts },
  ];

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-subtle rounded-xl p-8 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening with your content today.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-youtube-red text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="text-green-600 mr-1">{stats.publishedPosts} published</span>
              <span className="text-orange-600">{stats.draftPosts} drafts</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.portfolioProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Showcase projects
            </p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.testimonials}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Client reviews
            </p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contactLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Potential clients
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Content Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--youtube-red))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Blog Post Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle>Recent Contact Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentActivity.length === 0 ? (
            <p className="text-muted-foreground">No recent contact leads.</p>
          ) : (
            <div className="space-y-4">
              {stats.recentActivity.map((lead, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-youtube-red rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New contact lead received</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()} at{' '}
                      {new Date(lead.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}