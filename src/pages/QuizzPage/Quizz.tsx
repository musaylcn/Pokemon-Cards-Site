import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import "../QuizzPage/Quizz.css";

interface Question {
  question: string;
  options: string[];
  answer: string;
}


type FormValues = {
  [key: string]: string; 
};


const questions: Question[] = [
  {
    question: "Pikachu'nun tipi nedir?",
    options: ["Su", "Ateş", "Elektrik", "Toprak"],
    answer: "Elektrik",
  },
  {
    question: "Bulbasaur hangi tip Pokémon'dur?",
    options: ["Su", "Ateş", "Bitki", "Zehir"],
    answer: "Bitki",
  },
  {
    question: "Charmander'ın evrimleştiği son form nedir?",
    options: ["Charizard", "Charmeleon", "Blastoise", "Squirtle"],
    answer: "Charizard",
  },
  {
    question: "Mewtwo'nun tipi nedir?",
    options: ["Psişik", "Zehir", "Ateş", "Su"],
    answer: "Psişik",
  },
  {
    question: "Eevee kaç farklı evrimleşme şekline sahiptir?",
    options: ["4", "6", "8", "10"],
    answer: "8",
  },
  {
    question: "Pikachu'nun en bilinen hareketi nedir?",
    options: ["Volt Teli", "Çim Kesimi", "Yıldırım", "Alev Topu"],
    answer: "Yıldırım",
  },
  {
    question: "Zubat hangi tür Pokémon'dur?",
    options: ["Böcek", "Evrimsel", "Yarasa", "Sinek"],
    answer: "Yarasa",
  },
  {
    question: "Squirtle'ın evrimleştiği son form nedir?",
    options: ["Wartortle", "Squirtle", "Blastoise", "Bulbasaur"],
    answer: "Blastoise",
  },
  {
    question: "İlk Pokémon oyununun adı nedir?",
    options: ["Pokémon Red/Blue", "Pokémon Yellow", "Pokémon Gold", "Pokémon Silver"],
    answer: "Pokémon Red/Blue",
  },
  {
    question: "Jigglypuff'un en bilinen hareketi nedir?",
    options: ["Hızlı Hareket", "Şarkı Söyleme", "Dondurma", "Zıplama"],
    answer: "Şarkı Söyleme",
  },
];

export const Quizz = () => {
  const { handleSubmit, setValue, reset, getValues }: UseFormReturn<FormValues> = useForm<FormValues>();
  const [score, setScore] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);


  const handleAnswerClick = (index: number, answer: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = answer;
    setSelectedAnswers(updatedAnswers);
    setValue(`question${index}`, answer);
  };


  const onSubmit = () => {
    const formData = getValues();
    let totalScore = 0;

    questions.forEach((question, index) => {
      if (formData[`question${index}`] === question.answer) {
        totalScore += 10;
      }
    });

    setScore(totalScore);
    setIsQuizFinished(true);
  };


  const restartQuiz = () => {
    setScore(0);
    setIsQuizFinished(false);
    setSelectedAnswers([]);
    reset();
  };

  return (
    <div className="quizz-container">
      <h1>Pokémon Quiz</h1>

      {!isQuizFinished ? (
        <form onSubmit={handleSubmit(onSubmit)} className="question-container">
          {questions.map((question, index) => (
            <div key={index} className="question-item">
              <h2>{question.question}</h2>
              <div className="options">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    type="button"
                    className={`option-button ${
                      selectedAnswers[index] === option ? "selected" : ""
                    }`}
                    onClick={() => handleAnswerClick(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="next-btn">
            Quiz'i Bitir
          </button>
        </form>
      ) : (
        <div className="result-container">
          <h2>Quiz Tamamlandı!</h2>
          <p>Puanınız: {score} / 100</p>
          <p>
            {score <= 20
              ? "Daha çok öğrenmelisin! Pokémon dünyasında daha fazla keşfe çık."
              : score <= 50
              ? "İyi bir başlangıç! Ama biraz daha pratik yapmalısın."
              : score <= 80
              ? "Harika! Pokémon bilgin çok iyi."
              : "Mükemmel! Pokémon uzmanısın!"}
          </p>
          <button className="restart-btn" onClick={restartQuiz}>
            Tekrar Oyna
          </button>
        </div>
      )}
    </div>
  );
};
