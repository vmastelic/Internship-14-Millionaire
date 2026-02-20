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

  if(status === "start"){
    return(
      <>
        <h1>Dobrodošli u (polu)milijunaš</h1>
        <button onClick={startGame}>Start game</button>
      </>
    );
  }

}

export default App
