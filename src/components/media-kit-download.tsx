import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function MediaKitDownload() {
  const { toast } = useToast()

  const handleDownload = () => {
    // Create a link to download the media kit
    const link = document.createElement('a')
    link.href = '/media-kit.pdf'
    link.download = 'GFX-by-Adi-Media-Kit.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Media Kit Downloaded!",
      description: "Thanks for your interest. The media kit includes portfolio samples, testimonials, and pricing guide.",
    })
  }

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      className="border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white transition-smooth"
    >
      <FileText className="mr-2 h-4 w-4" />
      Download Media Kit
    </Button>
  )
}