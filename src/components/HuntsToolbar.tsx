import type { HuntSort } from "../utils/hunt.ts";

interface HuntsToolbarProps {
  search: string;
  sort: HuntSort;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: HuntSort) => void;
}

export default function HuntsToolbar({
  onSearchChange,
  onSortChange,
  search,
  sort,
}: HuntsToolbarProps) {
  return (
    <div className="hunts-toolbar">
      <div className="hunts-search">
        <label htmlFor="hunts-search" className="visually-hidden">
          Rechercher une chasse
        </label>
        <i className="bi bi-search hunts-search-icon" aria-hidden="true"></i>
        <input
          id="hunts-search"
          type="search"
          className="input hunts-search-input"
          placeholder="Rechercher une chasse..."
          value={search}
          onChange={(event) => {
            onSearchChange(event.target.value);
          }}
        />
      </div>

      <label htmlFor="hunts-sort" className="visually-hidden">
        Trier les chasses
      </label>
      <select
        id="hunts-sort"
        className="input hunts-sort"
        value={sort}
        onChange={(event) => {
          onSortChange(event.target.value as HuntSort);
        }}
      >
        <option value="recent">Plus récentes</option>
        <option value="rating">Mieux notées</option>
        <option value="title">Ordre alphabétique</option>
      </select>
    </div>
  );
}
