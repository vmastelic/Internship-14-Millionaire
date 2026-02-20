import { useMemo, useState } from 'react'
import './style/App.css'
import { QUESTIONS } from './data/questions'
import './style/answers.css'


function randomQuestions(questions){
  const shuffled = [...questions].sort(() => Math.random() - 0.5 );
  return shuffled.slice(0, 10);
}

function App() {
  const [status, setStatus] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [reveal, setReveal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  if (status === "winner") {
    return (
      <>
        <h1>Pobjeda!</h1>
        <button onClick={startGame}>Igraj ponovo</button>
      </>
    );
  }
  
  const handleAnswer = (answer) => {
    const isCorrect = answer.correct;
    if(reveal)return;

    setSelectedId(answer.id);
    setReveal(true);

    setTimeout(() => {

      if(isCorrect){

        if(currentIndex === gameQuestions.length - 1){
          setStatus("winner");

        }else{
          setCurrentIndex((prev) => prev + 1);
          setSelectedId(null);
          setReveal(false);
        }

      }else{
        setStatus("finished");
      }
    }, 1200);
  };

  const currentQuestion = gameQuestions[currentIndex];

  const getAnswerClass = (a) => {
    if(!reveal) return "answer"
    if(a.correct)return "answer correct";
    if(selectedId === a.id)return "answer wrong";
    return "answer";
  }

  return(
    <div>
        <h2>{currentIndex + 1}. {currentQuestion.text}</h2>
        {currentQuestion.answers.map((a) => (
          <button
            key={a.id}
            className={getAnswerClass(a)}
            onClick={() => handleAnswer(a)}
            disabled={reveal}
          >{a.text}</button>
        ))}
    </div>
  );
}

export default App
