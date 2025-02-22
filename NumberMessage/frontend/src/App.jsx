import { useState } from 'react'
import './App.css'
import FormComponent from './components/FormComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <FormComponent />
      </div>
    </>
  )
}

export default App
