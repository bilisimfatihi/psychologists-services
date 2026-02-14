import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getFavoritePsychologistIds } from "../../firebase/favorites";
import { getPsychologistsByIds } from "../../firebase/psychologists";
import type { Psychologist, SortOption } from "../../types/types";
import PsychologistList from "../../components/PsychologistList";
import Filters from "../../components/Filters";
import LoadMoreButton from "../../components/LoadMoreButton";
import { useClientPagination } from "../../hooks/useClientPagination";
import { sortPsychologists } from "../../utils/sortPsychologists";
import { toast } from "react-toastify/unstyled";

const FavoritesPage = () => {
  const { user } = useAuthContext();
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [activeFilter, setActiveFilter] = useState<SortOption>("A to Z");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      setLoading(true);
      try {
        const ids = await getFavoritePsychologistIds(user.uid);

        if (ids.length === 0) {
          setPsychologists([]);
          return;
        }

        const data = await getPsychologistsByIds(ids);
        setPsychologists(data);
      } catch (error) {
        toast.error("Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  const {
    data: paginatedPsychologists,
    loadMore,
    hasMore,
    resetPagination,
  } = useClientPagination({
    data: psychologists,
    pageSize: 3,
    sortOption: activeFilter,
    sortFunction: sortPsychologists,
  });

  // Filter değişince pagination reset
  useEffect(() => {
    resetPagination();
  }, [activeFilter, resetPagination]);

  if (loading) {
    return <div className="text-center py-10">Loading favorites...</div>;
  }

  if (psychologists.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg font-medium">
          There are no psychologists added to favorites yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Filters activeFilter={activeFilter} onChange={setActiveFilter} />
      <PsychologistList psychologists={paginatedPsychologists} />
      <LoadMoreButton loading={loading} hasMore={hasMore} onClick={loadMore} />
    </div>
  );
};

export default FavoritesPage;
