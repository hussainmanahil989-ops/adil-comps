import { CheckCircle, Clock, MessageCircle, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const services = [
  {
    title: "Logo Design",
    subtitle: "Professional Brand Identity",
    description: "Create a memorable logo that builds trust and recognition for your brand.",
    icon: "🎨",
    features: [
      "Multiple concept variations",
      "Unlimited revisions",
      "All file formats included",
      "Complete brand guidelines",
      "Fast 24-48h delivery",
      "Commercial usage rights"
    ],
    benefits: [
      "300% brand recognition increase",
      "Professional credibility boost",
      "Multi-platform compatibility",
      "Timeless design approach"
    ]
  },
  {
    title: "YouTube Thumbnails",
    subtitle: "High-Converting Click Magnets",
    description: "Eye-catching thumbnails that boost your CTR and grow your channel.",
    icon: "📺",
    features: [
      "High-CTR design strategies",
      "A/B testing variations",
      "Mobile-optimized designs",
      "Template series creation",
      "24-hour turnaround",
      "Ongoing monthly packages"
    ],
    benefits: [
      "180% CTR improvement average",
      "Consistent visual branding",
      "Viral potential optimization",
      "Algorithm-friendly designs"
    ]
  },
  {
    title: "Video Editing",
    subtitle: "Professional Video Production",
    description: "Transform raw footage into engaging videos that keep viewers watching.",
    icon: "🎬",
    features: [
      "Cinematic color grading",
      "Motion graphics & animations",
      "Professional sound design",
      "Multiple format delivery",
      "Social media optimization",
      "Collaborative revision process"
    ],
    benefits: [
      "$500K+ sales generated",
      "90%+ audience retention",
      "Professional production quality",
      "Cross-platform optimization"
    ]
  }
]

const processSteps = [
  {
    number: "1",
    title: "Discovery Call",
    description: "Free 15-minute consultation to understand your vision and goals"
  },
  {
    number: "2", 
    title: "Custom Proposal",
    description: "Tailored pricing and timeline based on your specific needs"
  },
  {
    number: "3",
    title: "Design & Revisions", 
    description: "Collaborative design process with unlimited revisions"
  },
  {
    number: "4",
    title: "Final Delivery",
    description: "All files delivered in required formats with usage guidelines"
  }
]

export default function Services() {
  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Services & <span className="gradient-text-youtube">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional design services with transparent pricing. Choose the package that fits your needs, 
            or contact me for a custom solution.
          </p>
        </div>

        {/* Services */}
        {services.map((service, serviceIndex) => (
          <div key={service.title} className={`mb-20 ${serviceIndex !== services.length - 1 ? 'border-b border-border pb-20' : ''}`}>
            {/* Service header */}
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">{service.icon}</div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{service.title}</h2>
              <p className="text-lg text-youtube-red font-medium mb-4">{service.subtitle}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">{service.description}</p>
            </div>

            {/* Service details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* What's Included */}
              <div className="card-premium">
                <h3 className="text-xl font-semibold text-foreground mb-6">What's Included</h3>
                <div className="space-y-4">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-youtube-red flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results & Benefits */}
              <div className="card-premium">
                <h3 className="text-xl font-semibold text-foreground mb-6">Expected Results</h3>
                <div className="space-y-4">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-youtube rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">📈</span>
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="bg-gradient-youtube hover:shadow-glow transition-all duration-300 font-semibold px-8 py-4"
                >
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white font-semibold px-8 py-4 transition-smooth"
                onClick={() => window.open('https://wa.me/1234567890?text=Hi! I\'d like to discuss pricing for ' + service.title, '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp for Pricing
              </Button>
            </div>
          </div>
        ))}

        {/* Process section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 bg-gradient-youtube rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white font-bold">{step.number}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center">
          <div className="bg-gradient-subtle rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Brand?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every project is unique. Let's discuss your specific needs and create a custom solution that fits your vision and budget perfectly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="bg-gradient-youtube hover:shadow-glow transition-all duration-300 font-semibold px-8 py-4"
                >
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white font-semibold px-8 py-4 transition-smooth"
                onClick={() => window.open('https://calendly.com/adilgfx/consultation', '_blank')}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}