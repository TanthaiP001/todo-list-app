import { useState, useRef, useEffect } from "react";
import type { Todo } from "../context/types";
import { useTodos } from "../hooks/useTodos";
import StarRating from "./StarRating";

interface Props {
  todo: Todo;
}

export default function TodoItem({ todo }: Props) {
  const { updateTodo, setPriority, toggleTodo, deleteTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSave = () => {
    setEditing(false);
    if (editValue.trim() && editValue.trim() !== todo.title) {
      updateTodo(todo.id, editValue);
    } else {
      setEditValue(todo.title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditValue(todo.title);
      setEditing(false);
    }
  };

  return (
    <tr className="border-b border-neutral-100 even:bg-white odd:bg-neutral-50/70 hover:bg-neutral-100/80">
      <td className="py-3 px-3 sm:py-4 sm:px-4 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full min-w-0 text-[14px] sm:text-[15px] text-neutral-800 border border-neutral-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <button
            type="button"
            onClick={() => !todo.completed && setEditing(true)}
            className={`text-left text-[14px] sm:text-[15px] w-full min-w-0 truncate block ${
              todo.completed
                ? "text-neutral-400 line-through cursor-default"
                : "text-neutral-800 hover:text-neutral-600 cursor-text"
            }`}
          >
            {todo.title}
          </button>
        )}
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 text-[13px] sm:text-[14px] text-neutral-500 whitespace-nowrap">
        #{String(todo.id).padStart(6, "0")}
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <StarRating
          value={todo.priority}
          onChange={(p) => setPriority(todo.id, p)}
        />
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4">
        <span
          className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-medium whitespace-nowrap ${
            todo.completed
              ? "bg-emerald-100 text-emerald-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {todo.completed ? "Done" : "Not Done"}
        </span>
      </td>
      <td className="py-3 px-3 sm:py-4 sm:px-4 w-12 sm:w-14">
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="w-8 h-8 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 touch-manipulation"
            aria-label="Actions"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="6" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="18" r="1.5" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 py-1 bg-white rounded-lg shadow-lg border border-neutral-200 min-w-[120px] z-20">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  if (!todo.completed) setEditing(true);
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  toggleTodo(todo.id);
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
              >
                {todo.completed ? "Mark Not Done" : "Mark Done"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  deleteTodo(todo.id);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
