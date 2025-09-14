import RegisterForm from '../../components/RegisterForm'

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Image */}
          <div className="lg:w-1/2 bg-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              <img
                src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Fresh meat and seafood"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 p-8 text-white">
              <h1 className="text-3xl font-bold mb-4">Fresh & Quality</h1>
              <p className="text-lg opacity-90">Premium meat and seafood delivered to your doorstep</p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="lg:w-1/2 p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  )
} 