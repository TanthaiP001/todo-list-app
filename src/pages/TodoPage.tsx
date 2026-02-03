import { useEffect } from "react";
import { useTodos } from "../hooks/useTodos";

export default function TodoPage() {
  const { todos, loading, error, loadTodos } = useTodos();

  useEffect(() => {
    loadTodos();
  }, []);

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "✅" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
