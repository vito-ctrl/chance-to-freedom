import { useState } from 'react'
import './Game.css'

// Define the props interface
interface ChoisesProps {
    incorrect?: string[],
    correct: string
    num: number,
    setNum: (num: number) => void 
}

export default function Choises({ incorrect = [], correct, num, setNum}: ChoisesProps) {
    const [result, setResult] = useState('')
    // const [num, setNum] = useState(0)
        // console.log(lose)
        const validatechoises = (iscorrect : boolean) => {
            if(iscorrect){
                setResult('you got damn right')
                setNum(num + 1)
            } else {
                setResult('loooser')
            }
        }
  
  return (
    <div className="choices-container">
            {incorrect && incorrect.map((choice, index) => (
                <button 
                key={index} 
                type="submit"
                onClick={() =>  validatechoises(false)}
                className="choice-item flex ">
                {choice}
                </button>
            ))}
                <button 
                    type="submit"
                    onClick={() => validatechoises(true) }
                    className="choice-item flex ">
                    {correct}
                </button>
        <h1>{result}</h1>
    </div>
  )
}