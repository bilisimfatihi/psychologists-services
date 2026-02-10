import { useEffect, useState } from "react";
import {
  addFavorite,
  removeFavorite,
  getFavoritePsychologistIds,
} from "../firebase/favorites";
import { useAuth } from "./useAuth";

export const useFavorites = () => {
  const { user } = useAuth();

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavoriteIds([]);
      return;
    }

    const loadFavorites = async () => {
      setLoading(true);
      try {
        const ids = await getFavoritePsychologistIds(user.uid);
        setFavoriteIds(ids);
      } catch (error) {
        console.error("Failed to load favorites", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  const toggleFavorite = async (psychologistId: string) => {
    if (!user) return;

    const isFavorite = favoriteIds.includes(psychologistId);

    try {
      if (isFavorite) {
        await removeFavorite(user.uid, psychologistId);
        setFavoriteIds(prev =>
          prev.filter(id => id !== psychologistId)
        );
      } else {
        await addFavorite(user.uid, psychologistId);
        setFavoriteIds(prev => [...prev, psychologistId]);
      }
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  return {
    favoriteIds,
    isFavorite: (id: string) => favoriteIds.includes(id),
    toggleFavorite,
    loading,
  };
};
