import Header from '../../components/Header'
import CartContent from '../../components/CartContent'

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-4">
        <CartContent />
      </div>
    </main>
  )
} 