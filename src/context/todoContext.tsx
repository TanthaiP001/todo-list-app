import { createContext, useReducer, type ReactNode } from "react";
import { todoReducer, initialState } from "./todoReducer";
import type { TodoState } from "./types";
import { fetchTodos } from "../api/todoApi";

interface TodoContextType extends TodoState {
  loadTodos: () => Promise<void>;
  addTodo: (title: string, priority?: number) => void;
  updateTodo: (id: number, title: string) => void;
  setPriority: (id: number, priority: number) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const loadTodos = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const todos = await fetchTodos();
      dispatch({ type: "FETCH_SUCCESS", payload: todos });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: (error as Error).message,
      });
    }
  };

  const addTodo = (title: string, priority = 3) => {
    const id =
      state.todos.length > 0
        ? Math.max(...state.todos.map((t) => t.id)) + 1
        : 1;
    const p = Math.max(1, Math.min(5, priority));
    dispatch({
      type: "ADD_TODO",
      payload: { id, title: title.trim(), completed: false, priority: p },
    });
  };

  const updateTodo = (id: number, title: string) => {
    const todo = state.todos.find((t) => t.id === id);
    if (todo && title.trim()) {
      dispatch({
        type: "UPDATE_TODO",
        payload: { ...todo, title: title.trim() },
      });
    }
  };

  const setPriority = (id: number, priority: number) => {
    const todo = state.todos.find((t) => t.id === id);
    if (todo) {
      const p = Math.max(1, Math.min(5, priority));
      dispatch({
        type: "UPDATE_TODO",
        payload: { ...todo, priority: p },
      });
    }
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  return (
    <TodoContext.Provider
      value={{ ...state, loadTodos, addTodo, updateTodo, setPriority, toggleTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}
