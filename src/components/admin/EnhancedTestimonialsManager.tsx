import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Star, Search, Filter, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Testimonial {
  id: string;
  client_name: string;
  client_role?: string;
  review: string;
  rating?: number;
  source?: string;
  created_at: string;
}

export function EnhancedTestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    client_name: '',
    client_role: '',
    review: '',
    rating: 5,
    source: '',
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    filterTestimonials();
  }, [testimonials, searchTerm, ratingFilter]);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch testimonials',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterTestimonials = () => {
    let filtered = testimonials;

    if (searchTerm) {
      filtered = filtered.filter(testimonial => 
        testimonial.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.client_role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.source?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ratingFilter !== 'all') {
      const rating = parseInt(ratingFilter);
      filtered = filtered.filter(testimonial => testimonial.rating === rating);
    }

    setFilteredTestimonials(filtered);
  };

  const resetForm = () => {
    setFormData({
      client_name: '',
      client_role: '',
      review: '',
      rating: 5,
      source: '',
    });
    setEditingTestimonial(null);
    setIsCreating(false);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      client_name: testimonial.client_name,
      client_role: testimonial.client_role || '',
      review: testimonial.review,
      rating: testimonial.rating || 5,
      source: testimonial.source || '',
    });
    setIsCreating(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const testimonialData = {
        client_name: formData.client_name,
        client_role: formData.client_role || null,
        review: formData.review,
        rating: formData.rating,
        source: formData.source || null,
      };

      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', editingTestimonial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([testimonialData]);
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `Testimonial ${editingTestimonial ? 'updated' : 'created'} successfully`,
      });

      resetForm();
      fetchTestimonials();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to ${editingTestimonial ? 'update' : 'create'} testimonial`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Testimonial deleted successfully',
      });

      fetchTestimonials();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete testimonial',
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  if (loading && !isCreating) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">Manage client reviews and feedback</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="bg-gradient-youtube text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Testimonial
        </Button>
      </div>

      {/* Filters */}
      <Card className="card-premium">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>{editingTestimonial ? 'Edit Testimonial' : 'Create New Testimonial'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="client_name">Client Name</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="Enter client name..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="client_role">Client Role/Company</Label>
                  <Input
                    id="client_role"
                    value={formData.client_role}
                    onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                    placeholder="e.g., CEO at Tech Company"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="review">Review/Testimonial</Label>
                <Textarea
                  id="review"
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Enter the client's review..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="rating">Rating (1-5 stars)</Label>
                  <Select 
                    value={formData.rating.toString()} 
                    onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars - Excellent</SelectItem>
                      <SelectItem value="4">4 Stars - Very Good</SelectItem>
                      <SelectItem value="3">3 Stars - Good</SelectItem>
                      <SelectItem value="2">2 Stars - Fair</SelectItem>
                      <SelectItem value="1">1 Star - Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="source">Source/Platform</Label>
                  <Input
                    id="source"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    placeholder="e.g., Fiverr, Upwork, Direct Client"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={loading} className="bg-gradient-youtube text-white">
                  {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTestimonials.length === 0 ? (
          <Card className="card-premium col-span-full">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No testimonials found. Add your first testimonial!</p>
            </CardContent>
          </Card>
        ) : (
          filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="card-premium hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{testimonial.client_name}</h3>
                      {testimonial.client_role && (
                        <p className="text-sm text-muted-foreground">{testimonial.client_role}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(testimonial)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(testimonial.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonial.rating || 5)}
                  </div>

                  {/* Review */}
                  <blockquote className="text-sm italic text-muted-foreground">
                    "{testimonial.review}"
                  </blockquote>

                  {/* Footer */}
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(testimonial.created_at).toLocaleDateString()}
                    </div>
                    {testimonial.source && (
                      <Badge variant="outline" className="text-xs">
                        {testimonial.source}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}