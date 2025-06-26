import React from 'react';

export default function Result({ score, total, restart }) {
  return (
    <div className="card">
      <h2>Quiz Finished!</h2>
      <p>
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </p>
      <button onClick={restart}>Play Again</button>
    </div>
  );
}
