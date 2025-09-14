'use client'

interface PriceDetailsProps {
  totalMRP: number
  discount: number
  deliveryFee: number
  platformFee: number
  totalAmount: number
  itemCount: number
  buttonText?: string
  onButtonClick?: () => void
}

const PriceDetails = ({
  totalMRP,
  discount,
  deliveryFee,
  platformFee,
  totalAmount,
  itemCount,
  buttonText = "Place Order",
  onButtonClick
}: PriceDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        PRICE DETAILS ({itemCount} Items)
      </h3>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Total MRP</span>
          <span className="text-gray-900">₹{totalMRP}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Discount on MRP</span>
          <span className="text-green-600">-₹{discount}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="text-gray-900">₹{deliveryFee}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Platform Fee</span>
          <span className="text-gray-900">₹{platformFee}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-6"></div>

      {/* Total Amount */}
      <div className="flex justify-between mb-6">
        <span className="text-lg font-bold text-gray-900">Total Amount</span>
        <span className="text-lg font-bold text-gray-900">₹{totalAmount}</span>
      </div>

      {/* Action Button */}
      <button 
        onClick={onButtonClick}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors"
      >
        {buttonText}
      </button>
    </div>
  )
}

export default PriceDetails 