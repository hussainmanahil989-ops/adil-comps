import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Search, Filter, Grid, List, Calendar } from 'lucide-react';
import { FileUpload } from './FileUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description?: string;
  image_before?: string;
  image_after?: string;
  video_demo?: string;
  created_at: string;
}

export function EnhancedPortfolioManager() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<PortfolioProject[]>([]);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image_before: '',
    image_after: '',
    video_demo: '',
  });

  const categories = ['Logo Design', 'Thumbnail Design', 'Video Editing', 'Web Design', 'Branding'];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, categoryFilter]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch portfolio projects',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(project => project.category === categoryFilter);
    }

    setFilteredProjects(filtered);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      image_before: '',
      image_after: '',
      video_demo: '',
    });
    setEditingProject(null);
    setIsCreating(false);
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description || '',
      image_before: project.image_before || '',
      image_after: project.image_after || '',
      video_demo: project.video_demo || '',
    });
    setIsCreating(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        title: formData.title,
        category: formData.category,
        description: formData.description || null,
        image_before: formData.image_before || null,
        image_after: formData.image_after || null,
        video_demo: formData.video_demo || null,
      };

      if (editingProject) {
        const { error } = await supabase
          .from('portfolio_projects')
          .update(projectData)
          .eq('id', editingProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('portfolio_projects')
          .insert([projectData]);
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `Portfolio project ${editingProject ? 'updated' : 'created'} successfully`,
      });

      resetForm();
      fetchProjects();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to ${editingProject ? 'update' : 'create'} portfolio project`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio project?')) return;

    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Portfolio project deleted successfully',
      });

      fetchProjects();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete portfolio project',
      });
    }
  };

  if (loading && !isCreating) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading portfolio projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Projects</h1>
          <p className="text-muted-foreground">Showcase your creative work</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="bg-gradient-youtube text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters & View Toggle */}
      <Card className="card-premium">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter project title..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your project..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label>Before Image</Label>
                  <FileUpload
                    acceptedTypes="image/*"
                    maxSize={10}
                    folder="portfolio/before"
                    onUpload={(url) => setFormData({ ...formData, image_before: url })}
                    currentFile={formData.image_before}
                  />
                </div>
                <div>
                  <Label>After Image</Label>
                  <FileUpload
                    acceptedTypes="image/*"
                    maxSize={10}
                    folder="portfolio/after"
                    onUpload={(url) => setFormData({ ...formData, image_after: url })}
                    currentFile={formData.image_after}
                  />
                </div>
              </div>

              <div>
                <Label>Demo Video (Optional)</Label>
                <FileUpload
                  acceptedTypes="video/*"
                  maxSize={100}
                  folder="portfolio/videos"
                  onUpload={(url) => setFormData({ ...formData, video_demo: url })}
                  currentFile={formData.video_demo}
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={loading} className="bg-gradient-youtube text-white">
                  {editingProject ? 'Update Project' : 'Create Project'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Projects Display */}
      <div className={cn(
        "gap-6",
        viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'space-y-6'
      )}>
        {filteredProjects.length === 0 ? (
          <Card className="card-premium col-span-full">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No portfolio projects found. Create your first project!</p>
            </CardContent>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className={cn(
              "card-premium hover:shadow-lg transition-shadow",
              viewMode === 'list' && "flex flex-row"
            )}>
              <CardContent className={cn("p-6", viewMode === 'list' && "flex-1 flex items-center gap-6")}>
                {/* Project Images */}
                <div className={cn(
                  "space-y-4",
                  viewMode === 'list' && "flex space-y-0 space-x-4 w-48"
                )}>
                  {project.image_before && (
                    <div className="relative h-32 bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={project.image_before} 
                        alt={`${project.title} - Before`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs">Before</Badge>
                      </div>
                    </div>
                  )}
                  {project.image_after && (
                    <div className="relative h-32 bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={project.image_after} 
                        alt={`${project.title} - After`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="text-xs bg-gradient-youtube text-white">After</Badge>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Project Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <Badge variant="outline" className="mt-1">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(project)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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