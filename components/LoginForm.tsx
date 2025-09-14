'use client'

import { useState } from 'react'
import { User, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'

const LoginForm = () => {
  const router = useRouter()
  const { login, verifyLogin, isLoading } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [otp, setOtp] = useState('')
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    
    if (!showOtpInput) {
      // First step: Send login request
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        setShowOtpInput(true)
        setMessage(result.message)
        setIsSuccess(true)
      } else {
        setMessage(result.message)
        setIsSuccess(false)
      }
    } else {
      // Second step: Verify OTP
      const result = await verifyLogin(formData.email, otp)
      
      if (result.success) {
        setMessage('Login successful! Redirecting...')
        setIsSuccess(true)
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } else {
        setMessage(result.message)
        setIsSuccess(false)
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Log In to Your Account</h1>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`p-3 rounded-lg text-sm ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter Your Email Address"
              disabled={showOtpInput}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter Password"
              disabled={showOtpInput}
            />
          </div>
        </div>

        {/* OTP Input */}
        {showOtpInput && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">OTP</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
              />
            </div>
          </div>
        )}

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link href="/forgot-password" className="text-primary hover:text-primary-dark font-medium text-sm">
            Forgot Password?
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : (showOtpInput ? 'Verify OTP' : 'Log In')}
          </button>
          {showOtpInput && (
            <button
              type="button"
              onClick={() => {
                setShowOtpInput(false)
                setOtp('')
                setMessage('')
              }}
              className="w-full bg-white text-gray-700 py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
        </div>

        {/* Create Account Link */}
        <div className="text-center pt-4">
          <p className="text-gray-600">
            New to Torry Anchor?{' '}
            <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm 