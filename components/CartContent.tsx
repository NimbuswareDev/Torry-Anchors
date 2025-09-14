'use client'

import { useEffect, useMemo, useState } from 'react'
import { Minus, Plus, X, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CartItem from './CartItem'
import PriceDetails from './PriceDetails'
import { cartAPI } from '../services/api'

const CartContent = () => {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<any[]>([])

  useEffect(() => {
    cartAPI.getCart()
      .then(({ items }) => setCartItems(items.map((i: any) => ({
        id: String(i.productId),
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
        selected: true
      }))))
      .catch((e) => {
        if (e?.response?.status === 401) router.push('/login')
      })
  }, [router])

  const [deliveryAddress, setDeliveryAddress] = useState({
    name: '',
    address: ''
  })

  const updateQuantity = async (id: string, newQuantity: number) => {
    try {
      await cartAPI.updateQuantity(id, Math.max(1, newQuantity))
      setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item))
    } catch {}
  }

  const removeItem = async (id: string) => {
    try {
      await cartAPI.removeFromCart(id)
      setCartItems(items => items.filter(item => item.id !== id))
    } catch {}
  }

  const toggleSelection = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    )
  }

  const selectedItems = cartItems.filter(item => item.selected)
  const totalMRP = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = 0 // TODO: Calculate based on applied coupons/discounts
  const deliveryFee = totalMRP > 500 ? 0 : 30 // Free delivery over ₹500
  const platformFee = 5
  const totalAmount = totalMRP - discount + deliveryFee + platformFee

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Cart - Price Details</h1>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
              1
            </div>
            <span className="text-green-500 font-medium">My Cart</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 relative">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-green-500"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold">
              2
            </div>
            <span className="text-gray-600 font-medium">Address</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 relative">
            <div className="absolute top-0 left-0 w-0 h-full bg-green-500"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <span className="text-gray-600 font-medium">Payment</span>
          </div>
        </div>
      </div>

                    {/* Delivery Address */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-medium">Deliver to: {deliveryAddress.name}</p>
                    <p className="text-gray-600 text-sm mt-1">{deliveryAddress.address}</p>
                  </div>
                  <Link href="/cart/address" className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    Change Address
                  </Link>
                </div>
              </div>

      {/* Items Selected */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
          <Minus size={12} className="text-white" />
        </div>
        <span className="text-gray-700 font-medium">{selectedItems.length}/{cartItems.length} Items Selected</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
              onToggleSelection={toggleSelection}
            />
          ))}
        </div>

                        {/* Price Details */}
                <div className="lg:col-span-1">
                  <PriceDetails
                    totalMRP={totalMRP}
                    discount={discount}
                    deliveryFee={deliveryFee}
                    platformFee={platformFee}
                    totalAmount={totalAmount}
                    itemCount={selectedItems.length}
                    buttonText="Place Order"
                    onButtonClick={() => router.push('/cart/address')}
                  />
                </div>
      </div>
    </div>
  )
}

export default CartContent 