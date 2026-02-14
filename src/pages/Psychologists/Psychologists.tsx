import { useState } from "react";
import type { SortOption } from "../../types/types";
import PsychologistList from "../../components/PsychologistList/PsychologistList";
import Filters from "../../components/Filters";
import LoadMoreButton from "../../components/LoadMoreButton";
import { usePaginatedPsychologists } from "../../hooks/usePaginatedPsychologists";

const Psychologists = () => {
  const [activeFilter, setActiveFilter] = useState<SortOption>("A to Z");

  const { data, loading, hasMore, loadMore } =
    usePaginatedPsychologists(activeFilter);

  return (
    <div className="container mx-auto px-4 py-8">
      <Filters activeFilter={activeFilter} onChange={setActiveFilter} />
      <PsychologistList psychologists={data} />
      <LoadMoreButton loading={loading} hasMore={hasMore} onClick={loadMore} />
    </div>
  );
};

export default Psychologists;
