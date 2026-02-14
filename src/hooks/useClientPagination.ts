import { useMemo, useState, useCallback } from "react";
import type { SortOption } from "../types/types";

interface UseClientPaginationProps<T> {
  data: T[];
  pageSize?: number;
  sortOption: SortOption;
  sortFunction: (data: T[], sortOption: SortOption) => T[];
}

export const useClientPagination = <T>({
  data,
  pageSize = 3,
  sortOption,
  sortFunction,
}: UseClientPaginationProps<T>) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  // 1️⃣ Önce sıralama uygulanır
  const sortedData = useMemo(() => {
    return sortFunction([...data], sortOption);
  }, [data, sortOption, sortFunction]);

  // 2️⃣ Sonra pagination uygulanır
  const paginatedData = useMemo(() => {
    return sortedData.slice(0, visibleCount);
  }, [sortedData, visibleCount]);

  // 3️⃣ Load more
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + pageSize);
  }, [pageSize]);

  // 4️⃣ Reset (filter değiştiğinde çağrılabilir)
  const resetPagination = useCallback(() => {
    setVisibleCount(pageSize);
  }, [pageSize]);

  const hasMore = visibleCount < sortedData.length;

  return {
    data: paginatedData,
    loadMore,
    hasMore,
    resetPagination,
    total: sortedData.length,
  };
};
