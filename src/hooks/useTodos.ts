import { useContext } from "react";
import { TodoContext } from "../context/todoContext";

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within TodoProvider");
  }
  return context;
}
