import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
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
      
    const location = useLocation();
    const {name} = location.state || {}

    const Navigate = useNavigate()

    const [data, setData] = useState<QuizData | null>(null);
    const [input, setInput] = useState('')
    const [lose, setLose] = useState('')
    const [win, setWin] = useState('')
    const [num, setNum] = useState(0)

    useEffect(() => {
        const fetchdata = async() => {
            try{
                console.log("start fetching data")
                const res = await fetch('https://opentdb.com/api.php?&amount=2')
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
    }, [num])
    
    // Function to decode HTML entities
    const decodeHTML = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const validanswer = (e : React.FormEvent) => {
        e.preventDefault()
        if (data?.results[num].correct_answer === input || data?.results[num].correct_answer.toLowerCase() === input){
            setWin('your godamn right')
            setLose('')
            setNum(num+1)
            setInput('')
        } else {
            setLose('Uncorrect')
            setWin('')
        }
    }
    console.log(data)
    console.log('corect answer',data?.results[num].correct_answer)
    return (
        <div className="min-h-screen flex items-center justify-center p-4"> 
                {data && data.results && num >= data.results.length ? (
                    <div className="text-center text-white">
                        <h1 className="text-2xl font-bold">🎉 Quiz Finished!</h1>
                        <p>Great job, {name}! You completed the quiz.</p>
                        <button
                        onClick={() => Navigate('/')}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                        Go Back to Home
                        </button>
                    </div>
                    ) : data && data.results && data.results.length > num ? (
                <>
                    <form onSubmit={validanswer} className="mx-auto max-w-xl w-full">
                        <h1>hello : {name}</h1>
                        <h1
                            className="difficulty"
                            style={{
                                background: data.results[num].difficulty === 'hard' ? '#ef4444' : 
                                           data.results[num].difficulty === 'easy' ? '#10b981' : '#f59e0b'
                            }}
                        >
                            {data.results[num].difficulty}
                        </h1>   
                        <h1 className="question text-white" 
                            dangerouslySetInnerHTML={{ __html: data.results[num].question }}>
                        </h1>
                        <div className="submit">
                            <input
                                onChange={(e) => setInput(e.target.value)}
                                className="input"
                                type="text" 
                                placeholder="Enter your answer" 
                                required
                            />
                            {lose && <p className="text-red-500">{lose}</p> || win && <p className="text-green-500">{win}</p>}
                            <button
                                type="submit"
                                className="mt-2 block w-full rounded-md"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => Navigate('/')}
                                type="submit"
                                className="mt-2 block w-full rounded-md"
                            >
                                Quit
                            </button>
                        </div>
                        <div className="quiz-info">
                            <h1 className="type text-white">Type: {data.results[num].type}</h1>
                            <h1 className="text-white">Category: {data.results[num].category}</h1>
                            <h1 className="text-white">Correct answer: {decodeHTML(data.results[num].correct_answer)}</h1>
                            <h1 className="text-white">Incorrect answers: {data.results[num].incorrect_answers.map(answer => decodeHTML(answer)).join(', ')}</h1>
                        </div>
                    </form>
                </>
            ) : (
                <div className="loading">
                    <div className="animate-pulse text-white text-xl">Loading quiz...</div>
                </div>
            )}
        </div>
    )
}