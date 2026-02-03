import type { Todo } from "../context/types";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: Props) {
  if (todos.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={5}
            className="py-12 text-center text-neutral-400 text-[15px]"
          >
            No tasks yet.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </tbody>
  );
}
