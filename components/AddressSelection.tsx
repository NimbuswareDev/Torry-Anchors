'use client'

import { useState, useEffect } from 'react'
import { Edit, Plus } from 'lucide-react'
import PriceDetails from './PriceDetails'

const AddressSelection = () => {
  const [selectedAddress, setSelectedAddress] = useState('')
  const [addresses, setAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Load addresses from API or context
  useEffect(() => {
    // TODO: Load addresses from user profile or API
    setAddresses([])
    setLoading(false)
  }, [])

  const selectedAddressData = addresses.find(addr => addr.id === selectedAddress)

  // Price details - these should come from cart context
  const totalMRP = 0
  const discount = 0
  const deliveryFee = 0
  const platformFee = 0
  const totalAmount = totalMRP - discount + deliveryFee + platformFee

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Cart - Address Selection</h1>
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
            <div className="absolute top-0 left-0 w-full h-full bg-green-500"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
              2
            </div>
            <span className="text-primary font-medium">Address</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Address Selection */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Delivery Address</h2>

            <div className="space-y-4">
              {/* Default Address */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="address"
                      id="default"
                      checked={selectedAddress === 'default'}
                      onChange={() => setSelectedAddress('default')}
                      className="mt-1 text-primary focus:ring-primary"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">Name: {addresses[0].name}</h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p>Building/flat no: {addresses[0].building}</p>
                        <p>City/Town: {addresses[0].city}</p>
                        <p>Street/Landmark: {addresses[0].street}</p>
                        <p>Pincode: {addresses[0].pincode}</p>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                    <Edit size={16} />
                    <span className="text-sm">Edit</span>
                  </button>
                </div>
              </div>

              {/* Other Address */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="address"
                      id="other"
                      checked={selectedAddress === 'other'}
                      onChange={() => setSelectedAddress('other')}
                      className="mt-1 text-primary focus:ring-primary"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">Name: {addresses[1].name}</h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p>Building/flat no: {addresses[1].building}</p>
                        <p>City/Town: {addresses[1].city}</p>
                        <p>Street/Landmark: {addresses[1].street}</p>
                        <p>Pincode: {addresses[1].pincode}</p>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                    <Edit size={16} />
                    <span className="text-sm">Edit</span>
                  </button>
                </div>
              </div>

              {/* Add Another Address Button */}
              <div className="flex justify-center pt-4">
                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors">
                  <Plus size={20} />
                  <span>Add Another Address</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="lg:col-span-1">
          <PriceDetails
            totalMRP={totalMRP}
            discount={discount}
            deliveryFee={deliveryFee}
            platformFee={platformFee}
            totalAmount={totalAmount}
            itemCount={2}
            buttonText="Continue"
          />
        </div>
      </div>
    </div>
  )
}

export default AddressSelection 