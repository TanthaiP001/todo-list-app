import type { Todo } from "../context/types";

interface Props {
  todo: Todo;
}

export default function TodoItem({ todo }: Props) {
  return (
    <li className="flex items-center justify-between p-3 border rounded">
      <span
        className={`${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.title}
      </span>

      <span className="text-sm">
        {todo.completed ? "Done" : "Pending"}
      </span>
    </li>
  );
}
