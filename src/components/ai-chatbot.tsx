import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: Date
}

interface Lead {
  name?: string
  email?: string
  whatsapp?: string
  service?: string
  budget?: string
}

const quickReplies = [
  "What services do you offer?",
  "How much does a logo cost?",
  "What's your turnaround time?",
  "Can I see your portfolio?"
]

const faqResponses: Record<string, string> = {
  "services": `I offer three main services:
• **Logo Design** - Starting at $149
• **YouTube Thumbnails** - Starting at $49
• **Video Editing** - Starting at $299

Each service comes with unlimited revisions and fast delivery!`,
  
  "pricing": `My pricing is transparent and competitive:
• **Logo Design**: $149-$449 (2-7 days)
• **YouTube Thumbnails**: $49-$799 (24h-ongoing)
• **Video Editing**: $299-$1,299 (3-10 days)

All packages include unlimited revisions and source files!`,
  
  "turnaround": `My typical delivery times:
• **Logos**: 2-7 days (depending on package)
• **Thumbnails**: 24 hours (single) to 2-3 days (pack)
• **Video Editing**: 3-10 days (depending on complexity)

Need it faster? I offer rush delivery for +50% fee!`,
  
  "portfolio": `I've worked with 500+ clients including:
• YouTubers with 2M+ subscribers
• Tech startups that raised $10M+
• Fortune 500 companies

You can view my full portfolio at /portfolio or I can send you specific examples for your industry!`,
  
  "revisions": `All my packages include revisions:
• **Basic packages**: 2-5 revisions
• **Standard packages**: 5+ revisions  
• **Premium packages**: Unlimited revisions

I won't stop until you're 100% satisfied!`,
  
  "files": `You'll receive all the files you need:
• **High-resolution** PNG, JPG files
• **Vector files** (AI, SVG) for logos
• **Source files** (PSD, AI) available
• **Different formats** for various uses

Everything ready for print and web!`
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm Adi's Creative Assistant 🎨\n\nI'm here to help you with:\n• Service information & pricing\n• Portfolio examples\n• Project quotes\n• Scheduling consultations\n\nWhat can I help you with today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [leadData, setLeadData] = useState<Lead>({})
  const [collectingLeads, setCollectingLeads] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (content: string, type: 'bot' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    // Lead collection responses
    if (collectingLeads) {
      if (!leadData.name && !message.includes('@')) {
        setLeadData(prev => ({ ...prev, name: userMessage }))
        return `Nice to meet you, ${userMessage}! 👋\n\nWhat's your email address? I'll send you a free consultation guide and some portfolio examples.`
      }
      
      if (!leadData.email && message.includes('@')) {
        setLeadData(prev => ({ ...prev, email: userMessage }))
        return `Perfect! And what's your WhatsApp number? This way I can send you quick updates about your project.`
      }
      
      if (!leadData.whatsapp && /\d{10,}/.test(message)) {
        setLeadData(prev => ({ ...prev, whatsapp: userMessage }))
        return `Awesome! What type of design service are you most interested in?\n\n1. Logo Design\n2. YouTube Thumbnails\n3. Video Editing\n4. Complete Branding Package`
      }
      
      if (!leadData.service) {
        setLeadData(prev => ({ ...prev, service: userMessage }))
        return `Great choice! What's your approximate budget for this project?\n\n• Under $500\n• $500 - $1,000\n• $1,000 - $3,000\n• $3,000+\n• Not sure yet`
      }
      
      if (!leadData.budget) {
        setLeadData(prev => ({ ...prev, budget: userMessage }))
        setCollectingLeads(false)
        
        // Here you would normally send the lead data to your CRM/database
        console.log('Lead collected:', { ...leadData, budget: userMessage })
        
        return `Perfect! I've got all the details I need. 🎉\n\nI'll send you:\n✅ Free consultation guide\n✅ Relevant portfolio examples\n✅ Custom pricing proposal\n\nExpect an email within the next hour, and I'll follow up on WhatsApp!\n\n**Ready to get started?** Click here to schedule a free 15-minute call: [Schedule Call](https://calendly.com/adilgfx)`
      }
    }
    
    // FAQ responses
    if (message.includes('service') || message.includes('what do you')) {
      return faqResponses.services
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return faqResponses.pricing
    }
    
    if (message.includes('time') || message.includes('delivery') || message.includes('turnaround')) {
      return faqResponses.turnaround
    }
    
    if (message.includes('portfolio') || message.includes('work') || message.includes('example')) {
      return faqResponses.portfolio
    }
    
    if (message.includes('revision') || message.includes('change') || message.includes('edit')) {
      return faqResponses.revisions
    }
    
    if (message.includes('file') || message.includes('format') || message.includes('download')) {
      return faqResponses.files
    }
    
    if (message.includes('contact') || message.includes('hire') || message.includes('start')) {
      setCollectingLeads(true)
      return `I'd love to help you get started! 🚀\n\nLet me collect a few details so I can provide you with the best recommendations and pricing.\n\nFirst, what's your name?`
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `Hello! 👋 Great to meet you!\n\nI'm here to help you transform your brand with premium design. What brings you here today?\n\n• Need a professional logo?\n• Want high-converting thumbnails?\n• Looking for video editing services?\n• Complete branding makeover?`
    }
    
    // Default response
    return `I'd be happy to help! Here are some things I can assist you with:\n\n**Quick Actions:**\n• View pricing & packages\n• See portfolio examples\n• Get a custom quote\n• Schedule a free consultation\n\n**Or ask me about:**\n• Service details & turnaround times\n• Previous client results\n• File formats & revisions\n• Rush delivery options\n\nWhat would you like to know?`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    addMessage(inputValue, 'user')
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(inputValue)
      addMessage(response, 'bot')
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickReply = (reply: string) => {
    addMessage(reply, 'user')
    setIsTyping(true)
    
    setTimeout(() => {
      const response = getBotResponse(reply)
      addMessage(response, 'bot')
      setIsTyping(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 rounded-full bg-gradient-youtube hover:shadow-glow transition-all duration-300 ${
            isOpen ? 'scale-0' : 'scale-100'
          }`}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-80 h-96 bg-card border border-border rounded-xl shadow-large z-50 transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-youtube rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Adi's Assistant</h3>
              <p className="text-xs text-white/80">Usually replies instantly</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="h-64 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                  message.type === 'user' 
                    ? 'bg-gradient-youtube text-white' 
                    : 'bg-muted text-foreground'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    {message.type === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <div className="text-sm">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.slice(0, 2).map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 text-sm"
            />
            <Button onClick={handleSendMessage} size="sm" className="bg-gradient-youtube">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}