import { Star, Shield, Award, Users, MessageCircle, Calendar, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const trustBadges = [
  {
    name: "Client Success",
    stat: "500+",
    description: "Happy Clients",
    icon: Users,
    color: "bg-gradient-youtube"
  },
  {
    name: "Quality Delivered",
    stat: "5.0★",
    description: "Average Rating",
    icon: Star,
    color: "bg-yellow-500"
  },
  {
    name: "Fast Turnaround", 
    stat: "24-48h",
    description: "Average Delivery",
    icon: Clock,
    color: "bg-green-500"
  },
  {
    name: "Growth Results",
    stat: "200%+",
    description: "CTR Improvement",
    icon: TrendingUp,
    color: "bg-blue-500"
  }
]

const platformBadges = [
  {
    name: 'Fiverr Pro',
    rating: '5.0',
    reviews: '150+ reviews',
    color: 'bg-green-500',
    icon: Shield
  },
  {
    name: 'Premium Designer',
    rating: '100%',
    reviews: '98% satisfaction',
    color: 'bg-blue-500',
    icon: Award
  }
]

interface TrustBadgesProps {
  variant?: 'homepage' | 'full' | 'compact'
  className?: string
}

export function TrustBadges({ 
  variant = 'homepage',
  className = '' 
}: TrustBadgesProps) {
  
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
        {platformBadges.map((platform) => (
          <div key={platform.name} className="flex items-center space-x-2 text-sm">
            <div className={`w-6 h-6 rounded flex items-center justify-center ${platform.color}`}>
              <platform.icon className="h-3 w-3 text-white" />
            </div>
            <span className="font-medium text-foreground">{platform.name}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-youtube-red fill-current" />
              <span className="font-semibold text-foreground">{platform.rating}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'homepage') {
    return (
      <section className="py-12 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Trusted by <span className="gradient-text-youtube">500+</span> Clients Worldwide
            </h2>
            <p className="text-sm text-muted-foreground">
              Join successful businesses and creators who chose our premium design services
            </p>
          </div>

          {/* Trust badges grid - Compact */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {trustBadges.map((badge) => (
              <div key={badge.name} className="text-center p-4 rounded-lg bg-card border border-border hover:border-youtube-red/30 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 ${badge.color}`}>
                  <badge.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{badge.name}</h3>
                <div className="text-lg font-bold text-youtube-red">{badge.stat}</div>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>

          {/* Platform badges - Inline */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            {platformBadges.map((platform) => (
              <div key={platform.name} className="flex items-center space-x-3 p-3 rounded-lg bg-card border border-border hover:border-youtube-red/30 transition-all duration-300">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.color}`}>
                  <platform.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground text-sm">{platform.name}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-youtube-red fill-current" />
                      <span className="font-semibold text-foreground text-sm">{platform.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{platform.reviews}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Full variant for dedicated pages
  return (
    <div className={className}>
      {/* ... keep existing code (full variant implementation) */}
    </div>
  )
}