import Header from '../../../components/Header'
import AddressSelection from '../../../components/AddressSelection'

export default function AddressPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-4">
        <AddressSelection />
      </div>
    </main>
  )
} 