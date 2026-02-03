import { MAX_PRIORITY } from "../context/types";

interface Props {
  value: number;
  onChange?: (priority: number) => void;
  readonly?: boolean;
}

export default function StarRating({ value, onChange, readonly = false }: Props) {
  const handleClick = (priority: number) => {
    if (!readonly && onChange) onChange(priority);
  };

  return (
    <span className="inline-flex items-center gap-0.5" role={readonly ? undefined : "slider"} aria-valuenow={value} aria-valuemin={1} aria-valuemax={MAX_PRIORITY}>
      {Array.from({ length: MAX_PRIORITY }, (_, i) => i + 1).map((level) => (
        <button
          key={level}
          type="button"
          disabled={readonly}
          onClick={() => handleClick(level)}
          className={`p-0.5 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          }`}
          aria-label={`Priority ${level}`}
        >
          {level <= value ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-300">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
        </button>
      ))}
    </span>
  );
}
