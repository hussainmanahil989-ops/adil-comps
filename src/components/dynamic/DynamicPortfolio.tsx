import { useState, useEffect } from "react"
import { Eye, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { usePortfolioProjects, usePortfolioCategories } from "@/hooks/useDynamicContent"

const beforeAfterItems = [
  {
    before: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    after: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600", 
    title: "Gaming Channel Rebrand",
    description: "Complete visual transformation that increased subscriber engagement by 250%",
    result: "250% engagement boost"
  },
  {
    before: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    after: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "E-commerce Logo Redesign", 
    description: "Modern logo redesign that helped secure $2M funding round",
    result: "$2M funding secured"
  },
  {
    before: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    after: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Thumbnail CTR Optimization",
    description: "Thumbnail redesign that boosted click-through rates by 180%",
    result: "180% CTR improvement"
  }
];

export function DynamicPortfolio() {
  const { projects, loading: projectsLoading } = usePortfolioProjects();
  const { categories, loading: categoriesLoading } = usePortfolioCategories();
  const [activeCategory, setActiveCategory] = useState("All");

  const loading = projectsLoading || categoriesLoading;

  // Create category options including "All"
  const categoryOptions = [
    { name: "All", slug: "all" },
    ...categories
  ];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  if (loading) {
    return (
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-muted rounded w-96 mx-auto mb-6"></div>
            <div className="h-6 bg-muted rounded w-full max-w-3xl mx-auto"></div>
          </div>

          <div className="mb-20">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-8"></div>
            <div className="h-6 bg-muted rounded w-full max-w-2xl mx-auto mb-12"></div>
            <div className="h-96 bg-muted rounded-xl"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-muted rounded w-24"></div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted"></div>
                <div className="p-6">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-3"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Portfolio That <span className="gradient-text-youtube">Drives Results</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real projects, real results. Each design is crafted to not just look amazing, but to drive measurable business growth for my clients.
          </p>
        </div>

        {/* Before/After Showcase */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Transformation <span className="gradient-text-youtube">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            See the dramatic improvements that drive real business results. Drag the slider to reveal the transformation.
          </p>
          <BeforeAfterSlider items={beforeAfterItems} />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categoryOptions.map((category) => (
            <Button
              key={category.slug}
              variant={activeCategory === category.name ? "default" : "outline"}
              onClick={() => setActiveCategory(category.name)}
              className={`font-medium transition-smooth ${
                activeCategory === category.name
                  ? "bg-gradient-youtube text-white"
                  : "border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          ) : (
            filteredProjects.map((item) => (
              <div 
                key={item.id}
                className="portfolio-item bg-card rounded-xl overflow-hidden shadow-small hover:shadow-premium transition-all duration-500 group"
              >
                <div className="relative aspect-video bg-muted">
                  <img 
                    src={item.image_after || item.image_before || "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400"} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="portfolio-overlay">
                    <div className="text-white">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Button variant="secondary" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {item.video_demo && (
                          <Button variant="secondary" size="sm" asChild>
                            <a href={item.video_demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                  )}
                  
                  <div className="bg-gradient-youtube/10 text-youtube-red px-3 py-2 rounded-lg text-sm font-medium">
                    📅 {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-subtle rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Get Similar Results?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss your project and create designs that don't just look great, but drive real business growth.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-youtube hover:shadow-glow transition-all duration-300 font-semibold px-8 py-4"
            >
              Start Your Project Today
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}