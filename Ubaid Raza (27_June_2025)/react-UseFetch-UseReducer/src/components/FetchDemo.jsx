import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

export default function FetchDemo() {
  // 1️⃣  Fetch the first 5 todos
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=5'
  );

  // 2️⃣  Keep a local copy so we can toggle completed state
  const [todos, setTodos] = useState([]);

  // 3️⃣  When data arrives, load it into local state
  useEffect(() => {
    if (data) setTodos(data); // each todo already has a `completed` flag
  }, [data]);

  // 4️⃣  Toggle a todo’s completed status
  const toggleComplete = (id) =>
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

  /* ---------- UI ---------- */
  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <h2>useFetch Hook Example</h2>
      <ul className="todo-fetch">
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => toggleComplete(todo.id)}>
            {todo.title}

            {/* ✔️ / ❌ icon */}
            <span className="icon">
              {todo.completed ? '✅' : '❌'}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
