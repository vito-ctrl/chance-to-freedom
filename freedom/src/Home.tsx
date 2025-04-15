import './Home.css'
import { useState } from 'react'
export default function Home() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const validation = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('start')
    if(!name.trim()) {
      setError('name is required')
    } else {
      setError('')
    }
  }

  return (
    <>
       <h1 id="sit_title">CHANCE TO FREEDOM</h1>
            <form onSubmit={validation} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="flex items-center justify-center border-b border-teal-500 py-2">
                    <input
                    onChange={(e) => setName(() => e.target.value)}
                    className={`appearance-none bg-transparent border-none w-full text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none`}
                    type="text" 
                    placeholder="Enter Your Name" 
                    required/>
                </div>
                {error&& <h1 className="text-red-500 text-sm mt-1">{error}</h1>}
                <button
                  onClick={validation}
                  type="submit"
                  className="mt-6 block w-full rounded-md bg-teal-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                    Submit
                </button>
            </form>
    </>
  )
}
