import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import './Game.css'
import Choises from "./Choises";

export default function Game() {
    interface QuizData {
        results: {
          category: string;
          type: string;
          difficulty: string;
          question: string;
          correct_answer: string;
          incorrect_answers: string[];
          incorrect: string[]
          correct: string
        }[];
      }
      
    const location = useLocation();
    const {name} = location.state || {}

    const Navigate = useNavigate()

    const [data, setData] = useState<QuizData | null>(null);
    const [num, setNum] = useState(0)
    const [score, setScore] = useState(0)

    useEffect(() => {
        const fetchdata = async() => {
            try{
                console.log("start fetching data")
                let token = localStorage.getItem('triviaToken');
            
                if (!token) {
                    const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
                    const tokenData = await tokenResponse.json();
                    if (tokenData.response_code === 0) {
                        let token = tokenData.token;
                        localStorage.setItem('triviaToken', token);
                    }
                }
                const res = await fetch('https://opentdb.com/api.php?&amount=5')
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
    // const decodeHTML = (html: string) => {
    //     const txt = document.createElement('textarea');
    //     txt.innerHTML = html;
    //     return txt.value;
    // };

    // const finish = () => {
    //     // if( num >= data.results.length ){
            
    //     // }
    // }
    console.log(data)
    return (
        <div className="min-h-screen flex items-center justify-center p-4"> 
            {data && data.results && num >= data.results.length ? (
                <div className="text-center text-white">
                    <h1 className="text-2xl font-bold">🎉 Quiz Finished!</h1>
                    <p>Great job, {name}! You completed the quiz.</p>
                    <div className="mt-4 p-4 bg-blue-900 rounded-lg">
                        <h2 className="text-xl font-bold">Your Score: {score}/{data.results.length}</h2>
                        <p className="mt-2">
                            {score === data.results.length ? 
                                "Perfect score! You're amazing!" : 
                                score > data.results.length/2 ? 
                                    "Well done! That's a good score!" : 
                                    "Keep practicing, you'll do better next time!"}
                        </p>
                    </div>
                    <button
                    onClick={() => Navigate('/')}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                    Play Again
                    </button>
                </div>
            )  : data && data.results && data.results.length? (
                <>
                    <form className="mx-auto max-w-xl w-full">
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
                        <Choises 
                        incorrect= {data.results[num].incorrect_answers } 
                        correct={data.results[num].correct_answer}
                        num={num}
                        setNum={setNum}
                        score={score}
                        setScore={setScore}/>
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