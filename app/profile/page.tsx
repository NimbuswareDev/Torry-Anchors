import Header from '../../components/Header'
import ProfileContent from '../../components/ProfileContent'

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-4">
        <ProfileContent />
      </div>
    </main>
  )
} 