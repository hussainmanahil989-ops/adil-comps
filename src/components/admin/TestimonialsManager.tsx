import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  client_role?: string;
  review: string;
  rating?: number;
  source?: string;
  created_at: string;
}

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
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

  if (loading && !isCreating) {
    return <div>Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Testimonial
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTestimonial ? 'Edit Testimonial' : 'Create New Testimonial'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Client Name</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="client_role">Client Role/Title</Label>
                  <Input
                    id="client_role"
                    value={formData.client_role}
                    onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="review">Review/Feedback</Label>
                <Textarea
                  id="review"
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="source">Source Platform</Label>
                  <Input
                    id="source"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    placeholder="e.g., Fiverr, LinkedIn, Direct"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={loading}>
                  {editingTestimonial ? 'Update' : 'Create'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{testimonial.client_name}</h3>
                  {testimonial.client_role && (
                    <p className="text-sm text-muted-foreground">{testimonial.client_role}</p>
                  )}
                  <p className="text-sm mt-2">{testimonial.review}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    {testimonial.rating && (
                      <span>Rating: {testimonial.rating}/5</span>
                    )}
                    {testimonial.source && (
                      <span>Source: {testimonial.source}</span>
                    )}
                    <span>Created: {new Date(testimonial.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(testimonial)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}