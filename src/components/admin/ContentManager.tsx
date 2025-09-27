import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Trash2, Plus, Save, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import { FileUpload } from './FileUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeroContent {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  background_image?: string;
  badge_text: string;
  is_active: boolean;
}

interface TrustBadge {
  id: string;
  title: string;
  value: string;
  description?: string;
  icon?: string;
  color_class: string;
  display_order: number;
  is_active: boolean;
}

interface ServiceHighlight {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  features: string[];
  price_text: string;
  is_popular: boolean;
  display_order: number;
  is_active: boolean;
}

export function ContentManager() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [trustBadges, setTrustBadges] = useState<TrustBadge[]>([]);
  const [serviceHighlights, setServiceHighlights] = useState<ServiceHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingHero, setEditingHero] = useState(false);
  const [editingBadge, setEditingBadge] = useState<TrustBadge | null>(null);
  const [editingService, setEditingService] = useState<ServiceHighlight | null>(null);
  const { toast } = useToast();

  const [heroForm, setHeroForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    cta_primary_text: '',
    cta_primary_link: '',
    cta_secondary_text: '',
    cta_secondary_link: '',
    background_image: '',
    badge_text: '',
    is_active: true
  });

  const [badgeForm, setBadgeForm] = useState({
    title: '',
    value: '',
    description: '',
    icon: '',
    color_class: 'bg-gradient-youtube',
    display_order: 0,
    is_active: true
  });

  const [serviceForm, setServiceForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    icon: '',
    features: '',
    price_text: 'Chat for Quote!',
    is_popular: false,
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      // Fetch hero content
      const { data: heroData, error: heroError } = await supabase
        .from('hero_content')
        .select('*')
        .eq('is_active', true)
        .single();

      if (heroError && heroError.code !== 'PGRST116') throw heroError;
      setHeroContent(heroData);

      // Fetch trust badges
      const { data: badgesData, error: badgesError } = await supabase
        .from('trust_badges')
        .select('*')
        .order('display_order', { ascending: true });

      if (badgesError) throw badgesError;
      setTrustBadges(badgesData || []);

      // Fetch service highlights
      const { data: servicesData, error: servicesError } = await supabase
        .from('service_highlights')
        .select('*')
        .order('display_order', { ascending: true });

      if (servicesError) throw servicesError;
      setServiceHighlights(servicesData || []);

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch content: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (heroContent) {
        const { error } = await supabase
          .from('hero_content')
          .update(heroForm)
          .eq('id', heroContent.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('hero_content')
          .insert([heroForm]);
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: 'Hero content updated successfully',
      });

      setEditingHero(false);
      fetchAllContent();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update hero content: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBadgeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingBadge) {
        const { error } = await supabase
          .from('trust_badges')
          .update(badgeForm)
          .eq('id', editingBadge.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('trust_badges')
          .insert([badgeForm]);
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `Trust badge ${editingBadge ? 'updated' : 'created'} successfully`,
      });

      setEditingBadge(null);
      setBadgeForm({
        title: '',
        value: '',
        description: '',
        icon: '',
        color_class: 'bg-gradient-youtube',
        display_order: 0,
        is_active: true
      });
      fetchAllContent();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save trust badge: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceData = {
        ...serviceForm,
        features: serviceForm.features.split(',').map(f => f.trim()).filter(f => f)
      };

      if (editingService) {
        const { error } = await supabase
          .from('service_highlights')
          .update(serviceData)
          .eq('id', editingService.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('service_highlights')
          .insert([serviceData]);
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `Service ${editingService ? 'updated' : 'created'} successfully`,
      });

      setEditingService(null);
      setServiceForm({
        title: '',
        subtitle: '',
        description: '',
        icon: '',
        features: '',
        price_text: 'Chat for Quote!',
        is_popular: false,
        display_order: 0,
        is_active: true
      });
      fetchAllContent();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save service: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteBadge = async (id: string) => {
    if (!confirm('Are you sure you want to delete this trust badge?')) return;

    try {
      const { error } = await supabase
        .from('trust_badges')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: 'Success',
        description: 'Trust badge deleted successfully',
      });
      fetchAllContent();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete trust badge',
      });
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('service_highlights')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      });
      fetchAllContent();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete service',
      });
    }
  };

  const updateOrder = async (table: string, id: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from(table)
        .update({ display_order: newOrder })
        .eq('id', id);

      if (error) throw error;
      fetchAllContent();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update order',
      });
    }
  };

  const editHero = () => {
    if (heroContent) {
      setHeroForm({
        title: heroContent.title,
        subtitle: heroContent.subtitle || '',
        description: heroContent.description || '',
        cta_primary_text: heroContent.cta_primary_text,
        cta_primary_link: heroContent.cta_primary_link,
        cta_secondary_text: heroContent.cta_secondary_text,
        cta_secondary_link: heroContent.cta_secondary_link,
        background_image: heroContent.background_image || '',
        badge_text: heroContent.badge_text,
        is_active: heroContent.is_active
      });
    }
    setEditingHero(true);
  };

  const editBadge = (badge: TrustBadge) => {
    setBadgeForm({
      title: badge.title,
      value: badge.value,
      description: badge.description || '',
      icon: badge.icon || '',
      color_class: badge.color_class,
      display_order: badge.display_order,
      is_active: badge.is_active
    });
    setEditingBadge(badge);
  };

  const editService = (service: ServiceHighlight) => {
    setServiceForm({
      title: service.title,
      subtitle: service.subtitle || '',
      description: service.description || '',
      icon: service.icon || '',
      features: service.features.join(', '),
      price_text: service.price_text,
      is_popular: service.is_popular,
      display_order: service.display_order,
      is_active: service.is_active
    });
    setEditingService(service);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage homepage and portfolio content</p>
        </div>
        <Button onClick={() => window.open('/', '_blank')} variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          Preview Site
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="badges">Trust Badges</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        {/* Hero Content Tab */}
        <TabsContent value="hero" className="space-y-6">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Hero Section Content</CardTitle>
            </CardHeader>
            <CardContent>
              {!editingHero ? (
                <div className="space-y-4">
                  {heroContent ? (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold">{heroContent.title}</h3>
                        {heroContent.subtitle && (
                          <p className="text-muted-foreground">{heroContent.subtitle}</p>
                        )}
                        {heroContent.description && (
                          <p className="text-sm text-muted-foreground mt-2">{heroContent.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge>{heroContent.cta_primary_text}</Badge>
                        <Badge variant="outline">{heroContent.cta_secondary_text}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Badge: {heroContent.badge_text}</p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">No hero content found</p>
                  )}
                  <Button onClick={editHero}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Hero Content
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Main Title</Label>
                    <Input
                      id="title"
                      value={heroForm.title}
                      onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                      placeholder="Transform Your Brand with Premium Designs"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Textarea
                      id="subtitle"
                      value={heroForm.subtitle}
                      onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      placeholder="Professional logo design, YouTube thumbnails..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={heroForm.description}
                      onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                      placeholder="Ready in 24-48 hours."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cta_primary_text">Primary CTA Text</Label>
                      <Input
                        id="cta_primary_text"
                        value={heroForm.cta_primary_text}
                        onChange={(e) => setHeroForm({ ...heroForm, cta_primary_text: e.target.value })}
                        placeholder="Start Your Project"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cta_primary_link">Primary CTA Link</Label>
                      <Input
                        id="cta_primary_link"
                        value={heroForm.cta_primary_link}
                        onChange={(e) => setHeroForm({ ...heroForm, cta_primary_link: e.target.value })}
                        placeholder="/contact"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cta_secondary_text">Secondary CTA Text</Label>
                      <Input
                        id="cta_secondary_text"
                        value={heroForm.cta_secondary_text}
                        onChange={(e) => setHeroForm({ ...heroForm, cta_secondary_text: e.target.value })}
                        placeholder="Watch Portfolio"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cta_secondary_link">Secondary CTA Link</Label>
                      <Input
                        id="cta_secondary_link"
                        value={heroForm.cta_secondary_link}
                        onChange={(e) => setHeroForm({ ...heroForm, cta_secondary_link: e.target.value })}
                        placeholder="/portfolio"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="badge_text">Trust Badge Text</Label>
                    <Input
                      id="badge_text"
                      value={heroForm.badge_text}
                      onChange={(e) => setHeroForm({ ...heroForm, badge_text: e.target.value })}
                      placeholder="Trusted by 500+ YouTubers & Brands"
                    />
                  </div>

                  <div>
                    <Label>Background Image</Label>
                    <FileUpload
                      acceptedTypes="image/*"
                      maxSize={10}
                      folder="hero-backgrounds"
                      onUpload={(url) => setHeroForm({ ...heroForm, background_image: url })}
                      currentFile={heroForm.background_image}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={heroForm.is_active}
                      onCheckedChange={(checked) => setHeroForm({ ...heroForm, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" disabled={loading}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setEditingHero(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trust Badges Tab */}
        <TabsContent value="badges" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Trust Badges</h2>
            <Button onClick={() => setEditingBadge({} as TrustBadge)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Badge
            </Button>
          </div>

          {editingBadge && (
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>{editingBadge.id ? 'Edit Badge' : 'Create New Badge'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBadgeSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="badge_title">Title</Label>
                      <Input
                        id="badge_title"
                        value={badgeForm.title}
                        onChange={(e) => setBadgeForm({ ...badgeForm, title: e.target.value })}
                        placeholder="Happy Clients"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="badge_value">Value</Label>
                      <Input
                        id="badge_value"
                        value={badgeForm.value}
                        onChange={(e) => setBadgeForm({ ...badgeForm, value: e.target.value })}
                        placeholder="500+"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="badge_description">Description</Label>
                    <Input
                      id="badge_description"
                      value={badgeForm.description}
                      onChange={(e) => setBadgeForm({ ...badgeForm, description: e.target.value })}
                      placeholder="Satisfied customers worldwide"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="badge_icon">Icon Name</Label>
                      <Input
                        id="badge_icon"
                        value={badgeForm.icon}
                        onChange={(e) => setBadgeForm({ ...badgeForm, icon: e.target.value })}
                        placeholder="Users"
                      />
                    </div>
                    <div>
                      <Label htmlFor="badge_color">Color Class</Label>
                      <Select 
                        value={badgeForm.color_class} 
                        onValueChange={(value) => setBadgeForm({ ...badgeForm, color_class: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bg-gradient-youtube">YouTube Red</SelectItem>
                          <SelectItem value="bg-blue-500">Blue</SelectItem>
                          <SelectItem value="bg-green-500">Green</SelectItem>
                          <SelectItem value="bg-purple-500">Purple</SelectItem>
                          <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="badge_order">Display Order</Label>
                      <Input
                        id="badge_order"
                        type="number"
                        value={badgeForm.display_order}
                        onChange={(e) => setBadgeForm({ ...badgeForm, display_order: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <Switch
                        id="badge_active"
                        checked={badgeForm.is_active}
                        onCheckedChange={(checked) => setBadgeForm({ ...badgeForm, is_active: checked })}
                      />
                      <Label htmlFor="badge_active">Active</Label>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" disabled={loading}>
                      {editingBadge.id ? 'Update' : 'Create'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setEditingBadge(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {trustBadges.map((badge) => (
              <Card key={badge.id} className="card-premium">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${badge.color_class} rounded-lg flex items-center justify-center`}>
                          <span className="text-white text-xs">{badge.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{badge.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {badge.value} - {badge.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={badge.is_active ? "default" : "secondary"}>
                        {badge.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button size="sm" variant="ghost" onClick={() => editBadge(badge)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteBadge(badge.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Service Highlights</h2>
            <Button onClick={() => setEditingService({} as ServiceHighlight)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          {editingService && (
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>{editingService.id ? 'Edit Service' : 'Create New Service'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleServiceSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="service_title">Title</Label>
                      <Input
                        id="service_title"
                        value={serviceForm.title}
                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                        placeholder="Logo Design"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="service_subtitle">Subtitle</Label>
                      <Input
                        id="service_subtitle"
                        value={serviceForm.subtitle}
                        onChange={(e) => setServiceForm({ ...serviceForm, subtitle: e.target.value })}
                        placeholder="Professional Brand Identity"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="service_description">Description</Label>
                    <Textarea
                      id="service_description"
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      placeholder="Professional logos that make your brand unforgettable"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="service_features">Features (comma-separated)</Label>
                    <Textarea
                      id="service_features"
                      value={serviceForm.features}
                      onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                      placeholder="3 Concepts, Unlimited Revisions, All File Formats"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="service_icon">Icon Name</Label>
                      <Input
                        id="service_icon"
                        value={serviceForm.icon}
                        onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                        placeholder="Palette"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service_price">Price Text</Label>
                      <Input
                        id="service_price"
                        value={serviceForm.price_text}
                        onChange={(e) => setServiceForm({ ...serviceForm, price_text: e.target.value })}
                        placeholder="Chat for Quote!"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service_order">Display Order</Label>
                      <Input
                        id="service_order"
                        type="number"
                        value={serviceForm.display_order}
                        onChange={(e) => setServiceForm({ ...serviceForm, display_order: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="service_popular"
                        checked={serviceForm.is_popular}
                        onCheckedChange={(checked) => setServiceForm({ ...serviceForm, is_popular: checked })}
                      />
                      <Label htmlFor="service_popular">Popular Service</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="service_active"
                        checked={serviceForm.is_active}
                        onCheckedChange={(checked) => setServiceForm({ ...serviceForm, is_active: checked })}
                      />
                      <Label htmlFor="service_active">Active</Label>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" disabled={loading}>
                      {editingService.id ? 'Update' : 'Create'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setEditingService(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {serviceHighlights.map((service) => (
              <Card key={service.id} className="card-premium">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold">{service.title}</h3>
                        {service.is_popular && (
                          <Badge className="bg-gradient-youtube text-white">Popular</Badge>
                        )}
                        <Badge variant={service.is_active ? "default" : "secondary"}>
                          {service.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{service.subtitle}</p>
                      <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {service.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{service.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => editService(service)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteService(service.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}