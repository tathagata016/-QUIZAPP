import React from 'react'

function QuizResult(props) {
    return (
      <>
      <div >
          Your Score:{props.score}<br/>
          Total Score:{props.totalScore}
      </div>
      <button onClick={props.tryAgain}>Try Again</button>
      </>
    )
  }
  
  export default QuizResult