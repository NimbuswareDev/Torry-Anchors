'use client'

import { Minus, Plus, X, Check } from 'lucide-react'

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
    selected: boolean
  }
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onToggleSelection: (id: string) => void
}

const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleSelection }: CartItemProps) => {
  const total = item.price * item.quantity

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <Minus size={12} />
            </button>
            <span className="text-gray-900 font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <Plus size={12} />
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="ml-2 text-gray-400 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Price and Total */}
        <div className="text-right">
          <div className="mb-1">
            <span className="text-sm text-gray-600">Price</span>
            <p className="text-gray-900 font-medium">₹{item.price}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Total</span>
            <p className="text-gray-900 font-medium">₹{total}</p>
          </div>
        </div>

        {/* Selection Checkbox */}
        <div className="flex items-center">
          <button
            onClick={() => onToggleSelection(item.id)}
            className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-colors ${
              item.selected
                ? 'bg-red-500 border-red-500'
                : 'border-gray-300 hover:border-red-300'
            }`}
          >
            {item.selected && <Check size={12} className="text-white" />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem 