import type { Psychologist } from "../../types/types";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import { useFavorites } from "../../hooks/useFavorites";

type Props = {
  psychologists: Psychologist[];
};

const PsychologistList = ({ psychologists }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="space-y-6">
      {psychologists.map((psychologist) => (
        <PsychologistCard
          key={psychologist.id}
          psychologist={psychologist}
          isFavorite={isFavorite(psychologist.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default PsychologistList;
