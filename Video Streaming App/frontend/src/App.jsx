import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddVideo from './components/AddVideo'
import FetchVideo from './components/FetchVideo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FetchVideo />} />
          <Route path="/add-video" element={<AddVideo />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
