import Header from '../../components/Header'
import WishlistGrid from '../../components/WishlistGrid'

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-4">
        <WishlistGrid />
      </div>
    </main>
  )
} 