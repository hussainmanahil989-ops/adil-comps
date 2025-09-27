import { Palette, Play, Zap, Settings, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useServiceHighlights } from "@/hooks/useDynamicContent"

const iconMap: Record<string, any> = {
  Palette,
  Play,
  Zap,
  Settings,
  CheckCircle
};

export function DynamicServicesOverview() {
  const { serviceHighlights, loading, error } = useServiceHighlights();

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-muted rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card-premium animate-pulse">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-xl mx-auto mb-6"></div>
                  <div className="h-6 bg-muted rounded mb-3"></div>
                  <div className="h-4 bg-muted rounded mb-6"></div>
                  <div className="space-y-3 mb-8">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="h-4 bg-muted rounded"></div>
                    ))}
                  </div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-6"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || serviceHighlights.length === 0) {
    // Fallback to default services
    const defaultServices = [
      {
        icon: "Palette",
        title: "Logo Design",
        description: "Professional logos that make your brand unforgettable",
        features: ["3 Concepts", "Unlimited Revisions", "All File Formats", "Copyright Transfer"],
        price: "Chat for Quote!",
        popular: false
      },
      {
        icon: "Play",
        title: "YouTube Thumbnails",
        description: "Eye-catching thumbnails that boost your click-through rates",
        features: ["High CTR Design", "A/B Test Ready", "Mobile Optimized", "24h Delivery"],
        price: "Chat for Quote!",
        popular: true
      },
      {
        icon: "Zap",
        title: "Video Editing",
        description: "Professional video editing that keeps viewers engaged",
        features: ["Color Grading", "Motion Graphics", "Sound Design", "Fast Turnaround"],
        price: "Chat for Quote!",
        popular: false
      },
      {
        icon: "Settings",
        title: "YouTube Channel Setup",
        description: "Complete channel optimization for maximum growth and visibility",
        features: ["Channel Branding", "SEO Optimization", "Analytics Setup", "Strategy Guide"],
        price: "Chat for Quote!",
        popular: false
      }
    ];

    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Services That <span className="gradient-text-youtube">Drive Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional design services tailored to grow your business and increase conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {defaultServices.map((service, index) => {
              const Icon = iconMap[service.icon] || Palette;
              return (
                <div 
                  key={index}
                  className={`relative card-premium ${service.popular ? 'ring-2 ring-youtube-red' : ''}`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-youtube text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-youtube rounded-xl mb-6">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-youtube-red" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-lg font-bold text-youtube-red mb-2">Pricing depends on your project.</div>
                    <div className="text-base font-medium text-foreground mb-6">Chat with me for a free quote!</div>
                    
                    <Button 
                      className={`w-full font-medium ${
                        service.popular 
                          ? 'bg-gradient-youtube hover:shadow-glow' 
                          : 'variant-outline border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white'
                      } transition-all duration-300`}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Services That <span className="gradient-text-youtube">Drive Results</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional design services tailored to grow your business and increase conversions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceHighlights.map((service) => {
            const Icon = iconMap[service.icon || 'Palette'] || Palette;
            return (
              <div 
                key={service.id}
                className={`relative card-premium ${service.is_popular ? 'ring-2 ring-youtube-red' : ''}`}
              >
                {service.is_popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-youtube text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-youtube rounded-xl mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                  {service.subtitle && (
                    <p className="text-sm text-youtube-red font-medium mb-2">{service.subtitle}</p>
                  )}
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center justify-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-youtube-red" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-lg font-bold text-youtube-red mb-2">Pricing depends on your project.</div>
                  <div className="text-base font-medium text-foreground mb-6">{service.price_text}</div>
                  
                  <Button 
                    className={`w-full font-medium ${
                      service.is_popular 
                        ? 'bg-gradient-youtube hover:shadow-glow' 
                        : 'variant-outline border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white'
                    } transition-all duration-300`}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-subtle rounded-2xl">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Need a Custom Package?
          </h3>
          <p className="text-muted-foreground mb-6">
            Let's discuss your project and create a tailored solution that fits your needs and budget.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-youtube hover:shadow-glow transition-all duration-300 font-semibold px-8 py-4"
          >
            Schedule Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}