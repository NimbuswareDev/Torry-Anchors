import Header from '../../components/Header'
import OrderHistory from '../../components/OrderHistory'

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-4">
        <OrderHistory />
      </div>
    </main>
  )
} 