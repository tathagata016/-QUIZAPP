import React, { useEffect, useState } from 'react';
import { QuizData } from '../Data/QuizData';
import QuizResult from './QuizResult';
import './Quiz.css';

function Quiz() {
   const [currentQues, setCurrentQues] = useState(()=>{
       return Number(localStorage.getItem('currentQues'))||0
   });
   const [score, setScore] = useState(0);
   const [isQuizFinished, setIsQuizFinished] = useState(false);
   const[timer,setTimer]=useState(10);
   const[userAnswers,setUserAnswers]=useState([])

  useEffect(()=>{
   localStorage.setItem('currentQues',currentQues)
  },[currentQues])


   useEffect(()=>{
       if(isQuizFinished)
         return ;

       const interval=setInterval(()=>{
        setTimer((timer)=>{
           if(timer===0){
            setCurrentQues(currentQues=>currentQues+1)
            return 10;  
         }
         return timer-1;
        })
       },1000)

       return()=>clearInterval(interval)
   },[currentQues,isQuizFinished])

   function handleClick(ans) {
      setUserAnswers([...userAnswers,ans])

      if (QuizData[currentQues].answer === ans) {
         setScore(score + 1);
         alert("Correct");
      } else {
         alert("Incorrect");
      }

      if (currentQues === QuizData.length - 1) {
         setIsQuizFinished(true);
      } else {
         setCurrentQues(currentQues + 1);
         setTimer(10)
      }
   }

   function tryAgain() {
      setCurrentQues(0);
      setScore(0);
      setIsQuizFinished(false);
      setTimer(10);
      setUserAnswers([]);
   }

   return (
    <>
      <div className="quiz-container">
      <h2>Online Quiz App</h2>
         <h3>Score is: {score}</h3>
         {!isQuizFinished && <p>Time left: {timer}</p>}
         {isQuizFinished ? (
            <div className="result-container">
               <QuizResult score={score} totalScore={QuizData.length} tryAgain={tryAgain} />
               <h3>Review Your Answer:</h3>
               <ul>
                  {QuizData.map((question,index)=>(
                   <li key={index+1}>
                       <p>Question No:{index+1} {question.question}</p>
                       {console.log('Question:', question.question)}
                     {console.log('User answer:', QuizData[index].options[userAnswers[index]])}
                       {console.log('Correct answer:', QuizData[index].options[question.answer])}
                       <p>Your answer : {QuizData[index].options[userAnswers[index]]}</p>
                       <p>{userAnswers[index]===question.answer?"Correct":"Incorrect"}</p>
                       {userAnswers[index]!==question.answer &&(
                        <p>Correct answer:{QuizData[index].options[question.answer]}</p>
                       )}
                   </li>
                  ))}
               </ul>
            </div>
         ) : (
            <div className="quiz-body">
               <p>Question No. {currentQues + 1}</p>
               <p>{QuizData[currentQues].question}</p>
               {QuizData[currentQues].options.map((option, index) => (
                  <button key={index} onClick={() => handleClick(index)}>{option}</button>
               ))}
            </div>
         )}
      </div>
      </>
   );
}

export default Quiz;
