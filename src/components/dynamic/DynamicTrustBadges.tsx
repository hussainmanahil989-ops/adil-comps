import { useTrustBadges } from "@/hooks/useDynamicContent"
import { Star, Shield, Award, Users, MessageCircle, Calendar, TrendingUp, Clock } from "lucide-react"

const iconMap: Record<string, any> = {
  Star,
  Shield,
  Award,
  Users,
  MessageCircle,
  Calendar,
  TrendingUp,
  Clock
};

export function DynamicTrustBadges() {
  const { trustBadges, loading, error } = useTrustBadges();

  if (loading) {
    return (
      <section className="py-12 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="h-6 bg-muted rounded w-64 mx-auto mb-2"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center p-4 rounded-lg bg-card border border-border animate-pulse">
                <div className="w-10 h-10 bg-muted rounded-full mx-auto mb-3"></div>
                <div className="h-4 bg-muted rounded mb-1"></div>
                <div className="h-6 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || trustBadges.length === 0) {
    // Fallback to default trust badges
    const defaultBadges = [
      { title: "Client Success", value: "500+", description: "Happy Clients", icon: "Users", color_class: "bg-gradient-youtube" },
      { title: "Quality Delivered", value: "5.0★", description: "Average Rating", icon: "Star", color_class: "bg-yellow-500" },
      { title: "Fast Turnaround", value: "24-48h", description: "Average Delivery", icon: "Clock", color_class: "bg-green-500" },
      { title: "Growth Results", value: "200%+", description: "CTR Improvement", icon: "TrendingUp", color_class: "bg-blue-500" }
    ];

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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {defaultBadges.map((badge, index) => {
              const Icon = iconMap[badge.icon] || Users;
              return (
                <div key={index} className="text-center p-4 rounded-lg bg-card border border-border hover:border-youtube-red/30 transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 ${badge.color_class}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{badge.title}</h3>
                  <div className="text-lg font-bold text-youtube-red">{badge.value}</div>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBadges.map((badge) => {
            const Icon = iconMap[badge.icon || 'Users'] || Users;
            return (
              <div key={badge.id} className="text-center p-4 rounded-lg bg-card border border-border hover:border-youtube-red/30 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 ${badge.color_class}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{badge.title}</h3>
                <div className="text-lg font-bold text-youtube-red">{badge.value}</div>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}