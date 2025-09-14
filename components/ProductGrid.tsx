'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { productsAPI } from '../services/api'

interface ProductGridProps {
  selectedCategory: string
}

const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    productsAPI.getAll()
      .then(setProducts)
      .catch((e) => setError(e?.response?.data?.error || 'Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products)
    } else {
      const categoryMap: { [key: string]: string } = {
        'Freshwater': 'freshwater',
        'Seawater': 'seawater',
        'Prawns & crabs': 'prawns_crabs',
        'Chicken & mutton': 'chicken_mutton'
      }
      const filtered = products.filter(p => p.category === categoryMap[selectedCategory])
      setFilteredProducts(filtered)
    }
  }, [products, selectedCategory])

  if (loading) return <div className="max-w-7xl mx-auto p-6">Loading...</div>
  if (error) return <div className="max-w-7xl mx-auto p-6 text-red-600">{error}</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={{
              id: String(p.id),
              name: p.name,
              description: p.description ?? '',
              quantity: p.quantity ? `${p.quantity} pcs` : '',
              currentPrice: Number(p.price),
              originalPrice: Number(p.price),
              discount: '',
              image: p.image || p.imageUrl || ''
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid