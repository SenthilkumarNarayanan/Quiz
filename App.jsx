import { useEffect, useState } from "react";
import "./App.css";
import questionData from "./question.json";
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
  const[startQuiz,setStartQuiz]=useState(false)
  
  useEffect(()=>
  {
    let interval;
    if(timer>0 && !showScore){
      interval=setInterval(()=>{setTimer((prevTimer)=>
        prevTimer -1)},1000)
    }else{
      clearInterval(interval);
      setShowScore(true);
    }
    return()=>clearInterval(interval);
  },[timer,showScore])

  const handleAnswerClick=(selectedOption)=>{
    if (selectedOption===questionData[currentQuestion].correctOption){
      setScore((prevScore)=>prevScore+1);
    }
    if (currentQuestion< questionData.length-1 ){
      setCurrentQuestion((prevQuestion)=>prevQuestion +1);
      setTimer(10)
    }else{
      setShowScore(true)
    }
  }
  const handleResetQuiz =()=>{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(60);
  }

  return (
    <>
      <h3>App</h3>
      <div className="quiz-app">
        {showScore ? (
          <div className="score-section">
            <h2>Your Score: {score}/{questionData.length}</h2>
            <button className="btn"onClick={handleResetQuiz}>Reset</button>
          </div>
        ) : (
          <div className="question-section">
            <h2>Question {currentQuestion +1}</h2>
            <p>{questionData[currentQuestion].question}</p>
            <div className="options ">
{questionData[currentQuestion].options.map((option,index)=>(<button className="btn" key={index} onClick={()=>{handleAnswerClick(option)}}>{option}</button>))}            </div>
            <div className="timer">
              Time Left:<span>{timer}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
