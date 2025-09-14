'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import { User } from 'lucide-react'
import Link from 'next/link'

const RegisterVerifyPage = () => {
  const router = useRouter()
  const { verifyRegister, isLoading, register } = useAuth()
  
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [registrationData, setRegistrationData] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('registrationData')
      if (storedData) {
        setRegistrationData(JSON.parse(storedData))
      } else {
        router.push('/register')
      }
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    
    if (!registrationData) {
      setMessage('Registration data not found. Please register again.')
      setIsSuccess(false)
      return
    }
    
    if (otp.length !== 6) {
      setMessage('Please enter a valid 6-digit OTP')
      setIsSuccess(false)
      return
    }
    
    try {
      const result = await verifyRegister(registrationData.email, otp, registrationData.password)
      
      if (result.success) {
        setMessage('Registration successful! Redirecting to login...')
        setIsSuccess(true)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('registrationData')
        }
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setMessage(result.message)
        setIsSuccess(false)
      }
    } catch (error) {
      setMessage('OTP verification failed. Please try again.')
      setIsSuccess(false)
    }
  }

  const handleResendOTP = async () => {
    if (!registrationData) return
    try {
      const result = await register(registrationData.email, registrationData.password)
      if (result.success) {
        setMessage('OTP resent successfully!')
        setIsSuccess(true)
      } else {
        setMessage('Failed to resend OTP. Please try again.')
        setIsSuccess(false)
      }
    } catch (error) {
      setMessage('Failed to resend OTP. Please try again.')
      setIsSuccess(false)
    }
  }

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
          <p className="text-gray-600">
            We've sent a 6-digit OTP to {registrationData.email}
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-3 rounded-lg text-sm mb-6 ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Enter OTP</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                autoFocus
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isLoading}
              className="w-full bg-white text-gray-700 py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Resend OTP
            </button>
          </div>

          {/* Back to Register Link */}
          <div className="text-center pt-4">
            <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
              ← Back to Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterVerifyPage 