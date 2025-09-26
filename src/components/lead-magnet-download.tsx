import { useState } from "react"
import { Download, Gift, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function LeadMagnetDownload() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      })
      return
    }
    
    setIsSubmitted(true)
    toast({
      title: "Templates Downloaded!",
      description: "Check your email for additional bonus templates.",
    })
    
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail("")
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="card-premium text-center">
        <div className="w-16 h-16 bg-gradient-youtube rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Download Started!</h3>
        <p className="text-muted-foreground text-sm">Check your email for bonus templates.</p>
      </div>
    )
  }

  return (
    <div className="card-premium">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-youtube rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Free YouTube Thumbnail Templates</h3>
        <p className="text-muted-foreground text-sm">Get 5 high-converting thumbnail templates</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        
        <Button type="submit" className="w-full bg-gradient-youtube hover:shadow-glow transition-all duration-300">
          <Download className="mr-2 h-4 w-4" />
          Download Free Templates
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">No spam. Unsubscribe anytime.</p>
      </form>
    </div>
  )
}