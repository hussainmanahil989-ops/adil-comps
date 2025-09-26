import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "YouTube Creator (2M+ Subscribers)",
    content: "Adil's thumbnails increased my CTR by 200%! My channel growth exploded after working with him. The designs are simply outstanding.",
    rating: 5,
    avatar: "/api/placeholder/80/80",
    project: "YouTube Thumbnail Package"
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    role: "Tech Startup Founder",
    content: "The logo Adil designed became the face of our $10M startup. Professional, creative, and delivered exactly what we envisioned.",
    rating: 5,
    avatar: "/api/placeholder/80/80",
    project: "Complete Brand Identity"
  },
  {
    id: 3,
    name: "Emma Chen",
    role: "Marketing Director",
    content: "Working with Adil was seamless. Fast delivery, unlimited revisions, and results that exceeded our expectations. Highly recommended!",
    rating: 5,
    avatar: "/api/placeholder/80/80",
    project: "Video Editing Series"
  },
  {
    id: 4,
    name: "James Wilson",
    role: "E-commerce Owner",
    content: "The rebrand Adil created helped us increase sales by 300%. His creative vision transformed our entire business image.",
    rating: 5,
    avatar: "/api/placeholder/80/80",
    project: "Logo & Brand Guidelines"
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Content Creator (500K Followers)",
    content: "Best investment I made for my channel! Adil's thumbnails consistently get 40%+ CTR. Worth every penny.",
    rating: 5,
    avatar: "/api/placeholder/80/80",
    project: "Ongoing Thumbnail Design"
  }
]

export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonialChunks = []
  for (let i = 0; i < testimonials.length; i += 3) {
    testimonialChunks.push(testimonials.slice(i, i + 3))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonialChunks.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonialChunks.length) % testimonialChunks.length)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Clients <span className="gradient-text-youtube">Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real feedback from real clients who saw real results.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {testimonialChunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {chunk.map((testimonial) => (
                      <div key={testimonial.id} className="card-premium text-center">
                        {/* Quote icon */}
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-youtube rounded-full mb-6">
                          <Quote className="h-6 w-6 text-white" />
                        </div>

                        {/* Project type */}
                        <div className="text-xs text-youtube-red font-medium mb-3 uppercase tracking-wider">
                          {testimonial.project}
                        </div>

                        {/* Rating */}
                        <div className="flex justify-center space-x-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-youtube-red fill-current" />
                          ))}
                        </div>

                        {/* Testimonial content */}
                        <blockquote className="text-muted-foreground mb-6 italic">
                          "{testimonial.content}"
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center justify-center space-x-3">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="text-left">
                            <div className="font-semibold text-foreground">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full w-10 h-10 p-0 bg-card hover:bg-youtube-red hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full w-10 h-10 p-0 bg-card hover:bg-youtube-red hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonialChunks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-youtube-red' 
                    : 'bg-muted hover:bg-youtube-red/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-youtube-red fill-current" />
              <span className="font-medium">5.0 on Fiverr</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-youtube-red fill-current" />
              <span className="font-medium">Premium Designer</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-youtube-red fill-current" />
              <span className="font-medium">500+ Happy Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}