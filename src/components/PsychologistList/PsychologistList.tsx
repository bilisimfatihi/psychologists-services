import type { Psychologist } from "../../types/types";
import PsychologistCard from "../PsychologistCard/PsychologistCard";

const PsychologistList = ({
  psychologists,
}: {
  psychologists: Psychologist[];
}) => {
  return (
    <div className="space-y-6">
      {psychologists.map((psychologist) => (
        <PsychologistCard key={psychologist.id} psychologist={psychologist} />
      ))}
    </div>
  );
};

export default PsychologistList;
