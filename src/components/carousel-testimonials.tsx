import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Alex Chen",
    role: "YouTube Creator (2.3M subscribers)",
    platform: "YouTube",
    rating: 5,
    text: "Adi's thumbnails increased my CTR by 180% in just 2 weeks. My channel went from 50K to 500K views per video. Absolutely game-changing work!",
    avatar: "/api/placeholder/60/60",
    result: "180% CTR increase"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "E-commerce Founder",
    platform: "Fiverr",
    rating: 5,
    text: "The logo Adi created for my brand helped us raise $2M in funding. Investors specifically commented on how professional our brand looked.",
    avatar: "/api/placeholder/60/60",
    result: "$2M funding raised"
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Tech Startup CEO",
    platform: "Fiverr",
    rating: 5,
    text: "Video editing was exceptional. Our product launch video generated $500K in first week sales. Adi understood our vision perfectly.",
    avatar: "/api/placeholder/60/60",
    result: "$500K first week sales"
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    role: "Gaming YouTuber (1.8M subscribers)",
    platform: "Direct",
    rating: 5,
    text: "Working with Adi for 6 months, my channel grew from 200K to 1.8M subscribers. His thumbnails are click magnets!",
    avatar: "/api/placeholder/60/60",
    result: "9x subscriber growth"
  },
  {
    id: 5,
    name: "David Park",
    role: "Restaurant Chain Owner",
    platform: "Fiverr",
    rating: 5,
    text: "Complete rebrand boosted our customer retention by 60%. The new visual identity perfectly captures our premium positioning.",
    avatar: "/api/placeholder/60/60",
    result: "60% retention boost"
  },
  {
    id: 6,
    name: "Emma Thompson",
    role: "Course Creator",
    platform: "Direct",
    rating: 5,
    text: "Adi's designs helped my online course generate $100K+ in sales in the first month. The visuals perfectly matched my brand message.",
    avatar: "/api/placeholder/60/60",
    result: "$100K+ first month"
  }
]

export function CarouselTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative">
      {/* Main testimonial card */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-large min-h-[300px] flex flex-col justify-between">
        <div>
          <Quote className="h-8 w-8 text-youtube-red mb-4" />
          
          <blockquote className="text-lg text-foreground mb-6 italic">
            "{currentTestimonial.text}"
          </blockquote>
          
          <div className="bg-gradient-youtube/10 text-youtube-red px-4 py-2 rounded-lg text-sm font-medium mb-6 inline-block">
            📈 {currentTestimonial.result}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={currentTestimonial.avatar} 
              alt={currentTestimonial.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-foreground">{currentTestimonial.name}</div>
              <div className="text-sm text-muted-foreground">{currentTestimonial.role}</div>
              <div className="text-xs text-youtube-red font-medium">via {currentTestimonial.platform}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="sm"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full p-0 bg-card hover:bg-muted border-border"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full p-0 bg-card hover:bg-muted border-border"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-youtube-red w-8' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-6 mt-8 text-center">
        <div>
          <div className="text-2xl font-bold text-foreground">1000+</div>
          <div className="text-sm text-muted-foreground">Happy Clients</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">99%</div>
          <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">5.0★</div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
      </div>
    </div>
  )
}