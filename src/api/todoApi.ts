import type { Todo } from "../context/types";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data: Todo[] = await response.json();
  return data.slice(0, 10);
}
