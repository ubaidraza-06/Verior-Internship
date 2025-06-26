import React from 'react';


export default function Question({ data, onAnswer }) {
  return (
    <div className="card">
      <h2 className="question">{data.question}</h2>
      <ul className="options">
        {data.options.map(opt => (
          <li key={opt}>
            <button onClick={() => onAnswer(opt)}>{opt}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
