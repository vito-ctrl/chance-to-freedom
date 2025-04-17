import { useState } from 'react'
import './Game.css'

// Define the props interface
interface ChoisesProps {
    incorrect?: string[],
    correct: string
    num: number,
    setNum: (num: number) => void 
    score: number,
    setScore: (num: number) => void 
}

export default function Choises({ incorrect = [], correct, num, setNum, score, setScore}: ChoisesProps) {
    const [result, setResult] = useState('')
    // const [num, setNum] = useState(0)
        // console.log(lose)
        const validatechoises = (e : React.MouseEvent<HTMLButtonElement>, iscorrect : boolean) => {
            e.preventDefault()
            if(iscorrect){
                setResult('you got damn right')
                setNum(num + 1)
                setScore(score + 1)
            } else {
                setResult('loooser')
                setNum(num + 1)
                setScore(score + 0)
            }
        }
  
  return (
    <div className="choices-container">
            {incorrect && incorrect.map((choice, index) => (
                <button 
                key={index} 
                type="submit"
                onClick={(e) =>  validatechoises(e, false)}
                className="choice-item flex ">
                {choice}
                </button>
            ))}
                <button 
                    type="submit"
                    onClick={(e) => validatechoises(e, true) }
                    className="choice-item flex ">
                    {correct}
                </button>
        <h1>{result}</h1>
    </div>
  )
}