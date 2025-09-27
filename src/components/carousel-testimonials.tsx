import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTestimonials } from "@/hooks/useSupabaseData"

export function CarouselTestimonials() {
  const { testimonials, loading, error } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Use fallback testimonials if no data from database
  const fallbackTestimonials = [
    {
      id: 1,
      client_name: "Alex Chen",
      client_role: "YouTube Creator (2.3M subscribers)",
      review: "Adi's thumbnails increased my CTR by 180% in just 2 weeks. My channel went from 50K to 500K views per video. Absolutely game-changing work!",
      rating: 5,
      source: "YouTube"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  useEffect(() => {
    if (!isAutoPlaying || loading) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, displayTestimonials.length, loading])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <div className="relative">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-large min-h-[300px] animate-pulse">
          <div className="h-6 w-6 bg-muted rounded mb-4"></div>
          <div className="h-4 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded mb-4"></div>
          <div className="h-8 bg-muted rounded mb-6"></div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-muted rounded-full"></div>
            <div>
              <div className="h-4 bg-muted rounded mb-1"></div>
              <div className="h-3 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentTestimonial = displayTestimonials[currentIndex]

  return (
    <div className="relative">
      {/* Main testimonial card */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-large min-h-[300px] flex flex-col justify-between">
        <div>
          <Quote className="h-8 w-8 text-youtube-red mb-4" />
          
          <blockquote className="text-lg text-foreground mb-6 italic">
            "{currentTestimonial.review}"
          </blockquote>
          
          <div className="bg-gradient-youtube/10 text-youtube-red px-4 py-2 rounded-lg text-sm font-medium mb-6 inline-block">
            ⭐ {currentTestimonial.rating || 5}/5 Stars
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-youtube flex items-center justify-center text-white font-semibold">
              {currentTestimonial.client_name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <div className="font-semibold text-foreground">{currentTestimonial.client_name}</div>
              {currentTestimonial.client_role && (
                <div className="text-sm text-muted-foreground">{currentTestimonial.client_role}</div>
              )}
              {currentTestimonial.source && (
                <div className="text-xs text-youtube-red font-medium">via {currentTestimonial.source}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
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
        {displayTestimonials.map((_, index) => (
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