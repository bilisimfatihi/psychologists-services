import { useEffect, useState } from "react";
import { DocumentSnapshot } from "firebase/firestore";
import { getPsychologists } from "../firebase/psychologists";
import type { Psychologist, SortOption } from "../types/types";

const PAGE_SIZE = 3;

export const usePaginatedPsychologists = (filter: SortOption) => {
  const [data, setData] = useState<Psychologist[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = async (loadMore = false) => {
    if (loading) return;

    setLoading(true);

    try {
      const { psychologists, lastDoc: newLastDoc, hasMore } =
        await getPsychologists({
          lastDoc: loadMore ? lastDoc : null,
          filter,
          pageSize: PAGE_SIZE,
        });

      setData((prev) =>
        loadMore ? [...prev, ...psychologists] : psychologists
      );

      setLastDoc(newLastDoc);
      setHasMore(hasMore);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // filter değişince reset
  useEffect(() => {
    setData([]);
    setLastDoc(null);
    setHasMore(true);
    fetchPage(false);
  }, [filter]);

  return {
    data,
    loading,
    hasMore,
    loadMore: () => fetchPage(true),
  };
};
