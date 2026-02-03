import { useEffect, useState, useMemo, useRef } from "react";
import { useTodos } from "../hooks/useTodos";
import Layout from "../components/Layout";
import TodoList from "../components/TodoList";
import AddTaskModal from "../components/AddTaskModal";

const PAGE_SIZES = [5, 10, 20];

type FilterStatus = "all" | "done" | "not-done";
type FilterPriority = "all" | "1" | "2" | "3" | "4" | "5";

export default function TodoPage() {
  const { todos, loading, error, loadTodos, addTodo } = useTodos();
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterPriority, setFilterPriority] = useState<FilterPriority>("all");
  const filterPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };
    if (showFilter) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showFilter]);

  const filtered = useMemo(() => {
    let result = todos;

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }

    if (filterStatus === "done") {
      result = result.filter((t) => t.completed);
    } else if (filterStatus === "not-done") {
      result = result.filter((t) => !t.completed);
    }

    if (filterPriority !== "all") {
      const p = Number(filterPriority);
      result = result.filter((t) => t.priority === p);
    }

    return result;
  }, [todos, search, filterStatus, filterPriority]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const paginated = useMemo(
    () => filtered.slice(pageStart, pageStart + pageSize),
    [filtered, pageStart, pageSize]
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <Layout>
        <div className="p-8 flex items-center justify-center min-h-[320px]">
          <p className="text-[15px] text-neutral-500">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-8 flex items-center justify-center min-h-[320px]">
          <p className="text-[15px] text-red-600">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div className="p-4 sm:p-6 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="relative w-full sm:min-w-[200px] sm:max-w-sm order-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name"
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg text-[15px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 order-2 sm:order-none">
            <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-medium text-sm flex-shrink-0">
              T
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="text-[14px] font-medium text-neutral-800 truncate">Tanthai</p>
              <p className="text-[12px] text-neutral-500 truncate">tanthaipotong@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">Tasks</h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-neutral-600">Showing</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2.5 min-h-[44px] border border-neutral-200 rounded-lg text-[13px] sm:text-[14px] text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation"
                >
                  {PAGE_SIZES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative" ref={filterPanelRef}>
                <button
                  type="button"
                  onClick={() => setShowFilter(!showFilter)}
                  className={`cursor-pointer flex items-center gap-2 px-3 py-2.5 sm:px-4 border rounded-lg text-[13px] sm:text-[14px] min-h-[44px] touch-manipulation ${
                    showFilter || filterStatus !== "all" || filterPriority !== "all"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="flex-shrink-0"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  Filter
                  {(filterStatus !== "all" || filterPriority !== "all") && (
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </button>
                {showFilter && (
                  <div className="absolute right-0 top-full mt-2 z-20 w-64 sm:w-72 py-3 px-4 bg-white rounded-xl shadow-lg border border-neutral-200">
                    <p className="text-[13px] font-semibold text-neutral-700 mb-3">Status</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(["all", "done", "not-done"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFilterStatus(s)}
                          className={`px-3 py-1.5 rounded-lg text-[13px] font-medium ${
                            filterStatus === s
                              ? "bg-blue-500 text-white"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                          }`}
                        >
                          {s === "all" ? "All" : s === "done" ? "Done" : "Not Done"}
                        </button>
                      ))}
                    </div>
                    <p className="text-[13px] font-semibold text-neutral-700 mb-3">Priority</p>
                    <div className="flex flex-wrap gap-2">
                      {(["all", "1", "2", "3", "4", "5"] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setFilterPriority(p)}
                          className={`px-3 py-1.5 rounded-lg text-[13px] font-medium ${
                            filterPriority === p
                              ? "bg-blue-500 text-white"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                          }`}
                        >
                          {p === "all" ? "All" : `${p} star${p === "1" ? "" : "s"}`}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFilterStatus("all");
                        setFilterPriority("all");
                      }}
                      className="mt-3 w-full py-2 rounded-lg text-[13px] text-neutral-600 bg-neutral-100 hover:bg-neutral-200"
                    >
                      Clear filter
                    </button>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-3 py-2.5 sm:px-4 rounded-lg bg-blue-500 text-white text-[13px] sm:text-[14px] font-medium hover:bg-blue-600 min-h-[44px] touch-manipulation cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add New Task
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg sm:rounded-xl border border-neutral-200 -mx-4 sm:mx-0">
            <table className="w-full text-left min-w-[640px] table-fixed sm:table-auto">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="py-3 px-3 sm:px-4 text-[12px] sm:text-[13px] font-semibold text-neutral-600 uppercase tracking-wide w-[40%] sm:w-auto">
                    Task Name
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-[12px] sm:text-[13px] font-semibold text-neutral-600 uppercase tracking-wide w-[12%] sm:w-auto">
                    Task ID
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-[12px] sm:text-[13px] font-semibold text-neutral-600 uppercase tracking-wide w-[18%] sm:w-auto">
                    Priority
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-[12px] sm:text-[13px] font-semibold text-neutral-600 uppercase tracking-wide w-[18%] sm:w-auto">
                    Status
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-[12px] sm:text-[13px] font-semibold text-neutral-600 uppercase tracking-wide w-12 sm:w-14">
                    Action
                  </th>
                </tr>
              </thead>
              <TodoList todos={paginated} />
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 sm:mt-6 gap-3">
              <p className="text-[13px] sm:text-[14px] text-neutral-500 order-2 sm:order-1">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1 sm:gap-1 order-1 sm:order-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2.5 min-h-[44px] min-w-[44px] rounded-lg text-[13px] sm:text-[14px] text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((p, i, arr) => (
                    <span key={p} className="inline-flex">
                      {i > 0 && arr[i - 1] !== p - 1 && (
                        <span className="px-1 sm:px-2 text-neutral-400 flex items-center">...</span>
                      )}
                      <button
                        type="button"
                        onClick={() => setCurrentPage(p)}
                        className={`min-w-[44px] min-h-[44px] py-2 rounded-lg text-[13px] sm:text-[14px] font-medium touch-manipulation ${
                          currentPage === p
                            ? "bg-blue-500 text-white"
                            : "text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        {String(p).padStart(2, "0")}
                      </button>
                    </span>
                  ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2.5 min-h-[44px] min-w-[44px] rounded-lg text-[13px] sm:text-[14px] text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </Layout>

      <AddTaskModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addTodo}
      />
    </>
  );
}
