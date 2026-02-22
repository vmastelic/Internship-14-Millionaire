import { useMemo, useState } from 'react'
import { QUESTIONS } from './data/questions'
import LevelList from './components/LevelList'
import './style/answers.css'
import './style/App.css'
import { LEVELS } from './data/levels'


function randomQuestions(questions){
  const shuffled = [...questions].sort(() => Math.random() - 0.5 );
  return shuffled.slice(0, 10);
}

function App() {
  const [status, setStatus] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [reveal, setReveal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const[skipUsed, setSkip] = useState(false);
  const[halfUsed, setHalf] = useState(false);
  const [hiddenAnswerIds, setHiddenAnswerIds] = useState([]);

  const[prize, setPrize] = useState(0);

  const gameQuestions = useMemo(() => randomQuestions(QUESTIONS), [status]);

  const startGame = () => {
    setCurrentIndex(0);
    setSelectedId(null);
    setReveal(false);
    setStatus("playing");
    setSkip(false);
    setHalf(false);
    setHiddenAnswerIds([]);
    setPrize(0);
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
        <h3>Osvojili ste {prize}€.</h3>
      </>
    );
  }
  
  if (status === "winner") {
    return (
      <>
        <h1>Pobjeda!</h1>
        <button onClick={playAgain}>Igraj ponovo</button>
        <h2>Čestitamo, osvojili ste {LEVELS[currentIndex].prize}€!</h2>
      </>
    );
  }
  
  const currentQuestion = gameQuestions[currentIndex];

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
          if(currentIndex === 4){
            setPrize(LEVELS[currentIndex].prize);
          }
          setCurrentIndex((prev) => prev + 1);
          setSelectedId(null);
          setReveal(false);
          setHiddenAnswerIds([]);
        }

      }else{
        setStatus("finished");
      }
    }, 600);
  };

  const getAnswerClass = (a) => {
    if(!reveal) return "answer"
    if(a.correct)return "answer correct";
    if(selectedId === a.id)return "answer wrong";
    return "answer";
  }

  const handleSkip = () => {
    if(skipUsed || reveal) return;
    setCurrentIndex((prev) => prev + 1);
    
    if(currentIndex === gameQuestions.length - 1){
      setStatus("winner");
      return;
    }
    setSkip(true);
  }

  const handleHalf = (question) => {
    if (halfUsed || reveal) return;
    
    const wrongAnswers = question.answers.filter((a) => !a.correct);
    
    const toHide = [...wrongAnswers]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((a) => a.id);
    
    setHiddenAnswerIds(toHide);
    setHalf(true);
  };
  
  return(
    <div className='page'>
      <div className='game-questions'>
        <h2>{currentIndex + 1}. {currentQuestion.text}</h2>

        {currentQuestion.answers.map((a) => {
          if (hiddenAnswerIds.includes(a.id)) return null;
          return (
            <button
              key={a.id}
              className={getAnswerClass(a)}
              onClick={() => handleAnswer(a)}
              disabled={reveal}
              >
              {a.text}
            </button>
          );
        })}

        <div className='jokers'>
          <button 
          onClick={() => handleHalf(currentQuestion)}
          disabled={halfUsed}
          >50:50</button>
          <button 
          onClick={handleSkip}
          disabled={skipUsed}
          >
            skip</button>
        </div>

      </div>

      <div className='level-list'>
        <LevelList currentLevel={currentIndex+1}/>
      </div>

    </div>
  );
}

export default App
