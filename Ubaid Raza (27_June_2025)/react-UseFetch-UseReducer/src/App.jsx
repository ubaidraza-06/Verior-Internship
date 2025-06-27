import TodoApp from './components/TodoApp';
import FetchDemo from './components/FetchDemo';
import './App.css';

export default function App() {
  return (
    <div className="container">
      <h1>React UseFetch & UseReducer</h1>
      <FetchDemo />
      <hr />
      <TodoApp />
    </div>
  );
}
