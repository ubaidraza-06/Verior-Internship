import { useReducer, useState, useCallback } from 'react';
import TodoItem from './TodoItem';

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      if (!action.payload.trim()) return state;
      return [...state, { id: Date.now(), text: action.payload.trim() }];
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');

  const handleDelete = useCallback(
    (id) => dispatch({ type: 'DELETE', payload: id }),
    [],
  );

  const handleAdd = () => {
    dispatch({ type: 'ADD', payload: input });
    setInput('');
  };

  return (
    <>
      <h2>Todo List (useReducer)</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {state.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
        ))}
      </ul>
    </>
  );
}
