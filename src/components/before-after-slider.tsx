import { useState, useRef } from "react"
import { Move, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BeforeAfterItem {
  before: string
  after: string
  title: string
  description: string
  result: string
}

interface BeforeAfterSliderProps {
  items: BeforeAfterItem[]
  className?: string
}

export function BeforeAfterSlider({ items, className = "" }: BeforeAfterSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentItem = items[currentIndex]

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setSliderPosition(50)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setSliderPosition(50)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div 
        ref={containerRef}
        className="relative w-full h-96 overflow-hidden rounded-xl cursor-col-resize select-none shadow-large"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute inset-0">
          <img src={currentItem.before} alt={`${currentItem.title} - Before`} className="w-full h-full object-cover" draggable={false} />
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">Before</div>
        </div>

        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
          <img src={currentItem.after} alt={`${currentItem.title} - After`} className="w-full h-full object-cover" draggable={false} />
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">After</div>
        </div>

        <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${sliderPosition}%` }}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-col-resize hover:scale-110 transition-transform" onMouseDown={handleMouseDown}>
            <Move className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {items.length > 1 && (
          <>
            <Button variant="outline" size="sm" onClick={goToPrevious} className="absolute left-4 bottom-4 w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white border-white/20">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToNext} className="absolute right-4 bottom-4 w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white border-white/20">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-foreground">{currentItem.title}</h3>
        <p className="text-muted-foreground">{currentItem.description}</p>
        <div className="bg-gradient-youtube/10 text-youtube-red px-4 py-2 rounded-lg text-sm font-medium inline-block">📈 {currentItem.result}</div>
      </div>

      {items.length > 1 && (
        <div className="flex justify-center space-x-2">
          {items.map((_, index) => (
            <button key={index} onClick={() => { setCurrentIndex(index); setSliderPosition(50) }} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-youtube-red w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`} />
          ))}
        </div>
      )}
    </div>
  )
}