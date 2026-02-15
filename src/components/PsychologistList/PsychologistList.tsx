import type { Psychologist } from "../../types/types";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import { useFavorites } from "../../hooks/useFavorites";

type Props = {
  psychologists: Psychologist[];
  onToggleFavorite?: (id: string) => void;
};

const PsychologistList = ({ psychologists, onToggleFavorite }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    onToggleFavorite?.(id);
  };

  return (
    <div className="space-y-6">
      {psychologists.map((psychologist) => (
        <PsychologistCard
          key={psychologist.id}
          psychologist={psychologist}
          isFavorite={isFavorite(psychologist.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
};

export default PsychologistList;
