import { useState } from 'react'
import './App.css'

function App() {
  const [lanth, setLanth] = useState(5)


  return (
    <>
      <h1 className=' text-red-900 text-center bg-yellow-500 text-7xl mt-5 py-5 font-bold '>Password Generator</h1>
    </>
  )
}

export default App
