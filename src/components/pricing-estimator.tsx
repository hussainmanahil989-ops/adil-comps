import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, Clock, Zap, Star } from "lucide-react"

interface PricingOption {
  service: string
  basePrice: number
  rushMultiplier: number
  complexityMultipliers: {
    basic: number
    standard: number
    premium: number
  }
}

const pricingOptions: PricingOption[] = [
  {
    service: "logo",
    basePrice: 150,
    rushMultiplier: 1.5,
    complexityMultipliers: { basic: 0.7, standard: 1, premium: 1.8 }
  },
  {
    service: "thumbnails",
    basePrice: 25,
    rushMultiplier: 1.3,
    complexityMultipliers: { basic: 0.8, standard: 1, premium: 1.4 }
  },
  {
    service: "video",
    basePrice: 200,
    rushMultiplier: 1.4,
    complexityMultipliers: { basic: 0.6, standard: 1, premium: 2.2 }
  },
  {
    service: "branding",
    basePrice: 800,
    rushMultiplier: 1.3,
    complexityMultipliers: { basic: 0.8, standard: 1, premium: 1.6 }
  }
]

export function PricingEstimator() {
  const [service, setService] = useState<string>("")
  const [quantity, setQuantity] = useState([1])
  const [complexity, setComplexity] = useState<string>("")
  const [timeline, setTimeline] = useState<string>("")
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [estimatedDays, setEstimatedDays] = useState(0)

  useEffect(() => {
    if (!service || !complexity || !timeline) {
      setEstimatedPrice(0)
      setEstimatedDays(0)
      return
    }

    const option = pricingOptions.find(opt => opt.service === service)
    if (!option) return

    let basePrice = option.basePrice
    const complexityMultiplier = option.complexityMultipliers[complexity as keyof typeof option.complexityMultipliers]
    const rushMultiplier = timeline === "rush" ? option.rushMultiplier : 1
    const quantityValue = quantity[0]

    const totalPrice = Math.round(basePrice * complexityMultiplier * rushMultiplier * quantityValue)
    setEstimatedPrice(totalPrice)

    // Estimate delivery days
    let baseDays = service === "logo" ? 3 : service === "branding" ? 7 : service === "video" ? 5 : 2
    if (complexity === "premium") baseDays += 2
    if (timeline === "rush") baseDays = Math.max(1, Math.ceil(baseDays / 2))
    baseDays = Math.ceil(baseDays * (quantityValue > 5 ? 1.5 : quantityValue > 2 ? 1.2 : 1))
    
    setEstimatedDays(baseDays)
  }, [service, quantity, complexity, timeline])

  const handleGetQuote = () => {
    const details = {
      service,
      quantity: quantity[0],
      complexity,
      timeline,
      estimatedPrice,
      estimatedDays
    }
    
    const message = `Hi! I'm interested in ${service} design. Here are my project details:
    
Service: ${service.charAt(0).toUpperCase() + service.slice(1)}
Quantity: ${quantity[0]}
Complexity: ${complexity.charAt(0).toUpperCase() + complexity.slice(1)}
Timeline: ${timeline === "rush" ? "Rush delivery" : "Standard delivery"}
Estimated: $${estimatedPrice} (${estimatedDays} days)

Can we discuss this project?`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/1234567890?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="card-premium">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-youtube rounded-lg flex items-center justify-center">
          <Calculator className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Pricing Estimator</h3>
          <p className="text-sm text-muted-foreground">Get an instant quote for your project</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Service Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Service Type *
          </label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="logo">Logo Design</SelectItem>
              <SelectItem value="thumbnails">YouTube Thumbnails</SelectItem>
              <SelectItem value="video">Video Editing</SelectItem>
              <SelectItem value="branding">Complete Branding Package</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Quantity: {quantity[0]} {service === "thumbnails" ? "thumbnails" : service === "video" ? "videos" : "designs"}
          </label>
          <Slider
            value={quantity}
            onValueChange={setQuantity}
            max={service === "thumbnails" ? 20 : service === "video" ? 10 : 5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1</span>
            <span>{service === "thumbnails" ? "20" : service === "video" ? "10" : "5"}</span>
          </div>
        </div>

        {/* Complexity */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Complexity Level *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["basic", "standard", "premium"].map((level) => (
              <Card
                key={level}
                className={`p-3 cursor-pointer transition-all duration-200 ${
                  complexity === level 
                    ? "border-youtube-red bg-youtube-red/5" 
                    : "hover:border-youtube-red/50"
                }`}
                onClick={() => setComplexity(level)}
              >
                <div className="text-center">
                  <div className="text-sm font-medium capitalize">{level}</div>
                  {level === "basic" && <div className="text-xs text-muted-foreground">Simple & clean</div>}
                  {level === "standard" && <div className="text-xs text-muted-foreground">Professional</div>}
                  {level === "premium" && <div className="text-xs text-muted-foreground">Complex & detailed</div>}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Delivery Timeline *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Card
              className={`p-4 cursor-pointer transition-all duration-200 ${
                timeline === "standard" 
                  ? "border-youtube-red bg-youtube-red/5" 
                  : "hover:border-youtube-red/50"
              }`}
              onClick={() => setTimeline("standard")}
            >
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Standard</div>
                  <div className="text-xs text-muted-foreground">Regular pricing</div>
                </div>
              </div>
            </Card>
            <Card
              className={`p-4 cursor-pointer transition-all duration-200 ${
                timeline === "rush" 
                  ? "border-youtube-red bg-youtube-red/5" 
                  : "hover:border-youtube-red/50"
              }`}
              onClick={() => setTimeline("rush")}
            >
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-youtube-red" />
                <div>
                  <div className="text-sm font-medium">Rush Order</div>
                  <div className="text-xs text-muted-foreground">+30-50% fee</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Price Estimate */}
        {estimatedPrice > 0 && (
          <div className="bg-gradient-subtle rounded-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="h-5 w-5 text-youtube-red" />
              <h4 className="text-lg font-semibold text-foreground">Estimated Price</h4>
            </div>
            <div className="text-3xl font-bold text-youtube-red mb-2">
              ${estimatedPrice.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              Delivery: {estimatedDays} business days
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="secondary">Professional quality</Badge>
              <Badge variant="secondary">Unlimited revisions</Badge>
              <Badge variant="secondary">Source files included</Badge>
            </div>
            <Button 
              onClick={handleGetQuote}
              className="w-full bg-gradient-youtube hover:shadow-glow transition-all duration-300"
            >
              Get Detailed Quote via WhatsApp
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground text-center">
          * This is an estimate. Final pricing may vary based on specific requirements.
        </div>
      </div>
    </div>
  )
}