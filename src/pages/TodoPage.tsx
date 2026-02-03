import { useEffect } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoList from "../components/TodoList"

export default function TodoPage() {
  const { todos, loading, error, loadTodos } = useTodos();

  useEffect(() => {
    loadTodos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-lg text-slate-600 font-medium">Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-lg text-red-600 font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Todo List
        </h1>
        <TodoList todos={todos}/>
        {todos.length === 0 && (
          <p className="text-slate-500 text-center py-8">No todos yet.</p>
        )}
      </div>
    </div>
  );
}
