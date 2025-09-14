'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cartAPI } from '../services/api'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    quantity: string
    currentPrice: number
    originalPrice: number
    discount: string
    image: string
  }
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isAdded, setIsAdded] = useState(false)
  const router = useRouter()

  const handleAddToCart = async () => {
    try {
      await cartAPI.addToCart(product.id, 1)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    } catch (e: any) {
      if (e?.response?.status === 401) router.push('/login')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-xs mb-2">
          {product.description}
        </p>
        <p className="text-gray-500 text-xs mb-3">
          {product.quantity}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.currentPrice}
            </span>
            {product.originalPrice > product.currentPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            isAdded
              ? 'bg-green-500 text-white'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {isAdded ? (
            <>
              <span>✓ Added</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ProductCard 