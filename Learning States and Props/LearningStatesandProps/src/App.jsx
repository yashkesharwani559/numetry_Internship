import { useState, useEffect } from 'react'
import Page from './components/Page'

function App() {

  return (
    <>
      <h1 className="text-6xl font-extrabold text-center mt-8 mb-6 
               bg-gradient-to-r from-blue-500 to-purple-500 
               text-transparent bg-clip-text drop-shadow-lg">Application Page learning States and Props in React</h1>
      
      <Page count = {1}/>
    </>
  )
}

export default App
