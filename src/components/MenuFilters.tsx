import React from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../data/menu';
import { CategoryId } from '../types';

interface MenuFiltersProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categoryCounts: Record<CategoryId, number>;
}

export const MenuFilters: React.FC<MenuFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categoryCounts,
}) => {
  return (
    <div className="space-y-4">
      {/* Search Bar & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por plato, ingrediente o carne..."
            className="w-full pl-10 pr-9 py-2.5 bg-[#121824] border border-white/10 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/80 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Mostrando <span className="text-amber-400 font-bold tabular-nums">{categoryCounts[selectedCategory] || 0}</span> opciones disponibles
        </div>
      </div>

      {/* Segmented Category Buttons (interactive filter controls as per Section 1.A) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-950/50'
                  : 'bg-[#121824] text-slate-300 hover:text-white hover:bg-[#182030] border border-white/5'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-md tabular-nums ${
                  isSelected ? 'bg-black/25 text-white' : 'bg-white/5 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
