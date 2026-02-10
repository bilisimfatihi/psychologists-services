import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getFavoritePsychologistIds } from "../../firebase/favorites";
import { getPsychologistsByIds } from "../../firebase/psychologists";
import type { Psychologist } from "../../types/types";
import PsychologistList from "../../components/PsychologistList";

const FavoritesPage = () => {
  const { user } = useAuthContext();
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
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
        console.error("Failed to load favorites", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

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
      <PsychologistList psychologists={psychologists} />
    </div>
  );
};

export default FavoritesPage;
