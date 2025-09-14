'use client'

import { useState } from 'react'
import Header from '../components/Header'
import HeroCarousel from '../components/HeroCarousel'
import CategoryNavigation from '../components/CategoryNavigation'
import ProductGrid from '../components/ProductGrid'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-4">
        <HeroCarousel />
        <CategoryNavigation 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <ProductGrid selectedCategory={selectedCategory} />
      </div>
    </main>
  )
}