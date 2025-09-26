import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MediaKitDownload } from "@/components/media-kit-download"

const footerLinks = {
  services: [
    { name: "Logo Design", href: "/services#logo" },
    { name: "YouTube Thumbnails", href: "/services#thumbnails" },
    { name: "Video Editing", href: "/services#video" },
    { name: "Channel Management", href: "/services#management" }
  ],
  explore: [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Case Studies", href: "/portfolio#case-studies" }
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" }
  ],
  business: [
    { name: "Hire Me (Direct)", href: "/contact" },
    { name: "Fiverr Profile", href: "https://fiverr.com/adilgfx" },
    { name: "Media Kit (PDF)", href: "#", special: "download" }
  ]
}

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/adilgfx", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/adilgfx", icon: Instagram },
  { name: "LinkedIn", href: "https://linkedin.com/in/adilgfx", icon: Linkedin }
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter section */}
      <div className="border-b border-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-primary-foreground/80">
                Get free design tips, latest trends, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="bg-gradient-youtube hover:shadow-glow whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-youtube rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl">Adil GFX</span>
            </Link>
            <p className="text-primary-foreground/80 mb-6 text-sm">
              Professional designer helping brands and YouTubers grow through premium visual content.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-youtube-red transition-smooth"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-white text-sm transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-white text-sm transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-white text-sm transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="font-semibold mb-4">Business</h4>
            <ul className="space-y-2">
              {footerLinks.business.map((link) => (
                <li key={link.name}>
                  {link.special === "download" ? (
                    <div className="text-primary-foreground/80 hover:text-white text-sm transition-smooth">
                      <MediaKitDownload />
                    </div>
                  ) : (
                    <Link 
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-white text-sm transition-smooth"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/80 text-sm">
              © 2025 GFX by Adi. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="mailto:hello@adilgfx.com" className="flex items-center space-x-2 text-primary-foreground/80 hover:text-white text-sm transition-smooth">
                <Mail className="h-4 w-4" />
                <span>hello@adilgfx.com</span>
              </a>
              <a href="https://wa.me/1234567890" className="flex items-center space-x-2 text-primary-foreground/80 hover:text-white text-sm transition-smooth">
                <Phone className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}