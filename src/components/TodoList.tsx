import type { Todo } from "../context/types";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: Props) {
  if (todos.length === 0) {
    return <p className="text-gray-500">No todos found.</p>;
  }

  return (
    <ul className="space-y-3">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
