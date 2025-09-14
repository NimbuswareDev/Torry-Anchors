'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      leftContent: {
        discount: "20% Off",
        title: "Order Now",
        terms: "*terms and conditions"
      },
      rightImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      id: 2,
      leftContent: {
        discount: "Free Delivery",
        title: "On Orders Above ₹500",
        terms: "*valid on selected items"
      },
      rightImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      leftContent: {
        discount: "Fresh Daily",
        title: "Premium Quality",
        terms: "*handpicked for you"
      },
      rightImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        {/* Carousel container */}
        <div className="relative h-64 md:h-80 lg:h-96">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex h-full">
                {/* Left side - Red background with text */}
                <div className="w-1/2 bg-primary relative overflow-hidden">
                  {/* Abstract shapes */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full opacity-30"></div>
                    <div className="absolute top-20 right-8 w-12 h-12 bg-white transform rotate-45 opacity-30"></div>
                    <div className="absolute bottom-8 left-8 w-8 h-8 bg-white rounded-full opacity-30"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-center h-full px-8 text-white">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                      {slide.leftContent.discount}
                    </div>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                      {slide.leftContent.title}
                    </div>
                    <div className="text-sm opacity-80">
                      {slide.leftContent.terms}
                    </div>
                  </div>
                </div>

                {/* Right side - Image */}
                <div className="w-1/2 relative">
                  <img
                    src={slide.rightImage}
                    alt="Fresh seafood"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-primary scale-125'
                  : 'bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroCarousel 