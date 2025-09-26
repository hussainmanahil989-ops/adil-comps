import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Mail, Gift } from "lucide-react"
import { z } from "zod"

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters").optional()
})

interface NewsletterSignupProps {
  variant?: "default" | "inline" | "popup"
  showLeadMagnet?: boolean
}

export function NewsletterSignup({ 
  variant = "default", 
  showLeadMagnet = true 
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate input
      emailSchema.parse({ email, name })

      // TODO: Integrate with email service (requires backend)
      // For now, just show success message
      console.log("Newsletter signup:", { email, name })
      
      toast({
        title: "Successfully subscribed!",
        description: showLeadMagnet 
          ? "Check your email for your free YouTube thumbnail templates!"
          : "You'll receive our latest design tips and updates.",
      })

      setEmail("")
      setName("")
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid input",
          description: error.issues[0].message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Subscription failed",
          description: "Please try again later.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-gradient-youtube hover:shadow-glow"
        >
          {isLoading ? "..." : "Subscribe"}
        </Button>
      </form>
    )
  }

  return (
    <div className="card-premium">
      <div className="text-center mb-6">
        {showLeadMagnet && (
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-youtube rounded-full mb-4">
            <Gift className="h-6 w-6 text-white" />
          </div>
        )}
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {showLeadMagnet ? "Get 5 Free YouTube Thumbnail Templates" : "Stay Updated"}
        </h3>
        <p className="text-muted-foreground">
          {showLeadMagnet 
            ? "Join 1000+ creators and get professional thumbnail templates delivered to your inbox!"
            : "Get the latest design tips, trends, and exclusive tutorials."
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-gradient-youtube hover:shadow-glow transition-all duration-300"
          disabled={isLoading}
        >
          <Mail className="mr-2 h-4 w-4" />
          {isLoading ? "Subscribing..." : showLeadMagnet ? "Get Free Templates" : "Subscribe Now"}
        </Button>
      </form>

      {showLeadMagnet && (
        <p className="text-xs text-muted-foreground text-center mt-4">
          No spam, unsubscribe anytime. Your email is safe with us.
        </p>
      )}
    </div>
  )
}