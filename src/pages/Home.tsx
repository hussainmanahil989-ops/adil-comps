import { SEOHead } from "@/components/seo-head"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { CheckCircle } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { PortfolioHighlights } from "@/components/portfolio-highlights"
import { ServicesOverview } from "@/components/services-overview"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CaseStudies } from "@/components/case-studies"
import { TrustBadges } from "@/components/trust-badges"

export default function Home() {
  return (
    <>
      <SEOHead 
        title="Professional Logo Designer & Video Editor | GFX by Adi"
        description="Transform your brand with premium logo design, YouTube thumbnails, and video editing services. Fast delivery, unlimited revisions, and proven results for 1000+ clients."
        keywords="logo design, YouTube thumbnails, video editing, graphic design, branding, creative services"
        url="/"
      />
      <main className="pt-16">
        <HeroSection />
        <TrustBadges />
        <PortfolioHighlights />
        <ServicesOverview />
        <TestimonialsSection />
        <CaseStudies />
        
        {/* Newsletter & Lead Magnet Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <NewsletterSignup showLeadMagnet={true} />
              <div className="card-premium">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Why Choose Adil?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-muted-foreground">1000+ satisfied clients worldwide</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-muted-foreground">Average 200% CTR improvement</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-muted-foreground">24-48 hour delivery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-muted-foreground">Unlimited revisions included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}