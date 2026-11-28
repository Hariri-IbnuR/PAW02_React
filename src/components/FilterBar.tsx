import type { Filter } from "../types";

interface FilterBarProps {
  filters: Filter[];
  active: Filter;
  search: string;
  onFilterChange: (f: Filter) => void;
  onSearchChange: (q: string) => void;
}

export default function FilterBar({
  filters,
  active,
  search,
  onFilterChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <section id="daftar" className="toolbar">
      <input
        type="search"
        className="search"
        placeholder="Cari judul atau mata kuliah..."
        aria-label="Cari tugas"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="filters" role="group" aria-label="Filter status">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`chip ${f === active ? "on" : ""}`}
            aria-pressed={f === active}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>
    </section>
  );
}
