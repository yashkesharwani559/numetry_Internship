import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NA from './components/NumberAuthenticator/NumberAuthenticator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <NA />
      </div>
    </>
  )
}

export default App
