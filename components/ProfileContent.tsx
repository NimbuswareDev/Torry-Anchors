'use client'

import { useEffect, useState } from 'react'
import { Edit, Plus } from 'lucide-react'
import { authAPI } from '../services/api'

const ProfileContent = () => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    authAPI.getProfile().then(setUser).catch(() => setUser(null))
  }, [])

  if (!user) return <div className="max-w-4xl mx-auto p-6">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* My Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Profile</h2>
        
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img src={"https://api.dicebear.com/7.x/initials/svg?seed=" + encodeURIComponent(user.email)} alt={user.email} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user.email}</h3>
            <p className="text-gray-600">{user.city || ''} {user.state || ''}</p>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
          <button
            onClick={() => setIsEditingPersonal(!isEditingPersonal)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Edit size={16} />
            <span className="text-sm">Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <p className="text-gray-900 font-medium">{user.firstName || '—'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <p className="text-gray-900 font-medium">{user.lastName || '—'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <p className="text-gray-900 font-medium">{user.email || '—'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <p className="text-gray-900 font-medium">{user.phone || '—'}</p>
          </div>
        </div>
      </div>

      {/* Default Address Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Default Address</h2>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Edit size={16} />
            <span className="text-sm">Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Building/flat no
            </label>
            <p className="text-gray-900 font-medium">{user.address || '—'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street/Landmark
            </label>
            <p className="text-gray-900 font-medium">—</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City/Town
            </label>
            <p className="text-gray-900 font-medium">{user.city || '—'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>
            <p className="text-gray-900 font-medium">{user.pincode || '—'}</p>
          </div>
        </div>
      </div>

      {/* Add Another Address Button */}
      <div className="flex justify-center">
        <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors">
          <Plus size={20} />
          <span>Add Another Address</span>
        </button>
      </div>
    </div>
  )
}

export default ProfileContent 