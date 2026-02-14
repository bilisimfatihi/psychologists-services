import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
        setFavoriteIds(Array.isArray(ids) ? ids : []);
      } catch (error) {
        toast.error("Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  const toggleFavorite = async (psychologistId: string) => {
    if (!user) {
      toast.warn("Please log in to add to favorites.");
      return;
    }

    const isFavorite = favoriteIds.includes(psychologistId);

    try {
      if (isFavorite) {
        await removeFavorite(user.uid, psychologistId);
        setFavoriteIds((prev) => prev.filter((id) => id !== psychologistId));
        toast.success("Removed from favorites.");
      } else {
        await addFavorite(user.uid, psychologistId);
        setFavoriteIds((prev) => [...prev, psychologistId]);
        toast.success("Added to favorites.");
      }
    } catch (error) {
      toast.error("Failed to toggle favorite.");
    }
  };

  return {
    favoriteIds,
    isFavorite: (id: string) => favoriteIds.includes(id),
    toggleFavorite,
    loading,
  };
};
