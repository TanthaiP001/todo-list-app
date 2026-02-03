import { useState } from "react";
import type { ReactNode } from "react";
import AchievementModal from "./AchievementModal";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-pink-50 via-orange-50 to-amber-50">
      <div
        className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-60 flex-shrink-0 bg-white border-r border-neutral-200 flex flex-col shadow-lg transform transition-transform duration-200 ease-out md:relative md:top-auto md:left-auto md:h-screen md:min-h-0 md:transform-none md:shadow-sm ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-neutral-800">Todo</span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg text-neutral-500 hover:bg-neutral-100"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-500 text-white font-medium"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Tasks
          </a>
          <button
            type="button"
            onClick={() => {
              setShowAchievement(true);
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-neutral-600 hover:bg-neutral-100 text-left"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Achievement
          </button>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-600 hover:bg-neutral-100"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
            </svg>
            Help
          </a>
        </nav>
        <div className="p-3 border-t border-neutral-100">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-600 hover:bg-neutral-100"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Log out
          </a>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 min-h-0 md:min-h-screen">
        <header className="md:hidden flex-shrink-0 flex items-center justify-between gap-3 px-4 py-3 bg-white border-b border-neutral-200 shadow-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="text-lg font-semibold text-neutral-800">Todo</span>
          <div className="w-10" />
        </header>
        <main className="flex-1 overflow-auto py-4 px-4 sm:py-6 sm:px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg border border-neutral-100 overflow-hidden min-h-0">
            {children}
          </div>
        </main>
      </div>

      <AchievementModal
        open={showAchievement}
        onClose={() => setShowAchievement(false)}
      />
    </div>
  );
}