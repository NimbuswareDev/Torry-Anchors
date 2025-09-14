'use client'

interface CategoryNavigationProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const CategoryNavigation = ({ selectedCategory, onCategoryChange }: CategoryNavigationProps) => {

  const categories = [
    'All',
    'Freshwater',
    'Seawater',
    'Prawns & crabs',
    'Chicken & mutton'
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex items-center justify-center">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryNavigation 