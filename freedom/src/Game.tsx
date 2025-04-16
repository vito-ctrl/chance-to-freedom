// import React from 'react'
import { useState, useEffect } from "react"
import './Game.css'

export default function Game() {
    interface QuizData {
        results: {
          category: string;
          type: string;
          difficulty: string;
          question: string;
          correct_answer: string;
          incorrect_answers: string[];
        }[];
      }
      
      const [data, setData] = useState<QuizData | null>(null);
      const [input, setInput] = useState('')

    useEffect(() => {
        const fetchdata = async() => {
            try{
                console.log("start fetching data")
                const res = await fetch('https://opentdb.com/api.php?amount=4')
                if(!res.ok){
                    throw new Error(`HTTP ERROR! STATUS: ${res.status}`);
                }
                const quiz = await res.json();
                setData(quiz)
            } catch (error) {
                console.log('failed to fetch quiz data : ', error)
            }
        } 
        fetchdata();
    }, [])
    console.log(input)
    console.log(data)
  return (
    <> 
        {data && data.results ? (
            <>
                        <h1 className="text-white">correct_answer : {data.results[0].correct_answer}</h1>
            <form className="mx-auto mt-16 max-w-xl sm:mt-20">
                <h1 className="question text-white">{data.results[0].question}</h1>
                <div className="submit">
                    <div className="flex items-center justify-center border-b border-teal-500 py-2">
                        <input
                        onChange={(e) => setInput(() => e.target.value)}
                        className={`input appearance-none bg-transparent border-none w-full text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none`}
                        type="text" 
                        placeholder="Answear" 
                        required/>
                    {/* {error && <h1 className="text-red-500 text-sm mt-1">{error}</h1>} */}
                    </div>
                    <button
                        type="submit"
                        className="mt-6 block w-full rounded-md bg-teal-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                        >
                            Submit
                    </button>
                </div>
                <h1 className="type text-white">type:{data.results[0].type}</h1>
                <h1 className="text-white">difficulty : {data.results[0].difficulty}</h1>   
                <h1 className="text-white">incorrect_answers : {data.results[0].incorrect_answers}</h1>
                <h1 className="text-white">category : {data.results[0].category}</h1>
            </form>
            </>
        ) : (
            <></>
        )}
    </>
  )
}
