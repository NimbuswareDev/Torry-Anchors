'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Product {
  id: string
  name: string
  quantity: number
  image: string
}

interface OrderCardProps {
  order: {
    id: string
    date: string
    status: 'waiting' | 'delivered' | 'cancelled'
    statusText: string
    total: number
    products: Product[]
  }
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-orange-500 text-white'
      case 'delivered':
        return 'bg-green-500 text-white'
      case 'cancelled':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Order Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="font-bold text-gray-900">Order No: {order.id}</h3>
            <p className="text-sm text-gray-600">{order.date}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Status Badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.statusText}
          </span>
          
          {/* Track Order Link */}
          <button className="text-green-600 text-sm font-medium hover:text-green-700">
            Track Order
          </button>
        </div>
      </div>

      {/* Product Thumbnails and Total */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Product Thumbnails */}
          <div className="flex -space-x-2">
            {order.products.slice(0, 3).map((product, index) => (
              <div
                key={product.id}
                className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {order.products.length > 3 && (
              <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                +{order.products.length - 3}
              </div>
            )}
          </div>
          
          {/* Total */}
          <div className="ml-4">
            <span className="text-sm text-gray-600">Total</span>
            <div className="font-bold text-gray-900">₹{order.total}</div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-600" />
          ) : (
            <ChevronDown size={20} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Expanded Product Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Order Details</h4>
          <div className="space-y-3">
            {order.products.map((product) => (
              <div key={product.id} className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{product.name}</h5>
                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderCard 