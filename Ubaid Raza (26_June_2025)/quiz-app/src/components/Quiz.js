import React, { useState } from 'react';
import Question from './Question';
import Result from './Result';
import { questions } from '../data/questions';

export default function Quiz() {
  const [index, setIndex]   = useState(0);
  const [score, setScore]   = useState(0);
  const [finished, setDone] = useState(false);

  const handleAnswer = selected => {
    if (selected === questions[index].answer) setScore(p => p + 1);
    const next = index + 1;
    next < questions.length ? setIndex(next) : setDone(true);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setDone(false);
  };

  return finished ? (
    <Result score={score} total={questions.length} restart={restart} />
  ) : (
    <Question data={questions[index]} onAnswer={handleAnswer} />
  );
}
