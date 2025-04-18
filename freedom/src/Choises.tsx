import { useState, useMemo } from 'react'
import './Game.css'

interface ChoisesProps {
    incorrect?: string[],
    correct: string,
    num: number,
    setNum: (num: number) => void,
    score: number,
    setScore: (num: number) => void
}

interface ChoiceItem {
    text: string,
    isCorrect: boolean
}

export default function Choises({ incorrect = [], correct, num, setNum, score, setScore }: ChoisesProps) {
    const [clickedIndex, setClickedIndex] = useState<number | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

    // Shuffle only when question changes
    const shuffledChoices: ChoiceItem[] = useMemo(() => {
        const all: ChoiceItem[] = [
            ...incorrect.map(i => ({ text: i, isCorrect: false })),
            { text: correct, isCorrect: true }
        ]

        for (let i = all.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[all[i], all[j]] = [all[j], all[i]]
        }

        return all
    }, [num]) // re-run shuffle only when question number changes

    const handleClick = (index: number) => {
        if (clickedIndex !== null) return

        const wasCorrect = shuffledChoices[index].isCorrect
        setClickedIndex(index)
        setIsCorrect(wasCorrect)

        if (wasCorrect) {
            setScore(score + 1)
        }

        setTimeout(() => {
            setClickedIndex(null)
            setIsCorrect(null)
            setNum(num + 1)
        }, 1000)
    }
    console.log(correct)

    return (
        <div className="choices-container">
            {shuffledChoices.map((choice, index) => {
                let className = "choice-item"
                if (index === clickedIndex) {
                    className += choice.isCorrect ? " correct" : " incorrect"
                }

                return (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        className={className}
                        disabled={clickedIndex !== null}
                        dangerouslySetInnerHTML={{ __html: choice.text }}
                    />
                )
            })}
        </div>
    )
}
