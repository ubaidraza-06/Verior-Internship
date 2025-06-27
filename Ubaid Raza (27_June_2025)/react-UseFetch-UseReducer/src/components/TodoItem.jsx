import React from 'react';

const TodoItem = React.memo(function TodoItem({ todo, onDelete }) {
  return (
    <li>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>X</button>
    </li>
  );
});

export default TodoItem;
