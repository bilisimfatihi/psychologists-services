import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SortOption } from "../../types/types";

type FiltersProps = {
  activeFilter: SortOption;
  onChange: (value: SortOption) => void;
};

const Filters = ({ activeFilter, onChange }: FiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="mb-10">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
        Filters
      </p>
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between w-64 bg-[#54be96] text-white px-6 py-4 rounded-2xl font-bold focus:outline-none transition-all active:scale-95 shadow-lg shadow-[#54be96]/20"
        >
          <span>{activeFilter}</span>
          <ChevronDown
            size={20}
            className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isFilterOpen && (
          <div className="absolute mt-3 w-64 rounded-2xl shadow-2xl bg-white ring-opacity-5 z-40 overflow-hidden animate-in fade-in slide-in-from-top-2">
            <div className="py-2">
              {(
                [
                  "A to Z",
                  "Z to A",
                  "Price: Low to High",
                  "Price: High to Low",
                  "Popular",
                  "Not popular",
                  "Less than 100$",
                  "Greater than 100$",
                  "Show all",                  
                ] as SortOption[]
              ).map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsFilterOpen(false);
                  }}
                  className={`${
                    activeFilter === option
                      ? "bg-emerald-50 text-[#54be96]"
                      : "text-gray-600"
                  } group flex items-center w-full px-6 py-3.5 text-sm font-bold hover:bg-gray-50 transition-colors text-left`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
