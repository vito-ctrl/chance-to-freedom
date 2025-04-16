import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
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

    const [data, setData] = useState<QuizData | null>(null);
    const [input, setInput] = useState('')

    useEffect(() => {
        const fetchdata = async() => {
            try{
                console.log("start fetching data")
                const res = await fetch('https://opentdb.com/api.php?&amount=4')
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
    
    // Function to decode HTML entities
    const decodeHTML = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const validanswer = (e : React.FormEvent) => {
        e.preventDefault()
        console.log('testing11111111111')
        if (data?.results[0].correct_answer === input || data?.results[0].correct_answer.toLowerCase() === input){
            console.log('your godamn right')
        } else {
            console.log("loseeeeeee")
        }
    }
    
    console.log('corect answer',data?.results[0].correct_answer)
    return (
        <div className="min-h-screen flex items-center justify-center p-4"> 
            {data && data.results ? (
                <>
                    <form onSubmit={validanswer} className="mx-auto max-w-xl w-full">
                        <h1>hello : {name}</h1>
                        <h1
                            className="difficulty"
                            style={{
                                background: data.results[0].difficulty === 'hard' ? '#ef4444' : 
                                           data.results[0].difficulty === 'easy' ? '#10b981' : '#f59e0b'
                            }}
                        >
                            {data.results[0].difficulty}
                        </h1>   
                        <h1 className="question text-white" 
                            dangerouslySetInnerHTML={{ __html: data.results[0].question }}>
                        </h1>
                        <div className="submit">
                            <input
                                onChange={(e) => setInput(e.target.value)}
                                className="input"
                                type="text" 
                                placeholder="Enter your answer" 
                                required
                            />
                            <button
                                type="submit"
                                className="mt-2 block w-full rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                        <div className="quiz-info">
                            <h1 className="type text-white">Type: {data.results[0].type}</h1>
                            <h1 className="text-white">Category: {data.results[0].category}</h1>
                            <h1 className="text-white">Correct answer: {decodeHTML(data.results[0].correct_answer)}</h1>
                            <h1 className="text-white">Incorrect answers: {data.results[0].incorrect_answers.map(answer => decodeHTML(answer)).join(', ')}</h1>
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