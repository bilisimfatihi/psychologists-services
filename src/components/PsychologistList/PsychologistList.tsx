import { useCallback, useState } from "react";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import AppointmentModal from "../AppointmentModal";
import { useFavorites } from "../../hooks/useFavorites";
import type { Psychologist } from "../../types/types";

type Props = {
  psychologists: Psychologist[];
  onToggleFavorite?: (id: string) => void;
};

const PsychologistList = ({ psychologists, onToggleFavorite }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleToggleFavorite = useCallback((id: string) => {
    toggleFavorite(id);
    onToggleFavorite?.(id);
  }, [toggleFavorite, onToggleFavorite]);

  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const handleOpenAppointment = useCallback((psychologist: Psychologist) => {
    setSelectedPsychologist(psychologist);
    setIsAppointmentOpen(true);
  }, []);

  const handleCloseAppointment = () => {
    setIsAppointmentOpen(false);
    setSelectedPsychologist(null);
  };

  return (
    <div className="space-y-6">
      {psychologists.map((psychologist) => (
        <PsychologistCard
          key={psychologist.id}
          psychologist={psychologist}
          isFavorite={isFavorite(psychologist.id)}
          onToggleFavorite={handleToggleFavorite}
          onOpenAppointment={() => handleOpenAppointment(psychologist)}
        />
      ))}

      {isAppointmentOpen && selectedPsychologist && (
        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={handleCloseAppointment}
          psychologist={{
            name: selectedPsychologist.name,
            avatarUrl: selectedPsychologist.avatarUrl,
          }}
        />
      )}
    </div>
  );
};

export default PsychologistList;
