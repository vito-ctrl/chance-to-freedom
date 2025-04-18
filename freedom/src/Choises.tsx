import { useState } from 'react'
import './Game.css'

interface ChoisesProps {
    incorrect?: string[],
    correct: string,
    num: number,
    setNum: (num: number) => void,
    score: number,
    setScore: (num: number) => void
}

export default function Choises({ incorrect = [], correct, num, setNum, score, setScore }: ChoisesProps) {
    const [clickedIndex, setClickedIndex] = useState<number | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

    const allChoices = [...incorrect, correct] // correct is last one
    const correctIndex = allChoices.length - 1

    const handleClick = (index: number) => {
        if (clickedIndex !== null) return // prevent more than one click
        setClickedIndex(index)

        const wasCorrect = index === correctIndex
        setIsCorrect(wasCorrect)
        if (wasCorrect) {
            setScore(score + 1)
        }

        setTimeout(() => {
            setClickedIndex(null)
            setIsCorrect(null)
            setNum(num + 1)
        }, 300)
    }

    return (
        <div className="choices-container">
            {allChoices.map((choice, index) => {
                let className = "choice-item"
                if (index === clickedIndex) {
                    className += isCorrect ? " correct" : " incorrect"
                }

                return (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        className={className}
                        disabled={clickedIndex !== null}
                        dangerouslySetInnerHTML={{ __html: choice }}
                    />
                )
            })}
        </div>
    )
}
