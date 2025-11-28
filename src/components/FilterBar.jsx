import React from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SortDropdown } from "@/components/SortDropdown";

export const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  totalProducts,
  totalAvailable,
  categoriesLoading,
  isSearching,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-secondary/30 rounded-lg">
      <div className="flex items-center gap-2 text-sm">
        {isSearching ? (
          <Search className="h-4 w-4 text-accent" />
        ) : (
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="text-muted-foreground">
          {isSearching ? (
            <>Found <span className="font-semibold text-foreground">{totalAvailable || totalProducts}</span> results</>
          ) : (
            <>Showing <span className="font-semibold text-foreground">{totalProducts}</span> of {totalAvailable || totalProducts} products</>
          )}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={onCategoryChange}
          loading={categoriesLoading}
        />
        <SortDropdown value={sortOption} onChange={onSortChange} />
      </div>
    </div>
  );
};
