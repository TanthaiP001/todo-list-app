import type { Todo } from "../context/types";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

interface ApiTodo {
  id: number;
  title: string;
  completed: boolean;
}

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data: ApiTodo[] = await response.json();
  return data.slice(0, 10).map((item) => ({
    ...item,
    priority: 3,
  }));
}
