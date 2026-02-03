import { createContext, useReducer, type ReactNode } from "react";
import { todoReducer, initialState } from    "./todoReducer";
import type { TodoState } from "./types";
import { fetchTodos } from "../api/todoApi";

interface TodoContextType extends TodoState {
  loadTodos: () => Promise<void>;
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

  return (
    <TodoContext.Provider value={{ ...state, loadTodos }}>
      {children}
    </TodoContext.Provider>
  );
}
