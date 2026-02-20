import { useMemo, useState } from 'react'
import './App.css'
import { QUESTIONS } from './data/questions'


function randomQuestions(questions){
  const shuffled = [...questions].sort(() => Math.random() - 0.5 );
  return shuffled.slice(0, 10);
}

function App() {
  const [status, setStatus] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);

  const gameQuestions = useMemo(() => randomQuestions(QUESTIONS), [status]);

  const startGame = () => {
    setCurrentIndex(0);
    setStatus("playing");
  }

  const playAgain = () => {
    setStatus("start");
  }
  
  if(status === "start"){
    return(
      <>
        <h1>Tko želi biti (polu)milijunaš?</h1>
        <button onClick={startGame}>Start game</button>
      </>
    );
  }
  
  if (status === "finished") {
      return (
        <>
          <h1>Kraj igre</h1>
          <button onClick={playAgain}>Natrag na start</button>
        </>
      );
    }

  const handleAnswer = (answer) => {
    const isCorrect = answer.correct;

    setTimeout(() => {
      if(isCorrect){
        if(currentIndex === gameQuestions.length - 1){
          setStatus("winner");
        }else{
          console.log("correct");
          setCurrentIndex((prev) => prev + 1);
          return(
            <>
            <h3>Tocan odgovor</h3>
            </>
          );
        }
      }else{
        console.log("wrong")
        setStatus("finished");
      }
    }, 1000);
  };

  const currentQuestion = gameQuestions[currentIndex];

  return(
    <div>
        <h2>{currentIndex + 1}. {currentQuestion.text}</h2>
        {currentQuestion.answers.map((a) => (
          <button key={a.id} onClick={() => handleAnswer(a)}>{a.text}</button>
        ))}
    </div>
  );
}

export default App
