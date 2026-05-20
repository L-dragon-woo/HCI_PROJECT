import { Code } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

interface ImageComparisonProps {
  beforeImage: string
  afterImage: string
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  beforeImage,
  afterImage,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const position = (x / rect.width) * 100
    setSliderPosition(position)
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleTouchEnd = () => setIsDragging(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    }
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleTouchEnd)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className="relative aspect-4/3 w-full max-w-4xl overflow-hidden rounded-2xl select-none"
    >
      {/* After Image (Coloring Book) - Bottom Layer */}
      <img
        src={afterImage}
        alt="Coloring Book"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Before Image (Original) - Top Layer with Clip */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="Original"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Slider Bar - Interaction Area */}
      <div
        className="absolute inset-y-0 z-30 -ml-6 w-12 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Visible Line */}
        <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-lg" />

        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-xl ring-4 ring-black/10">
          <Code />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-20 rounded-lg bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
        원본 사진
      </div>
      <div className="absolute right-4 bottom-4 z-20 rounded-lg bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
        도안
      </div>
    </div>
  )
}

export default ImageComparison
