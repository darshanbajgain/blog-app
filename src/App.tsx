function App() {
  return (
    <div className="min-h-screen bg-mist flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Welcome to the Blog
      </h1>
      <p className="text-lg text-secondary mb-8">
        Start building something amazing!
      </p>
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition">
          Get Started
        </button>
        <button className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition">
          Learn More
        </button>
      </div>
    </div>
  )
}

export default App