import { useTodos } from "../hooks/useTodos";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AchievementModal({ open, onClose }: Props) {
  const { todos } = useTodos();
  const completed = todos.filter((t) => t.completed).length;
  const total = todos.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-amber-600"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-neutral-800">
              Achievement Summary
            </h2>
          </div>
          <p className="text-[14px] text-neutral-600 mb-4">
            Summary of tasks completed successfully
          </p>
          <div className="space-y-3">
            <div className="flex justify-between text-[15px]">
              <span className="text-neutral-600">Tasks completed</span>
              <span className="font-semibold text-neutral-800">
                {completed} / {total}
              </span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="text-[13px] text-neutral-500 text-center">
              {percent}% complete
            </p>
          </div>
          {completed > 0 && (
            <p className="mt-4 text-[14px] text-emerald-600 font-medium text-center">
              You have completed {completed} task{completed !== 1 ? "s" : ""}!
            </p>
          )}
        </div>
        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-neutral-100 text-neutral-700 font-medium hover:bg-neutral-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
