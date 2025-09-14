'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, MapPin, ShoppingCart, Heart, FileText, User, Filter } from 'lucide-react'

const Header = () => {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [pincode, setPincode] = useState('')

  const navItems = [
    { name: 'Home', icon: null, href: '/' },
    { name: 'Wishlist', icon: Heart, href: '/wishlist' },
    { name: 'Orders', icon: FileText, href: '/orders' },
    { name: 'Profile', icon: User, href: '/profile' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with logo and navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-secondary">TORRY ANCHOR</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-secondary hover:bg-gray-100'
                }`}
              >
                {item.icon && <item.icon size={16} />}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Search and cart section */}
        <div className="flex items-center space-x-4 py-4 border-t border-gray-100">
          {/* Search bar */}
          <div className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Filter size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Pincode input */}
          <div className="hidden sm:flex items-center space-x-2">
            <MapPin className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-white text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header 