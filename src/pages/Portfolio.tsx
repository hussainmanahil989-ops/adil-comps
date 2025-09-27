import { useState } from "react"
import { Eye, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BeforeAfterSlider } from "@/components/before-after-slider"

const categories = ["All", "Logos", "Thumbnails", "Video Editing", "Branding"]

const beforeAfterItems = [
  {
    before: "/api/placeholder/600/400",
    after: "/api/placeholder/600/400", 
    title: "Gaming Channel Rebrand",
    description: "Complete visual transformation that increased subscriber engagement by 250%",
    result: "250% engagement boost"
  },
  {
    before: "/api/placeholder/600/400",
    after: "/api/placeholder/600/400",
    title: "E-commerce Logo Redesign", 
    description: "Modern logo redesign that helped secure $2M funding round",
    result: "$2M funding secured"
  },
  {
    before: "/api/placeholder/600/400",
    after: "/api/placeholder/600/400",
    title: "Thumbnail CTR Optimization",
    description: "Thumbnail redesign that boosted click-through rates by 180%",
    result: "180% CTR improvement"
  }
]

const portfolioItems = [
  {
    id: 1,
    title: "Tech Startup Logo",
    category: "Logos",
    description: "Modern logo design for a fintech startup that raised $5M",
    image: "/api/placeholder/400/300",
    tags: ["Logo", "Tech", "Startup"],
    results: "300% brand recognition increase"
  },
  {
    id: 2,
    title: "Gaming Thumbnail Pack",
    category: "Thumbnails",
    description: "High-converting thumbnail series for gaming channel",
    image: "/api/placeholder/400/300",
    tags: ["Gaming", "YouTube", "Series"],
    results: "25% CTR improvement"
  },
  {
    id: 3,
    title: "Product Launch Video",
    category: "Video Editing",
    description: "Launch video for SaaS product with motion graphics",
    image: "/api/placeholder/400/300",
    tags: ["Video", "SaaS", "Launch"],
    results: "$100K+ first week sales"
  },
  {
    id: 4,
    title: "Restaurant Brand Identity",
    category: "Branding",
    description: "Complete branding package for premium restaurant chain",
    image: "/api/placeholder/400/300",
    tags: ["Restaurant", "Premium", "Identity"],
    results: "50% customer retention boost"
  },
  {
    id: 5,
    title: "E-commerce Logo Suite",
    category: "Logos",
    description: "Logo variations for multi-million dollar e-commerce brand",
    image: "/api/placeholder/400/300",
    tags: ["E-commerce", "Suite", "Variations"],
    results: "200% conversion rate increase"
  },
  {
    id: 6,
    title: "Viral YouTube Thumbnails",
    category: "Thumbnails",
    description: "Thumbnails that generated 10M+ combined views",
    image: "/api/placeholder/400/300",
    tags: ["Viral", "YouTube", "High-CTR"],
    results: "10M+ views generated"
  }
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")
  
  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

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
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`font-medium transition-smooth ${
                activeCategory === category
                  ? "bg-gradient-youtube text-white"
                  : "border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="portfolio-item bg-card rounded-xl overflow-hidden shadow-small hover:shadow-premium transition-all duration-500 group"
            >
              <div className="relative aspect-video bg-muted">
                <img 
                  src={item.image} 
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
                      <Button variant="secondary" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                
                <div className="bg-gradient-youtube/10 text-youtube-red px-3 py-2 rounded-lg text-sm font-medium">
                  📈 {item.results}
                </div>
              </div>
            </div>
          ))}
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
  )
}