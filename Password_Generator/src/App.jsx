import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(5)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "01234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950"
    if (charAllowed) str += "'%@#$%^&*(){]{-+=~_[]%"
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    PasswordGenerator()
  }, [length, numberAllowed, charAllowed, PasswordGenerator])

  const passwordRef = useRef("")

  const copyPasswordToClicBord = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,3)
    // document.execCommand("copy")
    window.navigator.clipboard.writeText(Password)
  }, [Password])


  return (
    <>
      <h1 className=' text-red-900 text-center bg-yellow-500 text-7xl mt-5 py-5 font-bold '>Password Generator</h1>
      <div className='text-center mt-10 bg-gray-700 p-20'>
        <input className='w-80 h-10 pl-7 outline-none rounded' type="text" value={Password} placeholder='Password' readOnly ref={passwordRef} />

        <button className='ml-5 bg-green-600 px-5 py-2 rounded-3xl hover:bg-red-600 text-white'
         onClick={copyPasswordToClicBord}>Copy</button>
        <div className='flex ml-96 w-96 mt-3'>
          <div>
            <input className='cursor-pointer' type="range" min={6} max={100} value={length} onChange={(e) => { setLength(e.target.value) }} />
            <label className='ml-5 cursor-pointer text-red-700 font-bold' htmlFor="">Label: {length}</label>
          </div>
          <div>
            <input className='ml-5 cursor-pointer' type="checkbox" defaultChecked={numberAllowed} onChange={() => { setNumberAllowed((pre) => (!pre)) }} />
            <label className='ml-5 cursor-pointer text-pink-500 font-bold' htmlFor="">Number</label>
          </div>
          <div>
            <input className='ml-5 cursor-pointer ' type="checkbox" defaultChecked={charAllowed} onChange={() => { setCharAllowed((pre) => (!pre)) }} />
            <label className='ml-5 cursor-pointer text-yellow-600 font-bold' htmlFor="">Charater</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
