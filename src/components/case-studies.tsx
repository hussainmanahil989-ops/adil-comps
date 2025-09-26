import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Users, Play, Eye } from "lucide-react"

interface CaseStudy {
  id: string
  title: string
  client: string
  category: "logo" | "thumbnail" | "video"
  problem: string
  solution: string
  results: {
    metric: string
    value: string
    improvement: string
  }[]
  image: string
  duration: string
  featured?: boolean
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "YouTube Channel Rebrand & Thumbnail System",
    client: "TechReviews Pro",
    category: "thumbnail",
    problem: "Low click-through rates (2.1%) and inconsistent branding across 200+ videos. Channel growth had plateaued at 50K subscribers.",
    solution: "Created a cohesive thumbnail system with bold typography, consistent color scheme, and emotion-driven imagery. Implemented A/B testing framework for continuous optimization.",
    results: [
      { metric: "Click-through Rate", value: "8.3%", improvement: "+295%" },
      { metric: "Avg. Views per Video", value: "45K", improvement: "+180%" },
      { metric: "Subscriber Growth", value: "15K/month", improvement: "+400%" }
    ],
    image: "/case-study-thumbnails.jpg",
    duration: "3 weeks",
    featured: true
  },
  {
    id: "2",
    title: "E-commerce Brand Identity & Logo Design",
    client: "EcoNest Home",
    category: "logo",
    problem: "New sustainable home goods company needed professional branding to compete with established brands and build trust with eco-conscious consumers.",
    solution: "Designed a modern, minimalist logo emphasizing natural elements. Created comprehensive brand guidelines including color palette, typography, and packaging design.",
    results: [
      { metric: "Brand Recognition", value: "89%", improvement: "New metric" },
      { metric: "Sales Conversion", value: "12.4%", improvement: "+340%" },
      { metric: "Customer Trust Score", value: "4.8/5", improvement: "New metric" }
    ],
    image: "/case-study-logo.jpg",
    duration: "2 weeks"
  },
  {
    id: "3",
    title: "Course Launch Video Campaign",
    client: "Marketing Mastery Academy",
    category: "video",
    problem: "Online course with great content but poor video quality was struggling to convert visitors. 15-minute demo videos had 40% drop-off rate.",
    solution: "Re-edited entire video series with dynamic cuts, engaging motion graphics, and strategic pacing. Added captions and mobile-optimized formats.",
    results: [
      { metric: "Video Completion", value: "78%", improvement: "+95%" },
      { metric: "Course Enrollment", value: "2,100", improvement: "+250%" },
      { metric: "Revenue Impact", value: "$180K", improvement: "+310%" }
    ],
    image: "/case-study-video.jpg",
    duration: "4 weeks"
  }
]

export function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredStudies = selectedCategory === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "thumbnail": return <Eye className="h-4 w-4" />
      case "logo": return <TrendingUp className="h-4 w-4" />
      case "video": return <Play className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "thumbnail": return "bg-youtube-red text-white"
      case "logo": return "bg-blue-500 text-white"
      case "video": return "bg-purple-500 text-white"
      default: return "bg-gray-500 text-white"
    }
  }

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Real Results for Real <span className="gradient-text-youtube">Clients</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            See how our creative solutions have transformed businesses and boosted their success.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {["all", "thumbnail", "logo", "video"].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-gradient-youtube text-white" 
                  : "hover:border-youtube-red hover:text-youtube-red"
                }
              >
                {getCategoryIcon(category)}
                <span className="ml-2 capitalize">
                  {category === "all" ? "All Cases" : `${category}s`}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredStudies.map((study) => (
            <div key={study.id} className="card-premium group">
              {study.featured && (
                <Badge className="mb-4 bg-gradient-youtube text-white">
                  Featured Case Study
                </Badge>
              )}

              {/* Category & Duration */}
              <div className="flex items-center justify-between mb-4">
                <Badge className={getCategoryColor(study.category)}>
                  {getCategoryIcon(study.category)}
                  <span className="ml-1 capitalize">{study.category}</span>
                </Badge>
                <span className="text-sm text-muted-foreground">{study.duration}</span>
              </div>

              {/* Title & Client */}
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {study.title}
              </h3>
              <p className="text-muted-foreground mb-6">Client: {study.client}</p>

              {/* Problem & Solution */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-destructive mb-2">Challenge</h4>
                  <p className="text-sm text-muted-foreground">{study.problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-success mb-2">Solution</h4>
                  <p className="text-sm text-muted-foreground">{study.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-subtle rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-success" />
                  Results Achieved
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                  {study.results.map((result, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-youtube-red">{result.value}</div>
                      <div className="text-xs text-muted-foreground">{result.metric}</div>
                      <div className="text-xs text-success font-medium">{result.improvement}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button 
                variant="outline" 
                className="w-full hover:bg-youtube-red hover:text-white hover:border-youtube-red group-hover:shadow-glow transition-all duration-300"
              >
                View Full Case Study
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="card-premium inline-block">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to be our next success story?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss how we can achieve similar results for your business.
            </p>
            <Button className="bg-gradient-youtube hover:shadow-glow transition-all duration-300">
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}